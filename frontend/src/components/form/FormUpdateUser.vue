<template></template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import FormInput from '../FormInput.vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { registerFormSchema } from '@/utils/validation/schema'
import localStorageHandler from '@/utils/localStorageHandler'
import { User } from '@/utils/types/interfaces/user.interface'
</script>
