<template>
  <main>
    <section class='content-box'>
      <b-loading v-model='isLoading' :can-cancel='true' />
      <h1>Supported Taxa</h1>
      <p>
        The AppIndels server relies on a database of previously identified and thoroughly validated CSIs.
        As such, we can only identify CSIs within certain currently supported taxa.
        The taxa currently supported by the AppIndels server are listed below.
        For more details, please see the our <NuxtLink to='/about'>Scientific Background</NuxtLink> page.
      </p>
    <br>
      <p>
        Taxa that are bolded have 2 or more CSIs specific to them in the database.
        Non-bolded taxa (which are parents to bolded taxa) are shown to provide phylogenetic/structural information but do not have CSIs in the database.
      </p>
      <hr>
      <b-field>
        <b-input placeholder="Search Taxa"
                 type="search"
                 icon="magnify"
                 v-model="search"
        />
      </b-field>

      <ul>
        <li v-for='taxa of filtered()' :key='taxa'>
          {{ taxa }}
        </li>
      </ul>


      <hr>
      <b-collapse>
        <template #trigger="props">
          <b-button label="View Taxa Hierarchically" type="is-primary" />
          <figure>
            <PhyloNode v-if='result !== null' :tree='result' :clickable='false' />
          </figure>
        </template>
      </b-collapse>

    </section>
  </main>
</template>

<script>
import { ref } from 'vue';
import { useAxios } from '@/scripts/useHooks'
import PhyloNode from '@/components/PhyloNode'

export default {
  name: 'SupportedTaxa',
  components: {
    PhyloNode
  },
  setup() {
    const axios = useAxios();
    const isLoading = ref(true)
    const result = ref(null)
    const search = ref('');

    // fetch GET /supported-taxa
    async function fetchSupportedTaxa() {
      const data = await axios.$get('/csis/supported-taxa');
      result.value = data;
      isLoading.value = false;
    }

    useLazyFetch(fetchSupportedTaxa)

    const flatten = (node) => {
      const taxa = [node.taxonName];
      node.children.forEach(
        (child) => [...taxa, ...flatten(child)]
      )
      return taxa;
    }

    const filtered = () => {
      if (result.value === null) {
        return []
      }
      return flatten(result.value)
        .filter((taxa) => taxa.includes(search.value))
        .sort((a, b) => a.localeCompare(b));
    }

    return {
      isLoading,
      result,
      search,
      flatten,
      filtered
    }
  }
}
</script>

<!--<style scoped>-->

<!--</style>-->
