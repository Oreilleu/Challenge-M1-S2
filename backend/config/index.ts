import dotenv from "dotenv";
dotenv.config();

// TODO : Utile cette interface ?
interface Config {
  port: string;
  db: {
    user: string;
    host: string;
    port: string;
    name: string;
    password: string;
  };
  mailer: {
    user: string;
    host: string;
    password: string;
    noreply: string;
  };
}

export const config: Config = {
  port: process.env.PORT || "3000",
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
    password: process.env.MAILER_PASSWORD || "",
    noreply: process.env.NO_REPLY_ADDRESS || "noreply@nessie-fact.com",
  },
};
