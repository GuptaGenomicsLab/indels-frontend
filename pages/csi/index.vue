<template>
  <main class='content-box-lg'>
    <header>
      <h1> CSI Database </h1>
      <div class='control-box'>
        <NuxtLink to='/csi/create'>
          <b-button type='is-info' icon-left='chart-box-plus-outline'>Add CSI</b-button>
        </NuxtLink>
        <b-input v-model='searchText' icon='magnify' placeholder='Search Queries'/>
      </div>
    </header>
    <b-table
      :data='rows'
      :columns='columns'
      striped hoverable
      @click='handleClick'
    >
    </b-table>
    <b-pagination
      v-model='activePage'
      :total='matchingRows'
      :range-before='2'
      :range-after='2'
      order='is-centered'
    />
  </main>
</template>

<script>
import { ref, useFetch, useRouter, watch } from '@nuxtjs/composition-api'
import { useAxios } from '@/scripts/useHooks'

const columns = [
  { field: 'gi', label: 'GI' },
  { field: 'specificity', label: 'Specificity' },
  { field: 'parent', label: 'Parent' },
  { field: 'defaultParent', label: 'Default Parent' },
  { field: 'sequence', label: 'Sequence' },
  { field: 'type', label: 'Indel Type' },
  { field: 'proteinName', label: 'Protein' }
]

export default {
  name: 'CsisPage',
  layout: 'authenticated',
  setup() {
    const axios = useAxios()
    const router = useRouter();

    const PAGE_ROWS = 25
    const rows = ref([])
    const activePage = ref(1);
    const searchText = ref('');
    const matchingRows = ref(0);

    const fetchActiveData = async () => {
      const queries = await axios.$get('/csis', {
        params: {
          skip: activePage.value * PAGE_ROWS - PAGE_ROWS,
          take: PAGE_ROWS,
          search: searchText.value
        }
      })
      rows.value = queries.map(qry => ({
        ...qry,
        url: `/csi/${qry.id}`
      }))

      matchingRows.value = await axios.$get('/csis/count', {params: {search: searchText.value}});
    }

    const {fetch} = useFetch(fetchActiveData)
    watch(activePage, fetch)
    watch(searchText, fetch)

    const handleClick = (row) => {
      console.log(row, row.url);
      router.push({path: row.url})
    }

    return {
      PAGE_ROWS,
      columns,
      rows,
      activePage,
      searchText,
      matchingRows,
      handleClick,
      fetchActiveData
    }
  }
}
</script>

<style scoped lang='scss'>
main {
  h1 {
    margin-left: 5px;
  }

  header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

.control-box {
  display: flex;
  flex-direction: row;
  align-items: center;

  button {
    margin-right: 15px;
  }
}
</style>
