import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT || "3000",
  db: {
    connexionString: process.env.MONGODB_CONNEXION_STRING || "",
  },
  mailer: {
    user: process.env.MAILER_USER || "",
    host: process.env.MAILER_HOST || "",
    password: process.env.MAILER_PASSWORD || "",
    noreply: process.env.NO_REPLY_ADDRESS || "noreply@nessie-fact.com",
  },
};
