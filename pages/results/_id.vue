<template>
  <main class='content-box'>
    <article>
      <b-loading v-model='isLoading' :can-cancel='true' />
      <h1>Query Result: {{ result.header }}</h1>
      <NuxtLink v-if='["ADMIN", "MANAGER"].includes($store.$auth.user.role)' :to='`/results/raw/${id}`' style='float: right;'>
        <b-button label='View Raw Tree' type='is-primary is-light'/>
      </NuxtLink>
      <h2>CSIs Present For:</h2>
      <ul>
        <li v-for='identification of result.identified' :key='identification'>{{ identification }}</li>
      </ul>
      <p v-if='result.clinical'>Searched for Clinical CSIs only.</p>
      <hr>
      <figure>
        <TreeNode v-if='result.tree !== null' :tree='result.tree' />
      </figure>
    </article>
    <br><br>
    <b-collapse v-model='interpretingResultsDropdown' animation='slide'>
      <template #trigger>
        <b-button
          label='Interpreting Your Result'
          type='is-light'
          style='font-weight: bold; font-size: 1.25em; justify-content: left'
          expanded
          icon-left='help-circle'
          :icon-right='interpretingResultsDropdown ? "chevron-up" : "chevron-down"'
        />
      </template>
      <div class='interpreting-box'>
        <span v-html='interpretingResultsContent' />
      </div>
    </b-collapse>

    <footer class='content-box'>
      <b>CSI References:</b>
      <div class='reference-box'>
        <p v-for='reference in references' :key='reference'>{{ reference }}</p>
      </div>
      <b>General References:</b>
      <div class='reference-box'>
        <p v-for='reference in GENERAL_REFERENCES' :key='reference'>{{ reference }}</p>
      </div>
      <br>
      <b-button label='Copy References to Clipboard' expanded @click='copyReferences' />
    </footer>
  </main>
</template>

<script>
import { computed, reactive, ref } from 'vue'
import _ from 'lodash'
import { useAxios } from '@/scripts/useHooks'
import TreeNode from '@/components/TreeNode'
import { copiedToClipboard, INTERPRETATION_TEXT_KEY, INTERPRETATION_TEXT_KEY_NEGATIVE } from '@/scripts/ui'


const GENERAL_REFERENCES = [
  'Gupta, R. S., & Kanter-Eivin, D. A. (2023). AppIndels.com server: A web-based tool for the identification of known taxon-specific conserved signature indels in genome sequences. validation of its usefulness by predicting the taxonomic affiliation of &gt;700 unclassified strains of bacillus species. International Journal of Systematic and Evolutionary Microbiology, 73(5). https://doi.org/10.1099/ijsem.0.005844'
]

export default {
  name: 'ResultPage',
  components: { TreeNode },
  layout: 'authenticated',
  setup() {
    const route = useRoute()
    const axios = useAxios()
    const id = computed(() => route.params.id)
    const result = reactive({
      header: 'Loading...',
      identified: [],
      tree: null,
      clinical: false
    })
    const isLoading = ref(false)
    const interpretingResultsDropdown = ref(true);

    const waitForCompletion = () => {
      return new Promise((resolve) => {
        const url = `${axios.defaults.baseURL}/blast/query-progress/${id.value}`
        isLoading.value = true
        const event = new EventSource(url, { withCredentials: true })
        event.onmessage = (message) => {
          result.header = 'Query is in progress. Please wait.'
          if (message.data.includes('Completed.')) {
            isLoading.value = false
            event.close()
            return resolve()
          }
        }
        event.onerror = resolve
      })
    }

    const fetchData = async (force = false) => {
      const query = await axios.$get(`/blast/query/${id.value}`)
      const { status } = query
      if (status === 'queued')
        result.header = 'Query is waiting to begin (queued).'

      if (!force && (status === 'queued' || status === 'ongoing')) {
        await waitForCompletion()
        return fetchData(true)
      } else if (!force && (status === 'completed-nr' || status === 'null')) {
        result.header = 'Query has no result or failed to complete.'
      } else {
        result.header = query.data.fileName.split('.').slice(0, -1).join(' ')
        result.identified = query.data.identified
        result.tree = JSON.parse(query.data.tree)
        result.clinical = query.data.clinical
      }
    }

    useLazyFetch(fetchData)

    const getReferences = (tree) => {
      const hits = tree.specificHits.map(hit => hit.csi.reference)
      for (const child of Object.values(tree.children)) {
        hits.push(getReferences(child))
      }
      return _.uniqBy(hits.flat(), s => s.slice(0, 32))
    }

    const references = computed(() => result.tree === null ? [] : getReferences(result.tree))

    const copyReferences = () => {
      const refs = [...getReferences(result.tree), ...GENERAL_REFERENCES]
      navigator.clipboard.writeText(refs.join('\n'))
      copiedToClipboard()
    }

    const interpretingResultsContent = ref('Loading...');
    useLazyFetch(async () => {
      const key = result.identified.includes('None') ? INTERPRETATION_TEXT_KEY_NEGATIVE : INTERPRETATION_TEXT_KEY;
      const response = await axios.get(`/content/${key}`).catch(() => {})
      interpretingResultsContent.value = response.data.value ?? '<p>Not Found. Please contact the site administrator (kantered@mcmaster.ca) if this is an error.</p>';
    })

    return {
      id,
      result,
      isLoading,
      interpretingResultsDropdown,
      interpretingResultsContent,
      references,
      copyReferences,
      GENERAL_REFERENCES
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

footer {
  width: 100%;
  background-color: #F7F7F7;
}

.reference-box {
  font-family: Consolas, 'Liberation Mono', Menlo, Courier, monospace;
  background-color: #e9e9e9;
  padding: 5px;
  white-space: nowrap;
  overflow-x: scroll;
}

.interpreting-box {
  border: 1px solid lightgray;
  padding: 1rem;
}
</style>
