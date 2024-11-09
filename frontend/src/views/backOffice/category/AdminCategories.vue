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
                        <el-button type="info" @click="handleShow(scope.row)">Afficher</el-button>
                        <el-button type="primary" @click="handleEdit(scope.row._id)">Éditer</el-button>
                        <el-button type="danger" @click="handleDelete(scope.row._id)">Supprimer</el-button>
                    </template>  
                </el-table-column>
            </el-table>
            <modal-component
                v-model:modalVisible="modalVisible"
                :title="modalTitle"
                :width="'60%'"
                @confirm="confirmAction"
            >
                <template #default>
                    <div>
                        <h2>{{ modalCategory?.name }}</h2>
                        <p>{{ modalCategory?.description }}</p>
                    </div>
                </template>
            </modal-component>
        </section>
    </AdminLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import AdminLayout from '@/components/AdminLayout.vue';
import ModalComponent from '@/components/Modal.vue'; // Assurez-vous d'importer votre composant modal
import type { Category } from '@/utils/types/interfaces/category.interface';
import { DrawerType } from '@/utils/types/drawer-type.enum';
import useDrawerStore from '@/utils/store/useDrawerStore'
import toastHandler from '@/utils/toastHandler';
import { ToastType } from '@/utils/types/toast-type.enum'

const categories = ref<Category[]>([]);
const search = ref('');
const modalVisible = ref(false);
const modalCategory = ref<Category | null>(null);
const modalTitle = ref('');
const drawerStore = useDrawerStore();

onMounted(() => {
  fetchCategories()
})

const fetchCategories = async() => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/category`);
        if (!response.ok) throw new Error();
        const json = await response.json();
        if (json.success) {
            categories.value = json.data;
        } else {
            throw new Error();
        }
    } catch (error) {
        console.error(error);
    }
};

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
        console.log('Catégorie supprimée avec succès');
        fetchCategories(); // Recharger les catégories
    } catch (error) {
        console.error(error);
    }
};

const filteredCategories = computed(() =>
    categories.value.filter((category: Category) =>
        !search.value ||
        category.name.toLowerCase().includes(search.value.toLowerCase()) ||
        (category.description ?? '').toLowerCase().includes(search.value.toLowerCase())
    )
);

const handleEdit = (id: Category["_id"]) => {
  const category = categories.value.find(category => category._id === id);
    if (category?._id) {
        drawerStore.openDrawerUpdateForm(DrawerType.UPDATE_CATEGORY, category._id);
    } else {
        toastHandler("Erreur lors de la récupération de l'identifiant du produit", ToastType.ERROR);
    }
}

const handleDelete = (id: Category["_id"]) => {
    const category = categories.value.find(category => category._id === id);
    if (category) {
        deleteCategory(category._id);
    } else {
        console.error('Catégorie non trouvée');
    }
};

const handleShow = (category: Category) => {
    modalCategory.value = category;
    modalTitle.value = 'Afficher la catégorie';
    modalVisible.value = true;
};

const confirmAction = () => {
    // Logique à exécuter lors de la confirmation dans le modal
    modalVisible.value = false;
};

</script>
