<template>
  <div>
    <h1>Mes Informations</h1>
    <el-form label-position="top" class="form-container" @submit.prevent="handleSubmit">
      <div class="form-group">
        <label>Civilité :</label>
        <el-radio-group v-model="form.civility">
          <el-radio label="man">M.</el-radio>
          <el-radio label="woman">Mme</el-radio>
        </el-radio-group>
      </div>
      <div class="form-row">
        <el-form-item label="Prénom :">
          <el-input v-model="form.firstname" />
        </el-form-item>
        <el-form-item label="Nom de famille :">
          <el-input v-model="form.lastname" />
        </el-form-item>
      </div>
      <el-form-item label="Email :">
        <el-input disabled="true" v-model="form.email" type="email" />
      </el-form-item>
      <el-form-item label="Téléphone :">
        <el-input v-model="form.phone" type="tel" />
      </el-form-item>
      <el-button type="primary" class="submit-btn" @click="handleSubmit" :loading="isSubmitting">
        Mettre à jour
      </el-button>
    </el-form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { fetchCurrentUser, updateUserProfile } from '@/utils/api/user'

const form = ref({
  civility: '',
  firstname: '',
  lastname: '',
  email: '',
  phone: ''
})

const isSubmitting = ref(false)

const getUserData = async () => {
  try {
    const response = await fetchCurrentUser()
    if (response.success && response.data) {
      const userData = response.data
      form.value = {
        civility: userData.civility || '',
        firstname: userData.firstname || '',
        lastname: userData.lastname || '',
        email: userData.email || '',
        phone: userData.phone || ''
      }
    }
  } catch (error) {
    ElMessage.error('Impossible de récupérer les données utilisateur')
    console.error('Erreur lors de la récupération des données utilisateur :', error)
  }
}

const handleSubmit = async () => {
  // Validation basique des champs
  if (!form.value.firstname || !form.value.lastname || !form.value.email) {
    ElMessage.warning('Veuillez remplir tous les champs obligatoires')
    return
  }

  // Validation email simple
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(form.value.email)) {
    ElMessage.warning('Veuillez saisir un email valide')
    return
  }

  isSubmitting.value = true

  try {
    const response = await updateUserProfile(form.value)

    if (response.success) {
      ElMessage.success('Profil mis à jour avec succès')
      const userData = response.data
      form.value = {
        civility: userData.civility || '',
        firstname: userData.firstname || '',
        lastname: userData.lastname || '',
        email: userData.email || '',
        phone: userData.phone || ''
      }
    } else {
      ElMessage.error(response.message || 'Échec de la mise à jour du profil')
    }
  } catch (error) {
    ElMessage.error('Une erreur est survenue lors de la mise à jour du profil')
    console.error('Erreur de mise à jour du profil :', error)
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  getUserData()
})
</script>

<style>
.form-container {
  max-width: 800px;
  margin: 2rem 0;
}

.submit-btn {
  margin-top: 2rem;
}
</style>
