<template>
  <div>
    <h1>Mes Informations</h1>
    <FormUpdateUser />
    <el-button
      @click="changePassword"
      type="primary"
      style="display: block; width: 280px; margin-top: 10px"
      :loading="isLoadingSendEmailChangePassword"
    >
      Modifier mon mot de passe
    </el-button>
    <el-button
      @click="modalDeleteModel = true"
      type="danger"
      style="display: block; width: 280px; margin-left: 0; margin-top: 10px"
    >
      Suppression du compte
    </el-button>
  </div>

  <Modal
    :model-value="modalDeleteModel"
    title="Suppression du compte"
    :displayFooter="true"
    @close="modalDeleteModel = false"
    @confirm="deleteAccount"
  >
    Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible. Toutes vos
    données seront supprimées. Fanstech conservera uniquement les données liées aux commandes
    passées avec votre compte.
  </Modal>
</template>

<script setup>
import { ref } from 'vue'
import FormUpdateUser from './form/FormUpdateUser.vue'
import Modal from './Modal.vue'
import toastHandler from '@/utils/toastHandler'
import { ToastType } from '@/utils/types/toast-type.enum'
import useAuthStore from '@/utils/store/useAuthStore'
import { fetchDeleteAccount, fetchSendEmailChangePassword } from '@/utils/api/user'
import useOrderStore from '@/utils/store/useOrderStore'

const modalDeleteModel = ref(false)
const authStore = useAuthStore()
const orderStore = useOrderStore()
const isLoadingSendEmailChangePassword = ref(false)

const changePassword = async () => {
  isLoadingSendEmailChangePassword.value = true
  const isEmailSend = await fetchSendEmailChangePassword()

  if (isEmailSend) {
    toastHandler(
      'Un email de réinitialisation de mot de passe vous a été envoyé.',
      ToastType.SUCCESS
    )
  } else {
    toastHandler("Une erreur s'est produite lors de l'envoi de l'email.", ToastType.ERROR)
  }

  isLoadingSendEmailChangePassword.value = false
}

const deleteAccount = async () => {
  const isDeletedAccount = await fetchDeleteAccount()
  if (isDeletedAccount) {
    toastHandler('Votre compte a bien été supprimé.', ToastType.SUCCESS)
    authStore.logout()
    authStore.user = null
    orderStore.orders = []
    deliveryAddressStore.deliveryAddresses = []
  } else {
    toastHandler(
      "Une erreur s'est produite lors de la suppression de votre compte.",
      ToastType.ERROR
    )
  }
  modalDeleteModel.value = false
}
</script>

<style scoped>
.form-container {
  max-width: 800px;
  margin: 2rem 0;
}

.submit-btn {
  margin-top: 2rem;
}
</style>
