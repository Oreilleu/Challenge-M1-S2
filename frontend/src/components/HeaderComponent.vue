<template>
    <header class="header">
        <div class="container">
            <div class="logo-container">
                <button @click="toggleMenu" class="menu-button">
                    <Menu />
                </button>
                <div class="logo">
                    <span>Logo</span>
                </div>
            </div>
            <div class="search-container">
                <div class="search-wrapper">
                    <input type="search" placeholder="Que recherchez vous ?" class="search-input" />
                    <Search class="search-icon" />
                </div>
            </div>
            <div class="user-actions">
                <button class="icon-button">
                    <User />
                </button>
                <button class="icon-button">
                    <ShoppingCart />
                </button>
            </div>
        </div>
        <nav class="main-nav">
            <div class="container">
                <ul class="nav-list">
                    <li v-for="item in menuItems" :key="item">
                        <a href="#" class="nav-link">{{ item }}</a>
                    </li>
                </ul>
            </div>
        </nav>
        <div v-if="isMenuOpen" class="mobile-menu">
            <ul class="mobile-nav-list">
                <li v-for="item in menuItems" :key="item">
                    <a href="#" class="mobile-nav-link">{{ item }}</a>
                </li>
            </ul>
        </div>
        <div class="breadcrumb">
            <div class="container">
                <ul class="breadcrumb-list">
                    <li><a href="#" class="breadcrumb-link">Accueil</a></li>
                    <ChevronRight class="breadcrumb-icon" />
                    <li><a href="#" class="breadcrumb-link">Smartphones</a></li>
                    <ChevronRight class="breadcrumb-icon" />
                    <li><a href="#" class="breadcrumb-link">Iphone</a></li>
                    <ChevronRight class="breadcrumb-icon" />
                    <li>Iphone 14 plus - 280 G</li>
                </ul>
            </div>
        </div>
    </header>
</template>

<script setup>
import { ref } from 'vue'
import { Menu, Search, User, ShoppingCart, ChevronRight } from 'lucide-vue-next'

const isMenuOpen = ref(false)
const menuItems = ['Tous les produits', 'Nouveautés', 'Smartphones', 'Ordinateurs']

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
}
</script>

<style scoped>
.header {
    width: 100%;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
}

.logo-container {
    display: flex;
    align-items: center;
}

.menu-button {
    display: none;
    padding: 0.5rem;
    background: none;
    border: none;
    cursor: pointer;
}

.logo {
    width: 5rem;
    height: 2.5rem;
    background-color: #e5e7eb;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px 20px;
}

.logo span {
    font-size: 0.875rem;
    font-weight: bold;
}

.search-container {
    flex: 1;
    max-width: 36rem;
    margin: 0 1rem;
}

.search-wrapper {
    position: relative;
    width: 100%;
}

.search-input {
    width: 100%;
    padding: 0.5rem 2.5rem 0.5rem 2.5rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
}

.search-icon {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    width: 1rem;
    height: 1rem;
    color: #9ca3af;
}

.user-actions {
    display: flex;
    align-items: center;
}

.icon-button {
    padding: 0.5rem;
    background: none;
    border: none;
    cursor: pointer;
}

.main-nav {
    border-top: 1px solid #e5e7eb;
    border-bottom: 1px solid #e5e7eb;
}

.nav-list {
    display: flex;
    list-style-type: none;
    padding: 0;
}

.nav-link {
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
    color: #374151;
    text-decoration: none;
}

.nav-link:hover {
    color: #2563eb;
}

.mobile-menu {
    display: none;
}

.mobile-nav-list {
    list-style-type: none;
    padding: 0.5rem 1rem;
    background-color: white;
}

.mobile-nav-link {
    display: block;
    padding: 0.5rem 0;
    font-size: 0.875rem;
    color: #374151;
    text-decoration: none;
}

.mobile-nav-link:hover {
    color: #2563eb;
}

.breadcrumb {
    padding: 0.5rem 0;
}

.breadcrumb-list {
    display: flex;
    align-items: center;
    list-style-type: none;
    padding: 0;
    font-size: 0.875rem;
    color: #6b7280;
    flex-wrap: wrap;
}

.breadcrumb-link {
    color: #6b7280;
    text-decoration: none;
}

.breadcrumb-link:hover {
    color: #2563eb;
}

.breadcrumb-icon {
    width: 1rem;
    height: 1rem;
    margin: 0 0.5rem;
}

@media (max-width: 768px) {
    .container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
    }

    .menu-button {
        display: block;
    }

    .search-container {
        display: none;
    }

    .main-nav {
        display: none;
    }

    .mobile-menu {
        display: block;
    }
}
</style>