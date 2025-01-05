<template>
    <section class="w-full py-12">
        <div class="max-w-7xl mx-auto px-4">
            <!-- Titre principal -->
            <h1 class="text-3xl font-semibold text-gray-800 mb-6">Plan du Site</h1>

            <!-- Introduction -->
            <p class="text-gray-700 leading-relaxed mb-8">
                Voici un aperçu de toutes les sections et pages disponibles sur FANStech. Cliquez sur un lien pour
                accéder directement à la page correspondante.
            </p>

            <!-- Liste des sections -->
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <!-- Accueil -->
                <div>
                    <h2 class="text-xl font-semibold text-gray-800 mb-2">Accueil</h2>
                    <ul class="text-gray-600 list-disc list-inside">
                        <li>
                            <RouterLink to="/" class="text-blue-600 hover:underline">Accueil</RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/qui-sommes-nous" class="text-blue-600 hover:underline">Qui
                                sommes-nous</RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/faq" class="text-blue-600 hover:underline">FAQ</RouterLink>
                        </li>
                    </ul>
                </div>

                <!-- Produits -->
                <div>
                    <h2 class="text-xl font-semibold text-gray-800 mb-2">Produits</h2>
                    <ul class="text-gray-600 list-disc list-inside">
                        <li>
                            <RouterLink to="/products" class="text-blue-600 hover:underline">Tous les
                                produits</RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/product-details/:productId" class="text-blue-600 hover:underline">Détails
                                du produit</RouterLink>
                        </li>
                    </ul>
                </div>

                <!-- Compte utilisateur -->
                <div>
                    <h2 class="text-xl font-semibold text-gray-800 mb-2">Compte</h2>
                    <ul class="text-gray-600 list-disc list-inside">
                        <li>
                            <RouterLink to="/register" class="text-blue-600 hover:underline">Créer un
                                compte</RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/login" class="text-blue-600 hover:underline">Se connecter</RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/my-account" class="text-blue-600 hover:underline">Mon compte</RouterLink>
                        </li>
                    </ul>
                </div>

                <!-- Backoffice -->
                <div>
                    <h2 class="text-xl font-semibold text-gray-800 mb-2">Backoffice</h2>
                    <ul class="text-gray-600 list-disc list-inside">
                        <li>
                            <RouterLink to="/admin/products" class="text-blue-600 hover:underline">Gérer les
                                produits</RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/admin/categories" class="text-blue-600 hover:underline">Gérer les
                                catégories</RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/admin/orders" class="text-blue-600 hover:underline">Gérer les
                                commandes</RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/admin/users" class="text-blue-600 hover:underline">Gérer les
                                utilisateurs</RouterLink>
                        </li>
                    </ul>
                </div>

                <!-- Informations légales -->
                <div>
                    <h2 class="text-xl font-semibold text-gray-800 mb-2">Informations légales</h2>
                    <ul class="text-gray-600 list-disc list-inside">
                        <li>
                            <RouterLink to="/cgv" class="text-blue-600 hover:underline">Conditions Générales de
                                Vente</RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/condition-users" class="text-blue-600 hover:underline">Conditions
                                Générales d'Utilisation</RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/privacy-policy" class="text-blue-600 hover:underline">Politique de
                                Confidentialité</RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/data-users" class="text-blue-600 hover:underline">Utilisation des
                                données</RouterLink>
                        </li>
                    </ul>
                </div>

                <!-- Support -->
                <div>
                    <h2 class="text-xl font-semibold text-gray-800 mb-2">Support</h2>
                    <ul class="text-gray-600 list-disc list-inside">
                        <li>
                            <RouterLink to="/faq" class="text-blue-600 hover:underline">FAQ</RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/contact" class="text-blue-600 hover:underline">Contactez-nous</RouterLink>
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
a {
    transition: color 0.3s ease;
}
</style>