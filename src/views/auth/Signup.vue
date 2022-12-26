<template>
  <form @submit.prevent="handleSubmit">
    <h3>Sign up</h3>
    <input au type="text" placeholder="Display name" v-model="displayName" />
    <input type="email" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <div v-if="error" class="error">{{ error }}</div>
    <button type="submit" v-if="!isPending">Sign up</button>
    <button type="submit" v-if="isPending" disabled>Loading</button>
  </form>
</template>
<script>
import {ref} from 'vue'
import useSignup from '@/composables/useSignup'
export default {
  setup() {
    const {error, signup, isPending} = useSignup()

    const email = ref('')
    const password = ref('')
    const displayName = ref('')

    const handleSubmit = async () => {
      const res = await signup(email.value, password.value, displayName.value)
      if (!error.value) {
        email.value = ''
        password.value = ''
        displayName.value = ''
        console.log('user signed up')
      }
    }

    return {
      email,
      password,
      displayName,
      isPending,
      error,
      handleSubmit,
    }
  },
}
</script>
