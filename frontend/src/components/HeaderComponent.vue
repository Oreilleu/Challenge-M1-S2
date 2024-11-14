<template>
    <header class="w-full">
        <div class="max-w-7xl mx-auto px-4">
            <div class="flex justify-between items-center">
                <div class="flex items-center">
                    <button @click="toggleMenu" class="md:hidden p-2 hover:bg-gray-100 rounded-lg">
                        <Menu class="w-6 h-6" />
                    </button>
                    <div class="w-20 h-10 flex items-center justify-center mx-4 my-2.5">
                        <img src="/logo.png" />
                    </div>
                </div>

                <div class="hidden md:block flex-1 max-w-2xl mx-4">
                    <div class="relative">
                        <input type="search" placeholder="Que recherchez-vous ?"
                            class="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md" />
                        <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                </div>

                <div class="flex items-center">
                    <!-- Lien d'inscription avec l'icône User -->
                    <RouterLink v-if="route.path !== '/register' && !isAuthenticatedUser" to="/register"
                        class="p-2 hover:bg-gray-100 rounded-lg">
                        <User class="w-6 h-6" />
                    </RouterLink>

                    <!-- Bouton pour le panier -->
                    <button class="p-2 hover:bg-gray-100 rounded-lg">
                        <ShoppingCart class="w-6 h-6" />
                    </button>
                </div>
            </div>
        </div>

        <nav class="border-y border-gray-200">
            <div class="max-w-7xl mx-auto px-4">
                <ul class="hidden md:flex">
                    <li>
                        <RouterLink to="/" class="px-3 py-2 text-sm text-gray-700 hover:text-blue-600 block">Accueil
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/nouveautes" class="px-3 py-2 text-sm text-gray-700 hover:text-blue-600 block">
                            Nouveautés</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/smartphones" class="px-3 py-2 text-sm text-gray-700 hover:text-blue-600 block">
                            Smartphones</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/ordinateurs" class="px-3 py-2 text-sm text-gray-700 hover:text-blue-600 block">
                            Ordinateurs</RouterLink>
                    </li>
                </ul>
            </div>
        </nav>

        <div v-if="isMenuOpen" class="md:hidden">
            <ul class="bg-white px-4 py-2">
                <li>
                    <RouterLink to="/" class="py-2 text-sm text-gray-700 hover:text-blue-600 block">Accueil</RouterLink>
                </li>
                <li>
                    <RouterLink to="/nouveautes" class="py-2 text-sm text-gray-700 hover:text-blue-600 block">Nouveautés
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/smartphones" class="py-2 text-sm text-gray-700 hover:text-blue-600 block">
                        Smartphones</RouterLink>
                </li>
                <li>
                    <RouterLink to="/ordinateurs" class="py-2 text-sm text-gray-700 hover:text-blue-600 block">
                        Ordinateurs</RouterLink>
                </li>
            </ul>
        </div>

        <div class="py-2">
            <div class="max-w-7xl mx-auto px-4">
                <ul class="flex items-center flex-wrap text-sm text-gray-500">
                    <li>
                        <RouterLink to="/" class="hover:text-blue-600">Accueil</RouterLink>
                    </li>
                    <ChevronRight class="w-4 h-4 mx-2" />
                    <li>
                        <RouterLink to="/smartphones" class="hover:text-blue-600">Smartphones</RouterLink>
                    </li>
                    <ChevronRight class="w-4 h-4 mx-2" />
                    <li>
                        <RouterLink to="/iphone" class="hover:text-blue-600">Iphone</RouterLink>
                    </li>
                    <ChevronRight class="w-4 h-4 mx-2" />
                    <li>Iphone 14 plus - 280 G</li>
                </ul>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { Menu, Search, User, ShoppingCart, ChevronRight } from 'lucide-vue-next';

const isMenuOpen = ref(false);
const route = useRoute();
const isAuthenticatedUser = false;

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};
</script>