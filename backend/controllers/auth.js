// Type de réponse :
// Success  : bool
// data?    : unknow
// message? : string
// error?   : unknow

const User = require("../models/user");
const bcrypt = require("bcrypt");
const { REGEX_PASSWORD_VALIDATION, DEFAULT_SALT } = require("../utils/const");

exports.register = async (req, res) => {
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
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Un utilisateur avec cet email existe déja.",
      });
    }

    res.status(500).json({
      success: false,
      message: "Erreur lors de l'enregistrement de l'utilisateur.",
      error: err.message,
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Cette email n'est pas reconnue",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Mot de passe incorrect.",
      });
    }
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    res.status(200).json({
      success: true,
      data: userWithoutPassword,
      message: "Utilisateur authentifié.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la connexion de l'utilisateur.",
    });
  }
};
