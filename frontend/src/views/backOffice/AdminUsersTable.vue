<template>
    <AdminLayout>
        <Table 
            title="Liste des utilisateurs"
            :table-data="userStore.paginatedUsers.data"
            empty-text="Aucun utilisateur trouvé"
            :currentPage="currentPage"
            :pageSize="pageSize"
            :totalItems="userStore.paginatedUsers.total"
            @openDrawerUpdate="openDrawerUpdate"
            @displayModalDelete="displayModalDelete"
            @deleteSelectedData="deleteSelectedUsers"
            @changePage="HandleChangePage"
            @changeSizePage="HandleChangeSizePage"
            @search="HandleSearch"
        >
        </Table>
        <Modal
            :model-value="!!userToDelete"
            :title="`Êtes-vous sur de vouloir supprimer l'utilisateur : ` + userToDelete?._id"
            :displayFooter="true"
            @close="userToDelete = null"
            @confirm="deleteUser(userToDelete?._id)"
        >
        </Modal>

    </AdminLayout>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import AdminLayout from '@/components/AdminLayout.vue';
import Table from '@/components/Table.vue';
import Modal from '@/components/Modal.vue';
import type {User} from '@/utils/types/interfaces/user.interface';
import useUserStore from '@/utils/store/useUserStore';
import {DrawerType} from '@/utils/types/drawer-type.enum';
import {ToastType} from '@/utils/types/toast-type.enum';
import useDrawerStore from '@/utils/store/useDrawerStore';
import toastHandler from '@/utils/toastHandler';
import {fetchDeleteUser} from '@/utils/api/user';

const userStore = useUserStore();
const drawerStore = useDrawerStore();
const currentPage = ref<number>(1);
const pageSize = ref<number>(20);
const searchInput = ref('');
const searchOption = ref('email');

const userToDelete = ref<User | null>(null);

const loadPaginatedUsers = () => {
    userStore.updatePaginatedUsers(currentPage.value, pageSize.value, searchInput.value, searchOption.value);
};

const HandleChangePage = (page: number) => {
    currentPage.value = page;
    loadPaginatedUsers();
};

const HandleChangeSizePage = (size: number) => {
    pageSize.value = size;
    loadPaginatedUsers();
};

const HandleSearch = (search: string, searchKey: string) => {
    if (search === '') {
        searchInput.value = 'email';
        loadPaginatedUsers();
    } else {
        searchInput.value = search;
        searchOption.value = searchKey;
        loadPaginatedUsers();
    }
};

const openDrawerUpdate = (user: User) => {
    if(!user?._id) {
        toastHandler('Erreur lors de la récupération de l\'utilisateur', ToastType.ERROR);
        return;
    }
    drawerStore.openDrawerUpdateForm(DrawerType.UPDATE_USER, user.email);
};

const displayModalDelete = (user: User) => {
    userToDelete.value = user;
};

const deleteUser = async (userId: string | undefined) => {
    const isDeleted = await fetchDeleteUser();
    
    if(isDeleted) {
        toastHandler('Utilisateur supprimé avec succès', ToastType.SUCCESS);
        userToDelete.value = null;
        loadPaginatedUsers();
        return;
    } 
    userToDelete.value = null;

};

const deleteSelectedUsers = async (selectedUsers: User[]) => {
    const isDeleted = await fetchDeleteUser();
    
    if(isDeleted) {
        toastHandler('Utilisateurs supprimés avec succès', ToastType.SUCCESS);
        loadPaginatedUsers();
        return;
    }
};

onMounted(() => {
    loadPaginatedUsers();
});


</script>

<style scoped></style>