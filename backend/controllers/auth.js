// Type de réponse :
// Success  : bool
// data?    : unknow
// message? : string
// error?   : unknow

const User = require("../models/user");
const bcrypt = require("bcrypt");
const { REGEX_PASSWORD_VALIDATION, DEFAULT_SALT } = require("../utils/const");
const { generateJsonWebToken } = require("../utils/jsonWebtoken");

exports.register = async (req, res, next) => {
  const { email, password, firstname, lastname, civility } = req.body;

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
      firstname,
      lastname,
      civility,
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
