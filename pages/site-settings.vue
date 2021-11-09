<template>
  <main class='content-box'>
    <h1>Settings</h1>
    <p>All fields use markdown syntax for more complex text features.</p>
    <section>
      <h2>Homescreen Text</h2>
      <b-input v-model='homescreenText' type='textarea' :maxlength='512' placeholder='Enter some text to display on the front page.' required/>
      <b-button label='Save' @click='setHomescreenText'/>
    </section>


  </main>
</template>

<script>
import { ref, useFetch } from '@nuxtjs/composition-api'
import { useAxios } from '@/scripts/useHooks'
import { HOMESCREEN_TEXT_KEY } from '@/scripts/ui'

export default {
  name: 'SiteSettingsPage',
  layout: 'authenticated',
  setup() {
    const axios = useAxios();
    const homescreenText = ref('');
    async function fetchHomescreenText() {
      const res = await axios.$get(`/content/${HOMESCREEN_TEXT_KEY}`)
        .catch(() => '') ?? '';
      homescreenText.value = res.value;
    }

    async function setHomescreenText() {
      await axios.$post(`/content/${HOMESCREEN_TEXT_KEY}`, { value: homescreenText.value });
    }

    useFetch(fetchHomescreenText)

    return {
      homescreenText,
      fetchHomescreenText,
      setHomescreenText
    }
  }
}
</script>
