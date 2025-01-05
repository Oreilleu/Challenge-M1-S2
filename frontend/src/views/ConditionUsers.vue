<template>
    <section class="section">
        <div class="container">
            <!-- Titre principal -->
            <h1 class="title">Conditions Générales d'Utilisation</h1>

            <!-- Introduction -->
            <div class="text-block">
                <p>
                    Bienvenue sur <strong>FANStech</strong>. Les présentes conditions générales d'utilisation (CGU)
                    régissent l'accès et l'utilisation de notre site internet par tout utilisateur ("vous").
                </p>
                <p class="mt">
                    En utilisant notre site, vous acceptez nos CGU. Veuillez les lire attentivement avant de naviguer ou
                    d'effectuer une action sur FANStech.
                </p>
            </div>

            <!-- Sections des CGU -->
            <div class="grid">
                <!-- Objet des CGU -->
                <div class="card">
                    <h2 class="card-title">Objet</h2>
                    <p class="card-text">
                        Les présentes CGU ont pour objet de définir les modalités et conditions dans lesquelles vous
                        pouvez utiliser notre site, ses fonctionnalités, et ses services associés.
                    </p>
                </div>

                <!-- Conditions d'Accès -->
                <div class="card">
                    <h2 class="card-title">Conditions d'Accès</h2>
                    <p class="card-text">
                        Le site FANStech est accessible gratuitement à tout utilisateur disposant d'une connexion
                        internet. Certaines fonctionnalités, comme l'achat ou la vente de produits, nécessitent la
                        création d'un compte.
                    </p>
                </div>

                <!-- Création de Compte -->
                <div class="card">
                    <h2 class="card-title">Création de Compte</h2>
                    <p class="card-text">
                        Pour accéder à certaines fonctionnalités, vous devez créer un compte. Vous êtes responsable de
                        la confidentialité de vos identifiants et de l'exactitude des informations fournies lors de
                        l'inscription.
                    </p>
                </div>

                <!-- Obligations de l'Utilisateur -->
                <div class="card">
                    <h2 class="card-title">Obligations de l'Utilisateur</h2>
                    <div class="card-text">
                        En utilisant FANStech, vous vous engagez à :
                        <ul class="list">
                            <li>Fournir des informations exactes et les mettre à jour en cas de changement.</li>
                            <li>Utiliser le site dans le respect des lois en vigueur et des droits des autres
                                utilisateurs.</li>
                            <li>Ne pas tenter d'accéder de manière non autorisée à nos systèmes.</li>
                        </ul>
                    </div>
                </div>

                <!-- Propriété Intellectuelle -->
                <div class="card">
                    <h2 class="card-title">Propriété Intellectuelle</h2>
                    <p class="card-text">
                        Tous les contenus présents sur FANStech (textes, images, vidéos, logos) sont protégés par les
                        lois sur la propriété intellectuelle. Toute reproduction, distribution, ou exploitation non
                        autorisée est strictement interdite.
                    </p>
                </div>

                <!-- Données Personnelles -->
                <div class="card">
                    <h2 class="card-title">Données Personnelles</h2>
                    <p class="card-text">
                        En utilisant FANStech, vous acceptez la collecte et l'utilisation de vos données personnelles
                        conformément à notre Politique de Confidentialité. Nous nous engageons à protéger vos
                        informations.
                    </p>
                </div>
            </div>

            <!-- Responsabilité et Limites -->
            <div class="responsibility">
                <h2 class="card-title">Responsabilité</h2>
                <p class="card-text">
                    FANStech met tout en œuvre pour assurer le bon fonctionnement du site. Cependant, nous ne pouvons
                    garantir que le site sera exempt d'erreurs, de bugs, ou d'interruptions. L'utilisation du site se
                    fait à vos propres risques.
                </p>

                <h2 class="card-title">Modification des CGU</h2>
                <p class="card-text">
                    FANStech se réserve le droit de modifier les présentes CGU à tout moment. Toute modification sera
                    publiée sur le site. En continuant à utiliser le site après publication, vous acceptez les nouvelles
                    CGU.
                </p>

                <h2 class="card-title">Droit Applicable et Litiges</h2>
                <p class="card-text">
                    Les présentes CGU sont régies par le droit français. En cas de litige, les parties s’engagent à
                    rechercher une solution amiable avant d’envisager toute action judiciaire.
                </p>

                <h2 class="card-title">Contact</h2>
                <p class="card-text">
                    Pour toute question ou réclamation concernant l’utilisation du site, vous pouvez nous contacter via
                    notre formulaire en ligne ou par email à l’adresse indiquée sur le site.
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

.text-block .mt {
    margin-top: 1rem;
}

.grid {
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.card {
    margin-bottom: 1rem;
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

.responsibility {
    margin-top: 2.5rem;
}
</style>