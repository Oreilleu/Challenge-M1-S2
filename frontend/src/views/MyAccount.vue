<template>
  <div class="app-container">
    <!-- Mobile Menu Button -->
    <button class="burger-menu" @click="toggleMenu">
      <el-icon>
        <MenuIcon />
      </el-icon>
    </button>

    <!-- Sidebar -->
    <aside class="sidebar" :class="{ 'sidebar-open': isMenuOpen }">
      <div class="profile-section">
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
          alt="Profile" class="avatar" />
        <h2>Bonjour</h2>
        <p class="user-name">
          <span v-if="user.civility === 'woman'">Mme</span>
          <span v-else>Mr</span>
          {{ " " + user.firstname + " " + user.lastname }}
        </p>
        <el-button v-if="!authStore.isAuthenticatedUser" type="danger" class="logout-btn" @click="logout">ME
          DÉCONNECTER</el-button>
      </div>

      <nav class="nav-menu">
        <a v-for="item in menuItems" :key="item.id" href="#" @click.prevent="selectMenuItem(item)"
          :class="['nav-item', { active: currentView === item.id }]">
          {{ item.label }}
        </a>
      </nav>
    </aside>

    <!-- Contenu dynamique -->
    <main class="main-content">
      <MyInformations v-if="currentView === 'my-account'" />
      <MyOrders v-else-if="currentView === 'my-orders'" />
      <MyAddresses v-else-if="currentView === 'my-adress'" />
      <MyFavorites v-else-if="currentView === 'my-favorites'" />
      <MySettings v-else-if="currentView === 'my-settings'" />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { MenuIcon } from 'lucide-vue-next'
import MyInformations from '@/components/MyInformations.vue'
import MyOrders from '@/components/MyOrders.vue'
import MyAddresses from '@/components/MyAddresses.vue'
import MyFavorites from '@/components/MyFavorites.vue'
import MySettings from '@/components/MySettings.vue'
import useAuthStore from '@/utils/store/useAuthStore'

const authStore = useAuthStore()

const isMenuOpen = ref(false)
const currentView = ref('my-account')

const menuItems = [
  { id: 'my-account', label: 'Mes informations' },
  { id: 'my-orders', label: 'Mes commandes' },
  { id: 'my-adress', label: 'Mes adresses' },
  { id: 'my-favorites', label: 'Mes favories' },
  { id: 'my-settings', label: 'Paramètres' }
]

const user = ref({
  civility: '',
  firstname: '',
  lastname: '',
  email: '',
  phone: ''
})

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const selectMenuItem = (item) => {
  currentView.value = item.id
  isMenuOpen.value = false
}

const logout = () => {
  authStore.logout()
}

onMounted(() => {
  const userData = localStorage.getItem('user');
  if (userData) {
    user.value = JSON.parse(userData);
  }
});
</script>

<style>
.app-container {
  display: flex;
  /* min-height: 100vh; */
  height: 100%;
  position: relative;
}

.burger-menu {
  display: none;
  position: relative;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.sidebar {
  width: 280px;
  background-color: #f5f5f5;
  padding: 2rem;
  height: 100%;
  position: relative;
  overflow-y: auto;
}

.profile-section {
  text-align: center;
  margin-bottom: 2rem;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 1rem;
}

.user-name {
  font-size: 1.2rem;
  margin: 0.5rem 0;
}

.client-id {
  color: #666;
  margin-bottom: 1rem;
}

.logout-btn {
  width: 100%;
}

.nav-menu {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-item {
  padding: 0.8rem 1rem;
  text-decoration: none;
  color: #333;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-item:hover,
.nav-item.active {
  background-color: #e0e0e0;
}

.main-content {
  flex: 1;
  padding: 2rem;
  /* margin-left: 280px; */
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .burger-menu {
    z-index: 1000;
    position: absolute;
    top: 10px;
    left: 10px;
    background: rgb(225, 223, 221);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    height: 30px;
    width: 30px;
    font-size: 16px;
    border: 1px solid #d1d5db;
  }

  .sidebar {
    position: absolute;
    transform: translateX(-110%);
    transition: transform 0.3s ease;
    border-radius: 10px;
    z-index: 999;
    box-shadow: 5px 5px 8px #80808036;
    border: 1px solid #80808036;
  }

  .sidebar-open {
    transform: translateX(0);
  }

  .main-content {
    margin-left: 0;
    padding-top: 4rem;
  }

  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
