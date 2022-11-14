<template>
  <main class='content-box' v-html='content'>

  </main>
</template>

<script>
import {ref} from "vue";
import {useAxios} from "@/scripts/useHooks";
import {SUPPORT_TEXT_KEY} from "@/scripts/ui";

export default {
  name: 'SupportPage',
  layout: 'authenticated',
  setup() {
    const axios = useAxios();
    const content = ref('Loading...');

    useLazyFetch(async () => {
        const response = await axios.get(`/content/${SUPPORT_TEXT_KEY}`).catch(() => {})
        content.value = response.data.value ?? '<p>Not Found. Please contact the site administrator (kantered@mcmaster.ca) if this is an error.</p>';
    })

    return {content}
  }
}
</script>

<!--<style scoped>-->

<!--</style>-->
