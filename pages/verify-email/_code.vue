<template>
  <main>
    <b-loading :can-cancel='false' />
    <h1>Success. You may now log in.</h1>
    <NuxtLink to='/'>
      <button class='primary-button'>Log in.</button>
    </NuxtLink>
  </main>
</template>

<script>
import { ref } from 'vue'
import { useAxios } from '@/scripts/useHooks'
import { successToast } from '@/scripts/ui'

export default {
  name: 'VerifyEmailPage',
  setup() {
    const route = useRoute()
    const axios = useAxios()
    const success = ref(false)

    const code = route.params.code

    useLazyFetch(async () => {
      const res = await axios.$get(`/user/verify/${code}`)
      if (res) {
        successToast('Successfully verified your account. Please log in.')
        success.value = true;
      }
    })
  }
}
</script>
