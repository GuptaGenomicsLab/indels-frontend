<template>
    <main class='content-box'>
      <b-loading v-model='isLoading' :can-cancel='true' />
      <h1>Query Result: {{result.header}}</h1>
      <h2>CSIs Present For:</h2>
      <ul>
        <li v-for='identification of result.identified' :key='identification'>{{identification}}</li>
      </ul>
      <hr>
      <figure>
        <TreeNode v-if='result.tree !== null' :tree='result.tree'/>
      </figure>
    </main>
</template>

<script>
import { computed, reactive, ref, useFetch, useRoute } from '@nuxtjs/composition-api'
import { useAxios } from '@/scripts/useHooks'
import TreeNode from '@/components/TreeNode'

export default {
  name: 'ResultPage',
  components: { TreeNode },
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
        result.header = query.data.fileName.split('.').slice(0, -1).join(' ')
        result.identified = query.data.identified
        result.tree = JSON.parse(query.data.tree)
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

<style scoped lang='scss'>
h2 {
  font-size: 16px;
}

ul {
  list-style-type: disc;
  list-style-position: inside;
}
</style>
