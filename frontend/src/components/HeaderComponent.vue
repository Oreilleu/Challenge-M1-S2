<template>
    <header class="w-full">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <button 
              @click="toggleMenu" 
              class="md:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <Menu class="w-6 h-6" />
            </button>
            <div class="bg-gray-200 w-20 h-10 flex items-center justify-center mx-4 my-2.5">
              <span class="text-sm font-bold">Logo</span>
            </div>
          </div>
  
          <div class="hidden md:block flex-1 max-w-2xl mx-4">
            <div class="relative">
              <input
                type="search"
                placeholder="Que recherchez vous ?"
                class="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md"
              />
              <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
  
          <div class="flex items-center">
            <button class="p-2 hover:bg-gray-100 rounded-lg">
              <User class="w-6 h-6" />
            </button>
            <button class="p-2 hover:bg-gray-100 rounded-lg">
              <ShoppingCart class="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
  
      <nav class="border-y border-gray-200">
        <div class="max-w-7xl mx-auto px-4">
          <ul class="hidden md:flex">
            <li v-for="item in menuItems" :key="item">
              <a
                href="#"
                class="px-3 py-2 text-sm text-gray-700 hover:text-blue-600 block"
              >
                {{ item }}
              </a>
            </li>
          </ul>
        </div>
      </nav>
  
      <div v-if="isMenuOpen" class="md:hidden">
        <ul class="bg-white px-4 py-2">
          <li v-for="item in menuItems" :key="item">
            <a
              href="#"
              class="py-2 text-sm text-gray-700 hover:text-blue-600 block"
            >
              {{ item }}
            </a>
          </li>
        </ul>
      </div>
  
      <div class="py-2">
        <div class="max-w-7xl mx-auto px-4">
          <ul class="flex items-center flex-wrap text-sm text-gray-500">
            <li>
              <a href="#" class="hover:text-blue-600">Accueil</a>
            </li>
            <ChevronRight class="w-4 h-4 mx-2" />
            <li>
              <a href="#" class="hover:text-blue-600">Smartphones</a>
            </li>
            <ChevronRight class="w-4 h-4 mx-2" />
            <li>
              <a href="#" class="hover:text-blue-600">Iphone</a>
            </li>
            <ChevronRight class="w-4 h-4 mx-2" />
            <li>Iphone 14 plus - 280 G</li>
          </ul>
        </div>
      </div>
    </header>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { Menu, Search, User, ShoppingCart, ChevronRight } from 'lucide-vue-next'
  
  const isMenuOpen = ref(false)
  const menuItems = ['Tous les produits', 'Nouveautés', 'Smartphones', 'Ordinateurs']
  
  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
  }
  </script>