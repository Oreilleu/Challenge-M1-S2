<template>
    <section class="section">
        <div class="container">
            <!-- Titre principal -->
            <h1 class="title">Nos Magasins</h1>

            <!-- Introduction -->
            <p class="intro">
                Découvrez les différents points de vente FANStech. Que vous soyez en quête de conseils personnalisés, de
                la dernière technologie ou d'un service après-vente, nos équipes vous accueillent dans nos magasins à
                travers le pays. Trouvez le magasin le plus proche de chez vous grâce à la liste ci-dessous.
            </p>

            <!-- Liste des magasins -->
            <div class="grid">
                <!-- Magasin 1 -->
                <div class="store-block">
                    <h2 class="store-title">FANStech Paris</h2>
                    <p class="store-details">
                        <strong>Adresse :</strong> 123 Rue de la Technologie, 75001 Paris<br />
                        <strong>Horaires :</strong> Lundi - Samedi : 10h - 19h<br />
                        <strong>Téléphone :</strong> 01 23 45 67 89
                    </p>
                </div>

                <!-- Magasin 2 -->
                <div class="store-block">
                    <h2 class="store-title">FANStech Lyon</h2>
                    <p class="store-details">
                        <strong>Adresse :</strong> 45 Avenue des Lumières, 69002 Lyon<br />
                        <strong>Horaires :</strong> Lundi - Samedi : 10h - 19h<br />
                        <strong>Téléphone :</strong> 04 56 78 90 12
                    </p>
                </div>

                <!-- Magasin 3 -->
                <div class="store-block">
                    <h2 class="store-title">FANStech Marseille</h2>
                    <p class="store-details">
                        <strong>Adresse :</strong> 89 Boulevard Méditerranée, 13008 Marseille<br />
                        <strong>Horaires :</strong> Lundi - Samedi : 10h - 19h<br />
                        <strong>Téléphone :</strong> 04 91 23 45 67
                    </p>
                </div>

                <!-- Magasin 4 -->
                <div class="store-block">
                    <h2 class="store-title">FANStech Lille</h2>
                    <p class="store-details">
                        <strong>Adresse :</strong> 32 Rue du Nord, 59000 Lille<br />
                        <strong>Horaires :</strong> Lundi - Samedi : 10h - 19h<br />
                        <strong>Téléphone :</strong> 03 20 12 34 56
                    </p>
                </div>

                <!-- Magasin 5 -->
                <div class="store-block">
                    <h2 class="store-title">FANStech Bordeaux</h2>
                    <p class="store-details">
                        <strong>Adresse :</strong> 14 Cours de la Liberté, 33000 Bordeaux<br />
                        <strong>Horaires :</strong> Lundi - Samedi : 10h - 19h<br />
                        <strong>Téléphone :</strong> 05 56 78 90 34
                    </p>
                </div>

                <!-- Magasin 6 -->
                <div class="store-block">
                    <h2 class="store-title">FANStech Toulouse</h2>
                    <p class="store-details">
                        <strong>Adresse :</strong> 67 Place du Capitole, 31000 Toulouse<br />
                        <strong>Horaires :</strong> Lundi - Samedi : 10h - 19h<br />
                        <strong>Téléphone :</strong> 05 34 56 78 90
                    </p>
                </div>
            </div>

            <!-- Informations supplémentaires -->
            <div class="additional-info">
                <p>
                    Nous continuons d’étendre notre réseau pour mieux vous servir. Revenez régulièrement pour découvrir
                    nos nouvelles ouvertures. Pour toute question, n’hésitez pas à nous contacter via notre email.
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

.store-block {
    margin-bottom: 1rem;
}

.store-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #2d3748;
    /* text-gray-800 */
    margin-bottom: 0.5rem;
}

.store-details {
    color: #718096;
    /* text-gray-600 */
    line-height: 1.5;
}

.additional-info {
    margin-top: 3rem;
    color: #4a5568;
    /* text-gray-700 */
    line-height: 1.75;
}
</style>