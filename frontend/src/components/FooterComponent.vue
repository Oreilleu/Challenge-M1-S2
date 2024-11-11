<template>
  <footer class="text-gray-300" style="background-color: #0046be;">

    <!-- Main Footer Content -->
    <div class="max-w-7xl mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <!-- À propos -->
        <div>
          <h4 class="text-lg font-semibold text-white mb-4">À propos</h4>
          <ul class="space-y-2">
            <li>
              <a href="/qui-sommes-nous" class="text-gray-300 hover:text-white transition duration-200">
                Qui sommes-nous
              </a>
            </li>
            <li>
              <RouterLink to="/nos-magasins" class="text-gray-300 hover:text-white transition duration-200">
                Nos magasins
              </RouterLink>
            </li>
            <li>
              <a href="/faq" class="text-gray-300 hover:text-white transition duration-200">
                FAQ
              </a>
            </li>
            <li>
              <RouterLink to="/blog" class="text-gray-300 hover:text-white transition duration-200">
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
              <RouterLink to="/centre-aide" class="text-gray-300 hover:text-white transition duration-200">
                Centre d'aide
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/retours-garanties" class="text-gray-300 hover:text-white transition duration-200">
                Retours & Garanties
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/mode-livraison" class="text-gray-300 hover:text-white transition duration-200">
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
              <a href="/cgv" class="text-gray-300 hover:text-white transition duration-200">CGV</a>
            </li>
            <li>
              <RouterLink to="/mentions-legales" class="text-gray-300 hover:text-white transition duration-200">
                Mentions légales
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/politique-confidentialite"
                class="text-gray-300 hover:text-white transition duration-200">
                Politique de confidentialité
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/cookies" class="text-gray-300 hover:text-white transition duration-200">
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
            <div class="flex items-center gap-2 text-gray-300">
              <CreditCard class="w-6 h-6" />
              <span>Visa</span>
            </div>
            <div class="flex items-center gap-2 text-gray-300">
              <CreditCard class="w-6 h-6" />
              <span>Mastercard</span>
            </div>
            <div class="flex items-center gap-2 text-gray-300">
              <Wallet class="w-6 h-6" />
              <span>PayPal</span>
            </div>
            <div class="flex items-center gap-2 text-gray-300">
              <Smartphone class="w-6 h-6" />
              <span>Apple Pay</span>
            </div>
          </div>
          <div class="flex gap-6 items-center">
            <div class="flex items-center gap-2 text-gray-300">
              <ShieldCheck class="w-6 h-6" />
              <span>Paiement sécurisé</span>
            </div>
            <div class="flex items-center gap-2 text-gray-300">
              <Truck class="w-6 h-6" />
              <span>Livraison suivie</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-gray-800 mt-8 pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-sm text-gray-300">
            © {{ new Date().getFullYear() }} Votre Entreprise. Tous droits réservés.
          </p>
          <div class="flex gap-4">
            <RouterLink to="/plan-site" class="text-sm text-gray-300 hover:text-white transition duration-200">
              Plan du site
            </RouterLink>
            <RouterLink to="/accessibilite" class="text-sm text-gray-300 hover:text-white transition duration-200">
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