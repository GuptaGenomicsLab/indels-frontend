<template>
  <main>
    <section class='content-box'>
      <h1>Welcome to GLIISCEN</h1>
      <p v-if='homescreenText.length < 1'>
        The Gupta Lab Indels Identification Service.
      </p>
      <p v-else>
        {{homescreenText}}
      </p>
    </section>

    <QueryPage :show-details='false' />

    <ResultsPage :show-details='false' />
  </main>
</template>

<script lang='ts'>
import { ref, useFetch } from '@nuxtjs/composition-api'
import QueryPage from '~/pages/query.vue'
import ResultsPage from '~/pages/results/index.vue'
import { useAxios } from '@/scripts/useHooks'
import { HOMESCREEN_TEXT_KEY } from '@/scripts/ui'

export default {
  name: 'HomePage',
  components: { ResultsPage, QueryPage },
  layout: 'authenticated',
  setup() {
    const axios = useAxios()
    const homescreenText = ref('')

    async function fetchHomescreenText() {
      const res = await axios.$get(`/content/${HOMESCREEN_TEXT_KEY}`)
        .catch(() => '') ?? ''
      homescreenText.value = res.value
    }

    useFetch(fetchHomescreenText)
    return {
      homescreenText
    }
  }
}
</script>

<!--<style scoped>-->

<!--</style>-->
