<template>
    <section class="w-full py-12">
        <div class="max-w-7xl mx-auto px-4">
            <!-- Titre principal -->
            <h1 class="text-3xl font-semibold text-gray-800 mb-6">Nos Magasins</h1>

            <!-- Introduction -->
            <p class="text-gray-700 leading-relaxed mb-8">
                Découvrez les différents points de vente FANStech. Que vous soyez en quête de conseils personnalisés, de
                la dernière technologie ou d'un service après-vente, nos équipes vous accueillent dans nos magasins à
                travers le pays. Trouvez le magasin le plus proche de chez vous grâce à la liste ci-dessous.
            </p>

            <!-- Liste des magasins -->
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <!-- Magasin 1 -->
                <div>
                    <h2 class="text-xl font-semibold text-gray-800 mb-2">FANStech Paris</h2>
                    <p class="text-gray-600">
                        <strong>Adresse :</strong> 123 Rue de la Technologie, 75001 Paris<br />
                        <strong>Horaires :</strong> Lundi - Samedi : 10h - 19h<br />
                        <strong>Téléphone :</strong> 01 23 45 67 89
                    </p>
                </div>

                <!-- Magasin 2 -->
                <div>
                    <h2 class="text-xl font-semibold text-gray-800 mb-2">FANStech Lyon</h2>
                    <p class="text-gray-600">
                        <strong>Adresse :</strong> 45 Avenue des Lumières, 69002 Lyon<br />
                        <strong>Horaires :</strong> Lundi - Samedi : 10h - 19h<br />
                        <strong>Téléphone :</strong> 04 56 78 90 12
                    </p>
                </div>

                <!-- Magasin 3 -->
                <div>
                    <h2 class="text-xl font-semibold text-gray-800 mb-2">FANStech Marseille</h2>
                    <p class="text-gray-600">
                        <strong>Adresse :</strong> 89 Boulevard Méditerranée, 13008 Marseille<br />
                        <strong>Horaires :</strong> Lundi - Samedi : 10h - 19h<br />
                        <strong>Téléphone :</strong> 04 91 23 45 67
                    </p>
                </div>

                <!-- Magasin 4 -->
                <div>
                    <h2 class="text-xl font-semibold text-gray-800 mb-2">FANStech Lille</h2>
                    <p class="text-gray-600">
                        <strong>Adresse :</strong> 32 Rue du Nord, 59000 Lille<br />
                        <strong>Horaires :</strong> Lundi - Samedi : 10h - 19h<br />
                        <strong>Téléphone :</strong> 03 20 12 34 56
                    </p>
                </div>

                <!-- Magasin 5 -->
                <div>
                    <h2 class="text-xl font-semibold text-gray-800 mb-2">FANStech Bordeaux</h2>
                    <p class="text-gray-600">
                        <strong>Adresse :</strong> 14 Cours de la Liberté, 33000 Bordeaux<br />
                        <strong>Horaires :</strong> Lundi - Samedi : 10h - 19h<br />
                        <strong>Téléphone :</strong> 05 56 78 90 34
                    </p>
                </div>

                <!-- Magasin 6 -->
                <div>
                    <h2 class="text-xl font-semibold text-gray-800 mb-2">FANStech Toulouse</h2>
                    <p class="text-gray-600">
                        <strong>Adresse :</strong> 67 Place du Capitole, 31000 Toulouse<br />
                        <strong>Horaires :</strong> Lundi - Samedi : 10h - 19h<br />
                        <strong>Téléphone :</strong> 05 34 56 78 90
                    </p>
                </div>
            </div>

            <!-- Informations supplémentaires -->
            <div class="mt-12">
                <p class="text-gray-700 leading-relaxed">
                    Nous continuons d’étendre notre réseau pour mieux vous servir. Revenez régulièrement pour découvrir
                    nos nouvelles ouvertures. Pour toute question,
                    n’hésitez pas à nous contacter via notre email.
                </p>
            </div>
        </div>
    </section>
</template>

<style scoped>
a {
    transition: color 0.3s ease;
}

.container {
    max-width: 950px;
    margin: auto;
    font-size: 14px;
}

.container h2 {
    margin-top: 10px;
}
</style>
