<template>
  <main>
    <section class='content-box' v-html='homescreenText' />

    <section class='page-nav'>
      <NuxtLink to='/query'>
          <b-icon icon='database-search' size='is-large' />
          <span>Submit a Query</span>
      </NuxtLink>
      <NuxtLink to='/results'>
        <b-icon icon='table-large' size='is-large' />
        <span>View Past Results</span>
        <br>
        <span style='font-size: 8px'>Results will be available for at least 30 days.</span>
      </NuxtLink>
    </section>
  </main>
</template>

<script lang='ts'>
import { ref, useFetch } from '@nuxtjs/composition-api'
import { useAxios } from '@/scripts/useHooks'
import { HOMESCREEN_TEXT_KEY } from '@/scripts/ui'

export default {
  name: 'HomePage',
  layout: 'authenticated',
  setup() {
    const axios = useAxios()
    const homescreenText = ref('Loading...')

    async function fetchHomescreenText() {
      const res = await axios.$get(`/content/${HOMESCREEN_TEXT_KEY}`).catch(() => {})
      homescreenText.value = res.value
    }

    useFetch(fetchHomescreenText)
    return {
      homescreenText
    }
  }
}
</script>

<style scoped lang='scss'>
@import 'assets/scss/globals.scss';

a {
  background: transparent;
  border: 1px solid #C4C4C4;
  border-radius: 1rem;
  width: 45%;
  color: black;
  text-decoration: none;

  @include respond-below(md) {
    width: 100%;
  }

  height: 30rem;
  margin: 2% 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:hover {
    background: rgba(196, 196, 196, 0.1);
  }

  .icon {
    color: $primary;
  }
}
</style>
