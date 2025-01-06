<template>
  <section class="w-full py-12">
    <div class="max-w-7xl mx-auto px-4">
      <!-- Titre principal -->
      <h1 class="text-3xl font-semibold text-gray-800 mb-6">Utilisation des Données Utilisateur</h1>

      <!-- Introduction -->
      <div class="text-gray-700 leading-relaxed mb-10">
        <p>
          Chez <strong>FANStech</strong>, nous accordons une importance primordiale à la
          confidentialité et à la sécurité de vos données personnelles. Cette page décrit comment
          nous collectons, utilisons, et protégeons vos informations.
        </p>
      </div>

      <!-- Sections principales -->
      <div class="grid md:grid-cols-2 gap-8">
        <!-- Collecte des Données -->
        <div>
          <h2 class="text-xl font-semibold text-gray-800 mb-4">Collecte des Données</h2>
          <p class="text-gray-600">
            Nous collectons les informations suivantes lorsque vous utilisez notre site :
          </p>
          <ul class="list-disc ml-6 mt-2 text-gray-600">
            <li>Informations de compte : nom, email, mot de passe, etc.</li>
            <li>Informations de paiement : données de carte bancaire ou compte PayPal.</li>
            <li>
              Informations liées à l’activité : historique des commandes, navigation sur le site.
            </li>
          </ul>
        </div>

        <!-- Utilisation des Données -->
        <div>
          <h2 class="text-xl font-semibold text-gray-800 mb-4">Utilisation des Données</h2>
          <p class="text-gray-600">Les données collectées sont utilisées pour :</p>
          <ul class="list-disc ml-6 mt-2 text-gray-600">
            <li>Gérer vos commandes et paiements.</li>
            <li>Améliorer nos services et personnaliser votre expérience.</li>
            <li>Vous envoyer des communications marketing (avec votre consentement).</li>
          </ul>
        </div>

        <!-- Partage des Données -->
        <div>
          <h2 class="text-xl font-semibold text-gray-800 mb-4">Partage des Données</h2>
          <p class="text-gray-600">
            Nous ne partageons vos données qu’avec des tiers essentiels au fonctionnement du site,
            tels que :
          </p>
          <ul class="list-disc ml-6 mt-2 text-gray-600">
            <li>Fournisseurs de services de paiement.</li>
            <li>Partenaires logistiques pour la livraison.</li>
            <li>Prestataires d’analyse de données pour améliorer nos services.</li>
          </ul>
        </div>

        <!-- Sécurité des Données -->
        <div>
          <h2 class="text-xl font-semibold text-gray-800 mb-4">Sécurité des Données</h2>
          <p class="text-gray-600">
            Nous mettons en place des mesures techniques et organisationnelles pour protéger vos
            données contre tout accès non autorisé, perte ou altération. Ces mesures incluent le
            cryptage des données et un contrôle d'accès strict.
          </p>
        </div>
      </div>

      <!-- Droits des Utilisateurs -->
      <div class="mt-10">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Vos Droits</h2>
        <p class="text-gray-600 mb-4">
          Conformément à la législation en vigueur, vous disposez des droits suivants concernant vos
          données :
        </p>
        <ul class="list-disc ml-6 mt-2 text-gray-600">
          <li>Droit d'accès : obtenir une copie de vos données personnelles.</li>
          <li>Droit de rectification : corriger des informations inexactes ou incomplètes.</li>
          <li>Droit à l'effacement : demander la suppression de vos données dans certains cas.</li>
          <li>Droit d'opposition : refuser l'utilisation de vos données à des fins spécifiques.</li>
          <li>Droit à la portabilité : recevoir vos données dans un format structuré.</li>
        </ul>
      </div>

      <!-- Contact -->
      <div class="mt-10">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Contact</h2>
        <p class="text-gray-600">
          Pour toute question ou demande concernant vos données personnelles, veuillez nous
          contacter via notre formulaire de contact ou par email à l'adresse suivante :
          <a to="mailto:support@fanstech.com" class="text-blue-600">support@fanstech.com</a>.
        </p>
      </div>
    </div>
  </section>
</template>
