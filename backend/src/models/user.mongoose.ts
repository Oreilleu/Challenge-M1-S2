import { REGEX_PHONE_VALIDATION } from "../utils/const";

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
        validator: function (value: string) {
          return new RegExp(REGEX_EMAIL_VALIDATION).test(value);
        },
        message: (props: any) =>
          `${props.value} n'est pas une adresse email valide !`,
      },
      required: [true, "L'email est obligatoire."],
      unique: true,
    },
    password: {
      type: String,
      validate: {
        validator: function (value: string) {
          return new RegExp(REGEX_PASSWORD_VALIDATION).test(value);
        },
        message:
          "Le mot de passe doit contenir au moins un caractère spécial, une majuscule, une minuscule et un chiffre !",
      },
      required: [true, "Le mot de passe est obligatoire."],
    },
    firstname: {
      type: String,
      validate: {
        validator: function (value: string) {
          return value.length < 250;
        },
        message: "Le champ prénom doit être inférieur à 250 caractères.",
      },
      required: [true, "Le champ prénom est obligatoire."],
    },
    lastname: {
      type: String,
      validate: {
        validator: function (value: string) {
          return value.length < 250;
        },
        message:
          "Le champ nom de famille doit être inférieur à 250 caractères.",
      },
      required: [true, "Le champ nom de famille est obligatoire."],
    },
    civility: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      require: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
      validate: {
        validator: function (value: string) {
          return new RegExp(REGEX_PHONE_VALIDATION).test(value);
        },
        message: "Le champ téléphone n'est pas valide.",
      },
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
