<template>
  <main :class='showDetails ? "content-box-lg" : "content-box"'>
    <header>
      <h1> {{showDetails ? 'Your Queries' : 'Recent Queries'}} </h1>
      <b-input v-model='searchText' icon='magnify' placeholder='Search Queries'/>
    </header>
    <b-table
      :data='rows'
      :columns='columns'
      striped hoverable
      @click='handleClick'
    >
    </b-table>
    <b-pagination
      v-if='showDetails'
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

export default {
  name: 'ResultsPage',
  layout: 'authenticated',
  props: {
    showDetails: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const axios = useAxios()
    const router = useRouter();

    const PAGE_ROWS = props.showDetails ? 25 : 10
    const rows = ref([])
    const activePage = ref(1);
    const searchText = ref('');
    const matchingRows = ref(0);

    const columns = [
      { field: 'fileName', label: 'File Name' },
      { field: 'result', label: 'Result' },
      { field: 'description', label: 'Description' },
      { field: 'createdAt', label: 'Started' },
    ]

    if (props.showDetails) {
      columns.push({ field: 'updatedAt', label: 'Last Updated' })
    }

    const fetchActiveData = async () => {
      const queries = await axios.$get('/blast/queries', {
        params: {
          skip: activePage.value * PAGE_ROWS - PAGE_ROWS,
          take: PAGE_ROWS,
          search: searchText.value
        }
      })
      rows.value = queries.map(qry => ({
        ...qry,
        result: qry.identified.join(',') || 'None',
        url: `/results/${qry.id}`
      }))

      matchingRows.value = await axios.$get('/blast/count', {params: {search: searchText.value}});
    }

    const {fetch} = useFetch(fetchActiveData)
    watch(activePage, fetch)
    watch(searchText, fetch)

    const handleClick = (row) => {
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
</style>
