<template>
    <section class="section">
        <div class="container">
            <!-- Titre principal -->
            <h1 class="title">Qui sommes-nous ?</h1>

            <!-- Présentation de Fanstech -->
            <div class="text-block">
                <p>
                    Chez <strong>Fanstech</strong>, nous sommes passionnés par l'innovation et l'accessibilité dans le
                    domaine de la technologie. Nous avons pour mission de rendre les technologies de pointe plus
                    accessibles, que ce soit à travers les dernières tendances en matière de smartphones, ordinateurs,
                    ou gadgets technologiques.
                </p>
                <p class="mt">
                    Depuis notre création, nous nous engageons à offrir aux passionnés de technologie des produits de
                    qualité, à des prix compétitifs, accompagnés d'un service client exceptionnel. Notre plateforme
                    permet également à d'autres entreprises et particuliers de partager et vendre leurs produits,
                    favorisant ainsi un écosystème technologique dynamique et inclusif.
                </p>
            </div>

            <!-- Mission, Vision et Valeurs -->
            <div class="grid">
                <!-- Mission -->
                <div class="card">
                    <h2 class="card-title">Notre Mission</h2>
                    <p class="card-text">
                        Rendre la technologie accessible à tous en proposant une large gamme de produits et services
                        adaptés aux besoins de chacun, tout en soutenant les entrepreneurs locaux.
                    </p>
                </div>

                <!-- Vision -->
                <div class="card">
                    <h2 class="card-title">Notre Vision</h2>
                    <p class="card-text">
                        Devenir une référence en matière de technologie accessible et un acteur majeur dans le
                        développement technologique en Afrique, en offrant des solutions innovantes et adaptées.
                    </p>
                </div>

                <!-- Valeurs -->
                <div class="card">
                    <h2 class="card-title">Nos Valeurs</h2>
                    <ul class="card-list">
                        <li>Innovation</li>
                        <li>Accessibilité</li>
                        <li>Transparence</li>
                        <li>Service client de qualité</li>
                        <li>Impact social</li>
                    </ul>
                </div>
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
    /* Equivalent à text-gray-800 */
    margin-bottom: 1.5rem;
}

.text-block {
    color: #4a5568;
    /* Equivalent à text-gray-700 */
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
    /* Equivalent à text-gray-800 */
    margin-bottom: 1rem;
}

.card-text {
    color: #718096;
    /* Equivalent à text-gray-600 */
    line-height: 1.5;
}

.card-list {
    color: #718096;
    /* Equivalent à text-gray-600 */
    list-style-type: disc;
    padding-left: 1rem;
}
</style>