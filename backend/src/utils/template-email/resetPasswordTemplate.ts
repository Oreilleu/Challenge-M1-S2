import { ExpiresIn } from "../../models/expires-in.enum";
import { generateJsonWebToken } from "../jsonWebtoken";

const resetPasswordTemplate = async (email: string) => {
  const token = await generateJsonWebToken({ email }, ExpiresIn["15_MIN"]);

  const resetUrl = `${process.env.FRONT_URL}/reset-password/${token}`;

  return `<main>
      <h1>Pour réinitialiser votre mot de passe, cliquez sur le lien suivant:</h1>
      <a href="${resetUrl}">Réinitialiser le mot de passe</a>
    </main>`;
};

export default resetPasswordTemplate;
