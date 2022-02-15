<template>
  <main class='content-box' v-html='content'>

  </main>
</template>

<script>
import {useFetch} from "@nuxtjs/composition-api";
import {ref} from "@vue/composition-api";
import {useAxios} from "@/scripts/useHooks";
import {DISCLAIMER_TEXT_KEY} from "@/scripts/ui";

export default {
  name: 'SupportPage',
  layout: 'authenticated',
  setup() {
    const axios = useAxios();
    const content = ref('Loading...');

    useFetch(async () => {
      const response = await axios.get(`/content/${DISCLAIMER_TEXT_KEY}`).catch(() => {})
      content.value = response.data.value ?? '<p>Not Found.</p>';
    })

    return {content}
  }
}
</script>

<!--<style scoped>-->

<!--</style>-->
