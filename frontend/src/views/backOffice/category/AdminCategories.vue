<template>
    <AdminLayout>
        <section style="width:100%">
        <h1>Liste des catégories</h1>
        <el-table :data="filteredCategories" :empty-text="'Aucune catégorie trouvée'">
            <el-table-column prop="_id" label="ID"></el-table-column>
            <el-table-column prop="name" label="Nom"></el-table-column>
            <el-table-column prop="description" label="Description"></el-table-column>
            <el-table-column align="right">
                <template #header>
                    <el-input v-model="search" placeholder="Rechercher"></el-input>
                </template> 
                <template #default="scope">
                    <!-- Afficher une categorie-->
                    <el-button type="info" @click="handleShow(scope.row._id)">Afficher</el-button>
                    <el-button type="primary" @click="handleEdit(scope.row._id)">Editer</el-button>
                    <el-button type="danger" @click="handleDelete(scope.row._id)">Supprimer</el-button>
                </template>  
            </el-table-column>
        </el-table>
        </section>
    </AdminLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import AdminLayout from '@/components/AdminLayout.vue'
import type { Category } from '@/utils/types/category.interface';
//ajouter category interface

const categories = ref<Category[]>([]);
const search = ref('');

onMounted(() => {
    fetchCategories();
});

const fetchCategories = async() => {
    try{
        const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/category`);

        if (!response.ok) {
            throw new Error();
        }

        const json = await response.json();

        if (json.success) {
            categories.value = json.data;
            console.log('Categories', categories.value);
        } else {
            throw new Error();
        }
    } catch (error) {
        console.error(error);
    }
}

const deleteCategory = async (id: Category["_id"]) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/category/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Une erreur est survenue');
        }

        console.log('Categoie supprimée avec succès');
    } catch (error) {
        console.error(error);
    }
}

const filteredCategories = computed(() =>
  categories.value.filter(
    (category : Category) =>
      !search.value ||
      category.name.toLowerCase().includes(search.value.toLowerCase()) ||
      category.description.toLowerCase().includes(search.value.toLowerCase())
  )
)

const handleEdit = (id: Category["_id"]) => {
    
}

const handleDelete = (id: Category["_id"]) => {
    const category = categories.value.find(category => category._id === id);
    if (category) {
        deleteCategory(category._id);
        console.log('Suppression de la catégorie', category);
    }
    else{
        console.error('Catégorie non trouvée');
    }
}

const handleShow = (id: Category["_id"]) => {
    const category = categories.value.find(category => category._id === id);
    if (category) {
        //afficher la categorie
    }
}

</script>