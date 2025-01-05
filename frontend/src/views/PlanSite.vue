<template>
    <section class="section">
        <div class="container">
            <!-- Titre principal -->
            <h1 class="title">Plan du Site</h1>

            <!-- Introduction -->
            <p class="intro">
                Voici un aperçu de toutes les sections et pages disponibles sur FANStech. Cliquez sur un lien pour
                accéder directement à la page correspondante.
            </p>

            <!-- Liste des sections -->
            <div class="grid">
                <!-- Accueil -->
                <div class="section-block">
                    <h2 class="section-title">Accueil</h2>
                    <ul class="section-list">
                        <li>
                            <RouterLink to="/" class="link">Accueil</RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/qui-sommes-nous" class="link">Qui sommes-nous</RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/faq" class="link">FAQ</RouterLink>
                        </li>
                    </ul>
                </div>

                <!-- Produits -->
                <div class="section-block">
                    <h2 class="section-title">Produits</h2>
                    <ul class="section-list">
                        <li>
                            <RouterLink to="/products" class="link">Tous les produits</RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/product-details/:productId" class="link">Détails du produit</RouterLink>
                        </li>
                    </ul>
                </div>

                <!-- Compte utilisateur -->
                <div class="section-block">
                    <h2 class="section-title">Compte</h2>
                    <ul class="section-list">
                        <li>
                            <RouterLink to="/register" class="link">Créer un compte</RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/login" class="link">Se connecter</RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/my-account" class="link">Mon compte</RouterLink>
                        </li>
                    </ul>
                </div>

                <!-- Backoffice -->
                <div class="section-block">
                    <h2 class="section-title">Backoffice</h2>
                    <ul class="section-list">
                        <li>
                            <RouterLink to="/admin/products" class="link">Gérer les produits</RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/admin/categories" class="link">Gérer les catégories</RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/admin/orders" class="link">Gérer les commandes</RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/admin/users" class="link">Gérer les utilisateurs</RouterLink>
                        </li>
                    </ul>
                </div>

                <!-- Informations légales -->
                <div class="section-block">
                    <h2 class="section-title">Informations légales</h2>
                    <ul class="section-list">
                        <li>
                            <RouterLink to="/cgv" class="link">Conditions Générales de Vente</RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/condition-users" class="link">Conditions Générales d'Utilisation
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/privacy-policy" class="link">Politique de Confidentialité</RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/data-users" class="link">Utilisation des données</RouterLink>
                        </li>
                    </ul>
                </div>

                <!-- Support -->
                <div class="section-block">
                    <h2 class="section-title">Support</h2>
                    <ul class="section-list">
                        <li>
                            <RouterLink to="/faq" class="link">FAQ</RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/contact" class="link">Contactez-nous</RouterLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">

</script>

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

.intro {
    color: #4a5568;
    /* text-gray-700 */
    line-height: 1.75;
    margin-bottom: 2rem;
}

.grid {
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.section-block {
    margin-bottom: 1rem;
}

.section-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #2d3748;
    /* text-gray-800 */
    margin-bottom: 0.5rem;
}

.section-list {
    color: #718096;
    /* text-gray-600 */
    list-style: disc;
    padding-left: 1rem;
}

.link {
    color: #3182ce;
    /* text-blue-600 */
    text-decoration: none;
    transition: color 0.3s ease;
}

.link:hover {
    text-decoration: underline;
}
</style>