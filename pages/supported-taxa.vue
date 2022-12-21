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

      <hr>
      <figure>
        <PhyloNode v-if='result !== null' :tree='result' :clickable='false' />
      </figure>

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

    // fetch GET /supported-taxa
    async function fetchSupportedTaxa() {
      const data = await axios.$get('/csis/supported-taxa');
      result.value = data;
      isLoading.value = false;
    }

    useLazyFetch(fetchSupportedTaxa)

    return {
      isLoading,
      result
    }
  }
}
</script>

<!--<style scoped>-->

<!--</style>-->
