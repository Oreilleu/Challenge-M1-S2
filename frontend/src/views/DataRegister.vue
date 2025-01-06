<template>
  <section class="section">
    <div class="container">
      <!-- Titre principal -->
      <h1 class="title">Registre des Données</h1>

      <!-- Introduction -->
      <div class="text-block">
        <p>
          Conformément aux réglementations en vigueur, FANStech tient un registre des données
          collectées et traitées. Ce registre permet d’assurer une gestion transparente et
          responsable des informations personnelles des utilisateurs.
        </p>
      </div>

      <!-- Sections principales -->
      <div class="grid">
        <!-- Types de Données Collectées -->
        <div class="card">
          <h2 class="card-title">Types de Données Collectées</h2>
          <p class="card-text">FANStech collecte différents types de données, notamment :</p>
          <ul class="list">
            <li>Données personnelles : nom, prénom, adresse email.</li>
            <li>Données de contact : numéro de téléphone, adresse postale.</li>
            <li>Données financières : informations de paiement.</li>
            <li>Données techniques : adresse IP, données de connexion.</li>
          </ul>
        </div>

        <!-- Finalités du Traitement des Données -->
        <div class="card">
          <h2 class="card-title">Finalités du Traitement des Données</h2>
          <p class="card-text">
            Les données collectées sont utilisées dans le cadre des finalités suivantes :
          </p>
          <ul class="list">
            <li>Traitement des commandes et livraisons.</li>
            <li>Gestion de la relation client et assistance.</li>
            <li>Amélioration des services et personnalisation.</li>
            <li>Respect des obligations légales et réglementaires.</li>
          </ul>
        </div>

        <!-- Durée de Conservation des Données -->
        <div class="card">
          <h2 class="card-title">Durée de Conservation des Données</h2>
          <p class="card-text">
            Les données personnelles sont conservées pendant la durée nécessaire aux finalités pour
            lesquelles elles ont été collectées, conformément aux obligations légales. Par exemple :
          </p>
          <ul class="list">
            <li>Données de commande : 5 ans après la transaction.</li>
            <li>Données de facturation : 10 ans à des fins comptables.</li>
            <li>Données marketing : jusqu’à ce que l’utilisateur se désinscrive.</li>
          </ul>
        </div>

        <!-- Sécurité et Protection des Données -->
        <div class="card">
          <h2 class="card-title">Sécurité et Protection des Données</h2>
          <p class="card-text">
            FANStech met en œuvre des mesures de sécurité avancées pour protéger vos données contre
            toute utilisation non autorisée, perte ou destruction. Ces mesures incluent le cryptage
            des données, des pare-feux et des audits réguliers de sécurité.
          </p>
        </div>
      </div>

      <!-- Accès et Modification des Données -->
      <div class="contact">
        <h2 class="card-title">Accès et Modification des Données</h2>
        <p class="card-text">
          Vous avez le droit d’accéder à vos données personnelles, de les modifier ou de demander
          leur suppression. Pour exercer ces droits, contactez-nous via notre formulaire en ligne ou
          par email à
          <a to="mailto:support@fanstech.com" class="link">support@fanstech.com</a>.
        </p>
      </div>

      <!-- Contact pour Questions Relatives au Registre -->
      <div class="contact">
        <h2 class="card-title">Contact</h2>
        <p class="card-text">
          Si vous avez des questions concernant notre registre des données ou le traitement de vos
          informations, n’hésitez pas à nous contacter à l’adresse mentionnée ci-dessus.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section {
  width: 100%;
  padding: 3rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.title {
  font-size: 2rem;
  font-weight: 600;
  color: #2d3748;
  /* text-gray-800 */
  margin-bottom: 1.5rem;
}

.text-block {
  color: #4a5568;
  /* text-gray-700 */
  line-height: 1.75;
  margin-bottom: 2.5rem;
}

.grid {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.card {
  margin-bottom: 1.5rem;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d3748;
  /* text-gray-800 */
  margin-bottom: 1rem;
}

.card-text {
  color: #718096;
  /* text-gray-600 */
  line-height: 1.5;
}

.list {
  margin-top: 0.5rem;
  padding-left: 1.5rem;
  list-style-type: disc;
}

.contact {
  margin-top: 2.5rem;
}

.link {
  color: #3182ce;
  /* text-blue-600 */
  text-decoration: none;
}
</style>
