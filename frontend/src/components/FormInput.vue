<template>
  <div class="container-input">
    <label :class="hiddenLabel && 'visually-hidden'">{{ label }}</label>
    <el-input
      v-model="internalValue"
      :type="type"
      :show-password="type === 'password'"
      @blur="handleBlur"
      :placeholder="placeholder"
    />
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: 'FormInput',
  props: {
    label: {
      type: String,
      required: true
    },
    hiddenLabel: {
      type: Boolean,
      required: false,
      default: false
    },
    placeholder: {
      type: String,
      required: true
    },
    modelValue: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    error: {
      type: String,
      required: false
    }
  },
  computed: {
    internalValue: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    }
  },
  methods: {
    handleBlur() {
      this.$emit('blur')
    }
  }
}
</script>

<style scoped>
.container-input {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.el-input {
  width: 250px;
}
.error {
  color: var(--danger);
  text-align: center;
}
</style>
