const mongoose = require("mongoose");
const config = require("../config");

const connectDb = async () => {
  const { user, password, host, name } = config.db;
  const connexionString = `mongodb+srv://${user}:${password}@${host}/?retryWrites=true&w=majority&appName=${name}`;

  try {
    await mongoose.connect(connexionString);
    console.log("Connexion réussie à la base données");
  } catch (error) {
    console.error("Erreur lors de la connexion à la base de données : ", error);
  }
};

module.exports = connectDb;