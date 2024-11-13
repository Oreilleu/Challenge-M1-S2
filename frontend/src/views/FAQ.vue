<template>
    <section class="w-full py-12">
        <div class="max-w-7xl mx-auto px-4">
            <!-- Titre principal -->
            <h1 class="text-3xl font-semibold text-gray-800 mb-6">Foire Aux Questions (FAQ)</h1>

            <!-- Introduction -->
            <div class="text-gray-700 leading-relaxed mb-8">
                <p>
                    Bienvenue sur notre page FAQ. Vous trouverez ici les réponses aux questions les plus fréquentes. Si
                    vous avez d'autres questions, contactez-nous.
                </p>
            </div>

            <!-- Liste des questions -->
            <div class="space-y-6">
                <div v-for="(item, index) in faqItems" :key="index" class="faq-item">
                    <!-- Question -->
                    <div class="faq-question flex items-center justify-between p-4 bg-blue-100 rounded-md cursor-pointer"
                        @click="toggleAnswer(index)">
                        <span class="text-xl font-semibold text-gray-800">{{ item.question }}</span>
                        <svg :class="{ 'rotate-180': activeIndex === index }"
                            class="w-6 h-6 text-gray-600 transform transition-transform duration-300"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7">
                            </path>
                        </svg>
                    </div>
                    <!-- Réponse -->
                    <div v-if="activeIndex === index" class="faq-answer p-4 bg-gray-100 rounded-md">
                        <p>{{ item.answer }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            activeIndex: null,
            faqItems: [
                {
                    question: "1. Comment passer une commande ?",
                    answer: "Pour passer une commande, parcourez notre catalogue de produits, ajoutez les articles à votre panier, puis validez votre commande en procédant au paiement sécurisé."
                },
                {
                    question: "2. Quels modes de paiement acceptez-vous ?",
                    answer: "Nous acceptons les paiements par carte bancaire (Visa, Mastercard), PayPal, et virement bancaire. Tous les paiements sont sécurisés."
                },
                {
                    question: "3. Quels sont les délais de livraison ?",
                    answer: "Les délais de livraison sont généralement de 3 à 7 jours ouvrables. Vous recevrez un numéro de suivi pour suivre l'avancement de votre commande."
                },
                {
                    question: "4. Comment retourner un produit ?",
                    answer: "Les retours sont possibles sous 14 jours. Contactez notre service client pour obtenir une étiquette de retour et les instructions nécessaires."
                },
                {
                    question: "5. Comment contacter le service client ?",
                    answer: "Contactez-nous via notre formulaire de contact ou envoyez un e-mail à support@fanstech.com pour toute demande."
                }
            ]
        };
    },
    methods: {
        toggleAnswer(index) {
            this.activeIndex = this.activeIndex === index ? null : index;
        }
    }
};
</script>

<style scoped>
.faq-item {
    transition: all 0.3s ease-in-out;
}

.rotate-180 {
    transform: rotate(180deg);
}
</style>