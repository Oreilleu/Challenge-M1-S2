const User = require("../models/user");
const bcrypt = require("bcrypt");
const {
  REGEX_PASSWORD_VALIDATION,
  DEFAULT_SALT,
  REGEX_EMAIL_VALIDATION,
} = require("../utils/const");
const {
  generateJsonWebToken,
  verifyJsonWebToken,
} = require("../utils/jsonWebtoken");
const sendEmail = require("../utils/senderMail");
const activationAccountTemplate = require("../utils/template-email/activationAccountTemplate");
const mailer = require("../config").mailer;
const crypto = require("crypto");
const nodemailer = require("nodemailer");

exports.register = async (req, res, next) => {
  const { email, password, firstname, lastname, civility } = req.body;

  const badRequestErrors = [];

  const testEmailFormat = new RegExp(REGEX_EMAIL_VALIDATION).test(email);

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
      return res.status(400).json({
        success: false,
        message: "L'enregistrement a échoué. Veuillez réessayer.",
        errors: badRequestErrors,
      });
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
      (data = { email, role: user.role }),
      (expiresIn = "24h")
    );

    try {
      await sendEmail(
        (form = mailer.noreply),
        (to = email),
        (subject = "Activation du compte "),
        (html = await activationAccountTemplate(
          userWithoutPassword.email,
          userWithoutPassword.firstname
        ))
      );
    } catch (error) {
      console.error("Erreur lors de l'envoie de l'email d'activation", error);
    }

    res.status(201).json({
      success: true,
      data: { user: userWithoutPassword, jwt },
      message: "Utilisateur créer",
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email et mot de passe sont requis.",
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email ou mot de passe incorrect.",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Email ou mot de passe incorrect.",
      });
    }

    const jwt = await generateJsonWebToken(
      (data = { email, role: user.role }),
      (expiresIn = "24h")
    );

    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    res.status(200).json({
      success: true,
      data: { user: userWithoutPassword, jwt },
      message: "Utilisateur authentifié.",
    });
  } catch (err) {
    next(err);
  }
};

exports.verifyAccount = async (req, res) => {
  const { validateAccountToken } = req.body;

  if (!validateAccountToken) {
    res.status(400).json({
      success: false,
      message:
        "Une erreur s'est produite, veuillez renvoyer un email d'activation.",
    });
  }

  try {
    const decoded = await verifyJsonWebToken(validateAccountToken);

    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      res.status(400).json({
        success: false,
        message: "Utilisateur non trouvé.",
      });
    }

    if (user.isVerified) {
      res.status(400).json({
        success: false,
        message: "Ce compte est déjà activé.",
      });
    }

    user.isVerified = true;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Compte activé.",
    });
  } catch (err) {
    res.status(401).json({
      success: false,
      message: "Token invalide ou expiré.",
    });
  }
};

const transporter = nodemailer.createTransport({
  host: "localhost",
  port: 1025,
  secure: false,
});

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(200).json({
        message:
          "Un lien de réinitialisation a été envoyé si l'email est valide.",
      });
    }

    const token = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    const resetUrl = `http://localhost:5173/reset-password/${token}`;

    const mailOptions = {
      to: email,
      from: "noreply@ecom.com",
      subject: "Réinitialisation du mot de passe",
      text: `Cliquez sur ce lien pour réinitialiser votre mot de passe : ${resetUrl}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message:
        "Un lien de réinitialisation a été envoyé à votre adresse email.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
};

exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({
      success: false,
      message: "Le mot de passe est requis.",
    });
  }

  const isPasswordSecure = new RegExp(REGEX_PASSWORD_VALIDATION).test(password);
  if (!isPasswordSecure) {
    return res.status(400).json({
      success: false,
      message:
        "Le mot de passe doit contenir au moins un caractère spécial, une majuscule, une minuscule et un chiffre !",
    });
  }

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Token invalide ou expiré.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, DEFAULT_SALT);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Mot de passe réinitialisé avec succès.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
};
