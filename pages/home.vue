<template>
  <main>
    <section class='content-box'>
      <h1>Welcome to GLIISCEN</h1>
      <p>
        The Gupta Lab Indels Identification Service provides free access to the BLAST CSIs Identification Tool,
        which allows for easy identification of a given genome through the use of CSIs (conserved signature indels).
        To submit a new identification query, simply upload it below, or navigate to "Query" to make a detailed query.
      </p>
    </section>

    <QueryPage :show-details='false' />

    <ResultsPage :show-details='false' />
  </main>
</template>

<script lang='ts'>
import QueryPage from '~/pages/query.vue'
import ResultsPage from '~/pages/results/index.vue'
export default {
  name: 'HomePage',
  components: { ResultsPage, QueryPage },
  layout: 'authenticated'
}
</script>

<!--<style scoped>-->

<!--</style>-->
