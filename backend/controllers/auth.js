// Type de réponse :
// Success  : bool
// data?    : unknow
// message? : string
// error?   : unknow

const User = require("../models/user");
const bcrypt = require("bcrypt");
const { REGEX_PASSWORD_VALIDATION, DEFAULT_SALT } = require("../utils/const");
const { generateJsonWebToken } = require("../utils/jsonWebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

exports.register = async (req, res, next) => {
  const { email, password } = req.body;

  const isPasswordSecure = new RegExp(REGEX_PASSWORD_VALIDATION).test(password);

  if (!isPasswordSecure) {
    return res.status(400).json({
      success: false,
      message:
        "Le mot de passe doit contenir au moins un caractère spécial, une majuscule, une minuscule et un chiffre !",
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, DEFAULT_SALT);

    const user = new User({
      email: email,
      password: hashedPassword,
      role: "ROLE_USER",
    });

    const registeredUser = await user.save();

    const userWithoutPassword = registeredUser.toObject();
    delete userWithoutPassword.password;

    res.status(201).json({
      success: true,
      data: userWithoutPassword,
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

    const jwt = await generateJsonWebToken({ email, role: user.role });

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
