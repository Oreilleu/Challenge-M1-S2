const { generateJsonWebToken } = require("../jsonWebtoken");

const activationAccountTemplate = async (email, name) => {
  const frontUrl = process.env.FRONT_URL || "";

  const jwt = await generateJsonWebToken(
    (data = { email }),
    (expiresIn = "15m")
  );

  return `<main>
      <h1>Bonjour ${name} pour activer votre compte cliqué sur le lien : </h1>
      <a href={${frontUrl}/verify-account?token=${jwt}}>Activer le compte</a>
    </main>`;
};

module.exports = activationAccountTemplate;
