<template>
  <footer class="bg-blue-950 text-gray-300">
    <!-- Newsletter Section -->
    <div class="border-b border-gray-800">
      <div class="max-w-7xl mx-auto px-4 py-12">
        <div class="flex flex-col md:flex-row items-center justify-between gap-6">
          <div class="text-center md:text-left">
            <h3 class="text-xl font-bold text-white mb-2">Restez informé !</h3>
            <p class="text-sm text-gray-400">Inscrivez-vous pour recevoir nos meilleures offres</p>
          </div>
          <div class="w-full md:w-96">
            <form @submit.prevent="subscribeNewsletter" class="flex gap-2">
              <input type="email" v-model="email" placeholder="Votre adresse email"
                class="flex-1 px-4 py-2 bg-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              <button type="submit"
                class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200">
                S'inscrire
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Footer Content -->
    <div class="max-w-7xl mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <!-- À propos -->
        <div>
          <h4 class="text-lg font-semibold text-white mb-4">À propos</h4>
          <ul class="space-y-2">
            <li>
              <a href="/qui-sommes-nous" class="text-gray-400 hover:text-white transition duration-200">
                Qui sommes-nous
              </a>
            </li>
            <li>
              <RouterLink to="/nos-magasins" class="text-gray-400 hover:text-white transition duration-200">
                Nos magasins
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/recrutement" class="text-gray-400 hover:text-white transition duration-200">
                Recrutement
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/blog" class="text-gray-400 hover:text-white transition duration-200">
                Blog
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Service Client -->
        <div>
          <h4 class="text-lg font-semibold text-white mb-4">Service Client</h4>
          <ul class="space-y-2">
            <li>
              <RouterLink to="/centre-aide" class="text-gray-400 hover:text-white transition duration-200">
                Centre d'aide
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/retours-garanties" class="text-gray-400 hover:text-white transition duration-200">
                Retours & Garanties
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/mode-livraison" class="text-gray-400 hover:text-white transition duration-200">
                Mode de livraison
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Informations Légales -->
        <div>
          <h4 class="text-lg font-semibold text-white mb-4">Condition général</h4>
          <ul class="space-y-2">
            <li>
              <RouterLink to="/cgv" class="text-gray-400 hover:text-white transition duration-200">CGV</RouterLink>
            </li>
            <li>
              <RouterLink to="/mentions-legales" class="text-gray-400 hover:text-white transition duration-200">
                Mentions légales
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/politique-confidentialite"
                class="text-gray-400 hover:text-white transition duration-200">
                Politique de confidentialité
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/cookies" class="text-gray-400 hover:text-white transition duration-200">
                Cookies
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="text-lg font-semibold text-white mb-4">Contactez-nous</h4>
          <ul class="space-y-2">
            <li class="flex items-center gap-2">
              <Phone class="w-4 h-4" />
              <span>0800 123 456</span>
            </li>
            <li class="flex items-center gap-2">
              <Mail class="w-4 h-4" />
              <span>support@example.com</span>
            </li>
            <li class="flex items-center gap-2">
              <Clock class="w-4 h-4" />
              <span>Lun-Ven: 9h-19h</span>
            </li>
          </ul>
          <div class="mt-6">
            <div class="flex gap-4">
              <RouterLink to="/facebook" class="hover:text-white transition duration-200">
                <Facebook class="w-6 h-6" />
              </RouterLink>
              <RouterLink to="/twitter" class="hover:text-white transition duration-200">
                <Twitter class="w-6 h-6" />
              </RouterLink>
              <RouterLink to="/instagram" class="hover:text-white transition duration-200">
                <Instagram class="w-6 h-6" />
              </RouterLink>
              <RouterLink to="/youtube" class="hover:text-white transition duration-200">
                <Youtube class="w-6 h-6" />
              </RouterLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Payment Methods & Security -->
      <div class="border-t border-gray-800 pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center gap-6">
          <div class="flex gap-6 items-center">
            <div class="flex items-center gap-2 text-gray-400">
              <CreditCard class="w-6 h-6" />
              <span>Visa</span>
            </div>
            <div class="flex items-center gap-2 text-gray-400">
              <CreditCard class="w-6 h-6" />
              <span>Mastercard</span>
            </div>
            <div class="flex items-center gap-2 text-gray-400">
              <Wallet class="w-6 h-6" />
              <span>PayPal</span>
            </div>
            <div class="flex items-center gap-2 text-gray-400">
              <Smartphone class="w-6 h-6" />
              <span>Apple Pay</span>
            </div>
          </div>
          <div class="flex gap-6 items-center">
            <div class="flex items-center gap-2 text-gray-400">
              <ShieldCheck class="w-6 h-6" />
              <span>Paiement sécurisé</span>
            </div>
            <div class="flex items-center gap-2 text-gray-400">
              <Truck class="w-6 h-6" />
              <span>Livraison suivie</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-gray-800 mt-8 pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-sm text-gray-500">
            © {{ new Date().getFullYear() }} Votre Entreprise. Tous droits réservés.
          </p>
          <div class="flex gap-4">
            <RouterLink to="/plan-site" class="text-sm text-gray-500 hover:text-white transition duration-200">
              Plan du site
            </RouterLink>
            <RouterLink to="/accessibilite" class="text-sm text-gray-500 hover:text-white transition duration-200">
              Accessibilité
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  Phone,
  Mail,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  CreditCard,
  Wallet,
  Smartphone,
  ShieldCheck,
  Truck
} from 'lucide-vue-next'

const email = ref('')

const subscribeNewsletter = () => {
  // Logique d'inscription à la newsletter
  console.log('Email souscrit:', email.value)
  email.value = ''
}
</script>