<template>
  <main class='content-box-lg'>
    <header>
      <h1> User Database </h1>
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
  { field: 'active', label: 'Active' },
  { field: 'username', label: 'Username' },
  { field: 'fullName', label: 'Full Name' },
  { field: 'email', label: 'Email' },
  { field: 'position', label: 'Position' },
  { field: 'institution', label: 'Institution' },
  { field: 'role', label: 'Role' }
]

export default {
  name: 'UsersPage',
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
      const queries = await axios.$get('/users', {
        params: {
          skip: activePage.value * PAGE_ROWS - PAGE_ROWS,
          take: PAGE_ROWS,
          search: searchText.value
        }
      })
      rows.value = queries.map(qry => ({
        ...qry,
        active: qry.active ? '✅' : '❌',
        url: `/user/${qry.id}`
      }))

      matchingRows.value = await axios.$get('/users/count', {params: {search: searchText.value}});
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
