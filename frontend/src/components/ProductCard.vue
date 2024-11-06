<template>
    <div v-if="products && products.length > 0">
      <el-col :span="19">
        <el-row :gutter="20">
          <el-col v-for="(product, index) in products" :key="index" :span="6">
            <el-card shadow="hover">
              <ul v-if="product.variation && product.variation.length > 0">
                <li v-for="(variation, index) in product.variation" :key="index">
                  <img src="https://placehold.co/600x400" alt="product image" />
                  <span>{{ product.name }}</span>
                  <p><strong>Price:</strong> ${{ variation.price }}</p>
                  <p><strong>Quantity:</strong> {{ variation.quantite }}</p>
                  <p v-if="variation.quantite > 0" style="color: green;">
                    <strong>Disponibilité:</strong> Disponible
                  </p>
                  <p v-else style="color: red;">
                    <strong>Disponibilité:</strong> Indisponible
                    <el-button type="primary" disabled>Ajouter au panier</el-button>
                  </p>
                  <el-button type="primary">Voir cette offre</el-button>
                </li>
              </ul>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </div>
    <p v-else>Loading products...</p>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue';
  import type { Product } from '@/utils/types/product.interface';
  
  const props = defineProps<{
    products: Product[] | null;
  }>();
  </script>
  
  <style scoped>
  .product-image {
    width: 100%;
    height: auto;
    object-fit: cover;
    margin-bottom: 10px;
  }
  </style>
  