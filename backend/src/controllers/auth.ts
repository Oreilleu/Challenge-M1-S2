import bcrypt from "bcrypt";
import {
  generateJsonWebToken,
  verifyJsonWebToken,
} from "../utils/jsonWebtoken";
import { sendEmail } from "../utils/senderMail";
import {
  DEFAULT_SALT,
  REGEX_EMAIL_VALIDATION,
  REGEX_PASSWORD_VALIDATION,
} from "../utils/const";
import { Request, RequestHandler } from "express";
import activationAccountTemplate from "../utils/template-email/activationAccountTemplate";
import resetPasswordTemplate from "../utils/template-email/resetPasswordTemplate";
import { config } from "../config";
import { ExpiresIn, User as UserType } from "../utils/types";
import User from "../models/user";

export interface AuthenticatedRequest extends Request {
  user: UserType;
}

export const register: RequestHandler = async (req, res, next) => {
  const { email, password, firstname, lastname, civility } = req.body;
  const badRequestErrors: string[] = [];

  const testEmailFormat = new RegExp(REGEX_EMAIL_VALIDATION).test(email);

  const mailer = config.mailer;

  try {
    if (!email || !password || !firstname || !lastname || !civility) {
      badRequestErrors.push("Tous les champs sont obligatoires.");
    }

    if (!testEmailFormat) {
      badRequestErrors.push(
        "L'email doit être au format nom-prenom@domain.com ."
      );
    }

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      badRequestErrors.push("Cet email est déjà utilisé.");
    }

    const isPasswordSecure = new RegExp(REGEX_PASSWORD_VALIDATION).test(
      password
    );

    if (!isPasswordSecure) {
      badRequestErrors.push(
        "Le mot de passe doit contenir au moins un caractère spécial, une majuscule, une minuscule et un chiffre !"
      );
    }

    if (badRequestErrors.length > 0) {
      res.status(400).json({
        success: false,
        message: "L'enregistrement a échoué. Veuillez réessayer.",
        errors: badRequestErrors,
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, DEFAULT_SALT);

    const user = new User({
      email: email,
      password: hashedPassword,
      firstname,
      lastname,
      civility,
      role: "ROLE_USER",
    });

    const registeredUser = await user.save();

    const userWithoutPassword = registeredUser.toObject();
    delete userWithoutPassword.password;

    const jwt = await generateJsonWebToken(
      { ...userWithoutPassword },
      ExpiresIn["24_HOUR"]
    );

    try {
      await sendEmail(
        mailer.noreply,
        email,
        "Activation du compte ",
        await activationAccountTemplate(
          userWithoutPassword.email,
          userWithoutPassword.firstname
        )
      );
    } catch (error) {
      console.error("Erreur lors de l'envoie de l'email d'activation", error);
    }

    res.status(201).json({
      success: true,
      data: { user: userWithoutPassword, jwt },
      message: "Utilisateur créer",
    });
    return;
  } catch (err) {
    next(err);
  }
};

export const login: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      success: false,
      message: "Email et mot de passe sont requis.",
    });
    return;
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({
        success: false,
        message: "Email ou mot de passe incorrect.",
      });
      return;
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      res.status(400).json({
        success: false,
        message: "Email ou mot de passe incorrect.",
      });
      return;
    }

    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    const jwt = await generateJsonWebToken(
      { ...userWithoutPassword },
      ExpiresIn["24_HOUR"]
    );

    res.status(200).json({
      success: true,
      data: { user: userWithoutPassword, jwt },
      message: "Utilisateur authentifié.",
    });
    return;
  } catch (err) {
    next(err);
  }
};

export const verifyAccount: RequestHandler = async (req, res) => {
  const { validateAccountToken } = req.body;

  if (!validateAccountToken) {
    res.status(400).json({
      success: false,
      message:
        "Une erreur s'est produite, veuillez renvoyer un email d'activation.",
    });
    return;
  }

  try {
    const decoded = (await verifyJsonWebToken(validateAccountToken)) as {
      email: string;
    };

    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      res.status(400).json({
        success: false,
        message: "Utilisateur non trouvé.",
      });
      return;
    }

    if (user.isVerified) {
      res.status(400).json({
        success: false,
        message: "Ce compte est déjà activé.",
      });
      return;
    }

    user.isVerified = true;

    await user.save();

    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    res.status(200).json({
      success: true,
      data: { ...userWithoutPassword },
      message: "Compte activé.",
    });
    return;
  } catch (err) {
    res.status(401).json({
      success: false,
      message: "Token invalide ou expiré.",
    });
    return;
  }
};

export const forgotPassword: RequestHandler = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(200).json({
        message:
          "Un lien de réinitialisation a été envoyé si l'email est valide.",
      });
      return;
    }

    const token = await generateJsonWebToken(email, ExpiresIn["15_MIN"]);

    const resetUrl = `${process.env.FRONT_URL}/reset-password/${token}`;

    try {
      await sendEmail(
        config.mailer.noreply,
        email,
        "Réinitialisation du mot de passe",
        await resetPasswordTemplate(email, resetUrl)
      );
    } catch (error) {
      res
        .status(500)
        .json({ sucess: false, message: "Erreur interne du serveur." });
      return;
    }

    res.status(200).json({
      message:
        "Un lien de réinitialisation a été envoyé à votre adresse email.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
};
export const resetPassword: RequestHandler = async (req, res, next) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!password) {
    res.status(400).json({
      success: false,
      message: "Le mot de passe est requis.",
    });
    return;
  }

  const isPasswordSecure = new RegExp(REGEX_PASSWORD_VALIDATION).test(password);
  if (!isPasswordSecure) {
    res.status(400).json({
      success: false,
      message:
        "Le mot de passe doit contenir au moins un caractère spécial, une majuscule, une minuscule et un chiffre !",
    });
    return;
  }

  try {
    const decoded = (await verifyJsonWebToken(token)) as { data: string };
    const user = await User.findOne({
      email: decoded.data,
    });

    if (!user) {
      res.status(400).json({
        success: false,
        message: "Token invalide ou expiré.",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, DEFAULT_SALT);
    user.password = hashedPassword;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Mot de passe réinitialisé avec succès.",
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
export const sendVerificationEmail: RequestHandler = async (req, res, next) => {
  const { user } = req as AuthenticatedRequest;
  const mailer = config.mailer;

  if (!user) {
    throw new Error("Utilisateur non trouvé.");
  }

  try {
    await sendEmail(
      mailer.noreply,
      user.email,
      "Activation du compte ",
      await activationAccountTemplate(user.email, user.firstname)
    );

    res.status(200).json({
      success: true,
      message: "Email d'activation envoyé.",
    });
    return;
  } catch (error) {
    next(error);
  }
};

export const checkIntegrityUser: RequestHandler = async (req, res) => {
  const { user } = req as AuthenticatedRequest;

  if (!user) {
    res.status(401).json({
      success: false,
      message: "Utilisateur non trouvé.",
    });
    return;
  }

  res.status(200).json({
    success: true,
    data: { isValid: true },
    message: "Utilisateur authentifié.",
  });
  return;
};
