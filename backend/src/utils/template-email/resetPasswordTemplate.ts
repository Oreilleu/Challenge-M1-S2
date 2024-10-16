const resetPasswordTemplate = async (email: string, resetUrl: string) => {
  return `<main>
      <h1>Pour réinitialiser votre mot de passe, cliquez sur le lien suivant:</h1>
      <a href="${resetUrl}">Réinitialiser le mot de passe</a>
    </main>`;
};

export default resetPasswordTemplate;
