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
      <p>
        See the below searchable list of taxa for which CSIs are present in our database.
        Alternatively, scroll down to browse hierarchically.
      </p>
    <br>
      <hr>
      <b-field>
        <b-input placeholder="Search Taxa"
                 type="search"
                 icon="magnify"
                 v-model="search"
        />
      </b-field>

      <ul v-if='search.length >= 3 || filtered.length <= 5'>
        <li v-for='taxa of filtered' :key='taxa'>
          {{ taxa }}
        </li>
      </ul>


      <hr>
      <b-collapse :open='open'>
        <template #trigger="props">
          <b-button label="View Taxa Hierarchically" type="is-primary" />
        </template>
        <p>
          Taxa that are bolded have 2 or more CSIs specific to them in the database.
          Non-bolded taxa (which are parents to bolded taxa) are shown to provide phylogenetic/structural information but do not have CSIs in the database.
        </p>
        <figure>
          <PhyloNode v-if='result !== null' :tree='result' :clickable='false' />
        </figure>
      </b-collapse>

    </section>
  </main>
</template>

<script>
import {computed, ref} from 'vue';
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
    const flatResult = ref(null);
    const search = ref('');
    const open = ref(false);

    // fetch GET /supported-taxa
    async function fetchSupportedTaxa() {
      const data = await axios.$get('/csis/supported-taxa');
      result.value = data;

      const flatData = await axios.$get('/csis/supported-taxa-linear');
      flatResult.value = flatData;
      isLoading.value = false;
    }

    useLazyFetch(fetchSupportedTaxa)

    const filtered = computed(() => flatResult.value === null ? [] : flatResult.value.filter(taxa => taxa.toLowerCase().includes(search.value.toLowerCase())))

    return {
      isLoading,
      result,
      search,
      flatResult,
      filtered,
      open
    }
  }
}
</script>

<!--<style scoped>-->

<!--</style>-->
