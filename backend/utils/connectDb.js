const mongoose = require("mongoose");
const config = require("../config");

const connectDb = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${config.db.host}:${config.db.password}@${config.db.name}.u9xjc.mongodb.net/?retryWrites=true&w=majority&appName=${config.db.name}`
    );
    console.log("Connexion réussie à la base données");
  } catch (error) {
    console.error("Erreur lors de la connexion à la base de données : ", error);
  }
};

module.exports = connectDb;
