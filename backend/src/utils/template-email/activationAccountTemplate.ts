import { ExpiresIn } from "../../models/expires-in.enum";
import { generateJsonWebToken } from "../jsonWebtoken";

const activationAccountTemplate = async (email: string, name: string) => {
  const frontUrl = process.env.FRONT_URL || "";

  const jwt = await generateJsonWebToken({ email }, ExpiresIn["15_MIN"]);

  return `<main>
      <h1>Bonjour ${name} pour activer votre compte cliqué sur le lien : </h1>
      <a href={${frontUrl}/verify-account?token=${jwt}}>Activer le compte</a>
    </main>`;
};

export default activationAccountTemplate;
