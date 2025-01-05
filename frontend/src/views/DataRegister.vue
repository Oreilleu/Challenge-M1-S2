<template>
    <section class="w-full py-12">
        <div class="max-w-7xl mx-auto px-4">
            <!-- Titre principal -->
            <h1 class="text-3xl font-semibold text-gray-800 mb-6">Registre des Données</h1>

            <!-- Introduction -->
            <div class="text-gray-700 leading-relaxed mb-10">
                <p>
                    Conformément aux réglementations en vigueur, FANStech tient un registre des données collectées et
                    traitées. Ce registre permet d’assurer une gestion transparente et responsable des informations
                    personnelles des utilisateurs.
                </p>
            </div>

            <!-- Sections principales -->
            <div class="grid md:grid-cols-2 gap-8">
                <!-- Types de Données Collectées -->
                <div>
                    <h2 class="text-xl font-semibold text-gray-800 mb-4">Types de Données Collectées</h2>
                    <p class="text-gray-600">
                        FANStech collecte différents types de données, notamment :
                    </p>
                    <ul class="list-disc ml-6 mt-2 text-gray-600">
                        <li>Données personnelles : nom, prénom, adresse email.</li>
                        <li>Données de contact : numéro de téléphone, adresse postale.</li>
                        <li>Données financières : informations de paiement.</li>
                        <li>Données techniques : adresse IP, données de connexion.</li>
                    </ul>
                </div>

                <!-- Finalités du Traitement des Données -->
                <div>
                    <h2 class="text-xl font-semibold text-gray-800 mb-4">Finalités du Traitement des Données</h2>
                    <p class="text-gray-600">
                        Les données collectées sont utilisées dans le cadre des finalités suivantes :
                    </p>
                    <ul class="list-disc ml-6 mt-2 text-gray-600">
                        <li>Traitement des commandes et livraisons.</li>
                        <li>Gestion de la relation client et assistance.</li>
                        <li>Amélioration des services et personnalisation.</li>
                        <li>Respect des obligations légales et réglementaires.</li>
                    </ul>
                </div>

                <!-- Durée de Conservation des Données -->
                <div>
                    <h2 class="text-xl font-semibold text-gray-800 mb-4">Durée de Conservation des Données</h2>
                    <p class="text-gray-600">
                        Les données personnelles sont conservées pendant la durée nécessaire aux finalités pour
                        lesquelles
                        elles ont été collectées, conformément aux obligations légales. Par exemple :
                    </p>
                    <ul class="list-disc ml-6 mt-2 text-gray-600">
                        <li>Données de commande : 5 ans après la transaction.</li>
                        <li>Données de facturation : 10 ans à des fins comptables.</li>
                        <li>Données marketing : jusqu’à ce que l’utilisateur se désinscrive.</li>
                    </ul>
                </div>

                <!-- Sécurité et Protection des Données -->
                <div>
                    <h2 class="text-xl font-semibold text-gray-800 mb-4">Sécurité et Protection des Données</h2>
                    <p class="text-gray-600">
                        FANStech met en œuvre des mesures de sécurité avancées pour protéger vos données contre toute
                        utilisation non autorisée, perte ou destruction. Ces mesures incluent le cryptage des données,
                        des
                        pare-feux et des audits réguliers de sécurité.
                    </p>
                </div>
            </div>

            <!-- Accès et Modification des Données -->
            <div class="mt-10">
                <h2 class="text-xl font-semibold text-gray-800 mb-4">Accès et Modification des Données</h2>
                <p class="text-gray-600 mb-4">
                    Vous avez le droit d’accéder à vos données personnelles, de les modifier ou de demander leur
                    suppression. Pour exercer ces droits, contactez-nous via notre formulaire en ligne ou par email à
                    <a href="mailto:support@fanstech.com" class="text-blue-600">support@fanstech.com</a>.
                </p>
            </div>

            <!-- Contact pour Questions Relatives au Registre -->
            <div class="mt-10">
                <h2 class="text-xl font-semibold text-gray-800 mb-4">Contact</h2>
                <p class="text-gray-600">
                    Si vous avez des questions concernant notre registre des données ou le traitement de vos
                    informations,
                    n’hésitez pas à nous contacter à l’adresse mentionnée ci-dessus.
                </p>
            </div>
        </div>
    </section>
</template>
<style>
.container {
    max-width: 950px;
    margin: auto;
    font-size: 14px;
}

.container h2 {
    margin-top: 10px;
}
</style>
