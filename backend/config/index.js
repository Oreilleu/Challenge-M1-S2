require("dotenv").config();

module.exports = {
  port: process.env.PORT || 3000,
  db: {
    user: process.env.DB_USER || "",
    host: process.env.DB_HOST || "",
    port: process.env.DB_PORT || "",
    name: process.env.DB_NAME || "",
    password: process.env.DB_PASSWORD || "",
  },
  mailer: {
    user: process.env.MAILER_USER || "",
    host: process.env.MAILER_HOST || "",
    password: process.env.MAILER_PASSWORD,
    noreply: process.env.NO_REPLY_ADDRESS || "noreply@nessie-fact.com",
  },
};
