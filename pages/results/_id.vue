<template>
    <main class='content-box'>
      <b-loading v-model='isLoading' :can-cancel='true' />
      <h1>Content</h1>
      <p>{{ JSON.stringify(result.tree) }}</p>
    </main>
</template>

<script>
import { computed, reactive, ref, useFetch, useRoute } from '@nuxtjs/composition-api'
import { useAxios } from '@/scripts/useHooks'

export default {
  name: 'ResultPage',
  layout: 'authenticated',
  setup() {
    const route = useRoute()
    const axios = useAxios()

    const id = computed(() => route.value.params.id)
    const result = reactive({
      header: 'Loading...',
      identified: [],
      tree: null
    })
    const isLoading = ref(false)

    const waitForCompletion = () => {
      return new Promise((resolve, reject) => {
        const url = `${axios.defaults.baseURL}/blast/query-progress/${id.value}`
        isLoading.value = true
        const event = new EventSource(url, { withCredentials: true })
        event.onmessage = (message) => {
          if (message.data.includes('Completed.')) {
            isLoading.value = false
            event.close()
            return resolve()
          }
        }
        event.onerror = reject
      })
    }

    const fetchData = async () => {
      const query = await axios.$get(`/blast/query/${id.value}`)
      const { status } = query
      if (status === 'ongoing') {
        await waitForCompletion()
        return fetchData()
      }
      if (status === 'completed-nr' || status === 'null') {
        result.header = 'Query has no result or failed to complete.'
      } else {
        result.header = query.data.fileName
        result.identified = query.data.identified
        result.tree = query.data.tree
      }
    }

    useFetch(fetchData)

    return {
      id,
      result,
      isLoading
    }
  }
}
</script>

<!--<style scoped>-->

<!--</style>-->
