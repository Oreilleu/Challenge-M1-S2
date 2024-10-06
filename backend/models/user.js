const mongoose = require("mongoose");
const {
  REGEX_EMAIL_VALIDATION,
  REGEX_PASSWORD_VALIDATION,
} = require("../utils/const");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      validate: {
        validator: function (value) {
          return new RegExp(REGEX_EMAIL_VALIDATION).test(value);
        },
        message: (props) =>
          `${props.value} n'est pas une adresse email valide !`,
      },
      required: [true, "L'email est obligatoire."],
      unique: true,
    },
    password: {
      type: String,
      validate: {
        validator: function (value) {
          return new RegExp(REGEX_PASSWORD_VALIDATION).test(value);
        },
        message:
          "Le mot de passe doit contenir au moins un caractère spécial, une majuscule, une minuscule et un chiffre !",
      },
      required: [true, "Le mot de passe est obligatoire."],
    },
    role: {
      type: String,
      require: true,
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
