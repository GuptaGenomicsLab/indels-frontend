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
import { useFetch, useRoute, ref } from '@nuxtjs/composition-api'
import { useAxios } from '@/scripts/useHooks'
import { successToast } from '@/scripts/ui'

export default {
  name: 'VerifyEmailPage',
  setup() {
    const route = useRoute()
    const axios = useAxios()
    const success = ref(false)

    const code = route.value.params.code

    useFetch(async () => {
      const res = await axios.$get(`/user/verify/${code}`)
      if (res) {
        successToast('Successfully verified your account. Please log in.')
        success.value = true;
      }
    })
  }
}
</script>
