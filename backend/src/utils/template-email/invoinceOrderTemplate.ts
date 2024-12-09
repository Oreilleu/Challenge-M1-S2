const invoinceOrderTemplate = async (name: string) => {
  return `<main>
      <h1>Bonjour, ${name}</h1>
      <p>Veuillez trouver ci joint, votre facture pour votre dernière commande.</p>
    </main>`;
};

export default invoinceOrderTemplate;
