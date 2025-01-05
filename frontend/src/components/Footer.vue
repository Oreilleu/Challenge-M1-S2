<template>
  <footer v-if="!isAdminPage(route.fullPath)" class="footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <h4 class="footer-heading">À propos</h4>
          <ul class="footer-list">
            <li>
              <a href="/qui-sommes-nous" class="footer-link">Qui sommes-nous</a>
            </li>
            <li>
              <RouterLink to="/store" class="footer-link">Nos magasins</RouterLink>
            </li>
            <li>
              <a href="/faq" class="footer-link">FAQ</a>
            </li>
          </ul>
        </div>


        <!-- Informations Légales -->
        <div>
          <h4 class="footer-heading">Condition général</h4>
          <ul class="footer-list">
            <li>
              <RouterLink to="/condition-users" class="footer-link">Conditions Générales d'Utilisation (CGU)
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/condition-sale" class="footer-link">Conditions Générales de Vente (CGV)</RouterLink>
            </li>
            <li>
              <RouterLink to="/data-register" class="footer-link">Registre des Données</RouterLink>
            </li>

          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="footer-heading">Contactez-nous</h4>
          <ul class="footer-list">
            <li class="footer-contact">
              <Phone class="icon-small" />
              <span>0800 123 456</span>
            </li>
            <li class="footer-contact">
              <Mail class="icon-small" />
              <span>support@fanstech.com</span>
            </li>
            <li class="footer-contact">
              <Clock class="icon-small" />
              <span>Lun-Ven: 9h-19h</span>
            </li>
          </ul>
          <div class="footer-social">
            <RouterLink to="/facebook" class="footer-social-link">
              <Facebook class="icon" />
            </RouterLink>
            <RouterLink to="/twitter" class="footer-social-link">
              <Twitter class="icon" />
            </RouterLink>
            <RouterLink to="/instagram" class="footer-social-link">
              <Instagram class="icon" />
            </RouterLink>
            <RouterLink to="/youtube" class="footer-social-link">
              <Youtube class="icon" />
            </RouterLink>
          </div>
        </div>
      </div>

      <!-- Payment Methods & Security -->
      <div class="footer-divider">
        <div class="footer-payment">
          <div class="footer-payment-item">
            <CreditCard class="icon" />
            <span>Visa</span>
          </div>
          <div class="footer-payment-item">
            <CreditCard class="icon" />
            <span>Mastercard</span>
          </div>
          <div class="footer-payment-item">
            <Wallet class="icon" />
            <span>PayPal</span>
          </div>
          <div class="footer-payment-item">
            <Smartphone class="icon" />
            <span>Apple Pay</span>
          </div>
        </div>
        <div class="footer-security">
          <div class="footer-security-item">
            <ShieldCheck class="icon" />
            <span>Paiement sécurisé</span>
          </div>
          <div class="footer-security-item">
            <Truck class="icon" />
            <span>Livraison suivie</span>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="footer-bottom">
        <p class="footer-bottom-text">
          © {{ new Date().getFullYear() }} FANStech. Tous droits réservés.
        </p>
        <div class="footer-bottom-links">
          <RouterLink to="/plan-site" class="footer-bottom-link">Plan du site</RouterLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { isAdminPage } from '@/utils/isAdminPage'
import {
  Phone,
  Mail,
  Clock,
  CreditCard,
  Wallet,
  Smartphone,
  ShieldCheck,
  Truck
} from 'lucide-vue-next'
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<style scoped>
.footer {
  color: #d1d5db;
  background-color: #0046be;
}

.container {
  max-width: 1120px;
  margin: 0 auto;
  padding: 48px 16px;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  margin-bottom: 32px;
}

@media (min-width: 768px) {
  .footer-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .footer-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.footer-heading {
  font-size: 1.125rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 16px;
}

.footer-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-link {
  color: #d1d5db;
  transition: color 0.2s;
}

.footer-link:hover {
  color: #ffffff;
}

.footer-contact {
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon-small {
  width: 16px;
  height: 16px;
}

.footer-social {
  margin-top: 24px;
  display: flex;
  gap: 16px;
}

.footer-social-link {
  color: #d1d5db;
  transition: color 0.2s;
}

.footer-social-link:hover {
  color: #ffffff;
}

.icon {
  width: 24px;
  height: 24px;
}

.footer-divider {
  border-top: 1px solid #1f2937;
  padding-top: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

@media (min-width: 768px) {
  .footer-divider {
    flex-direction: row;
    justify-content: space-between;
  }
}

.footer-payment,
.footer-security {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.footer-payment-item,
.footer-security-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #d1d5db;
}

.footer-bottom {
  border-top: 1px solid #1f2937;
  margin-top: 32px;
  padding-top: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
}

@media (min-width: 768px) {
  .footer-bottom {
    flex-direction: row;
    justify-content: space-between;
  }
}

.footer-bottom-text {
  font-size: 0.875rem;
  color: #d1d5db;
}

.footer-bottom-links {
  display: flex;
  gap: 16px;
}

.footer-bottom-link {
  font-size: 0.875rem;
  color: #d1d5db;
  transition: color 0.2s;
}

.footer-bottom-link:hover {
  color: #ffffff;
}
</style>
