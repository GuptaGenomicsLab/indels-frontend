<template>
  <main class='index-main'>
    <section class='box-left'>
      <LoginForm v-if='focusLogin' @switch='focusLogin = !focusLogin'/>
      <RegisterForm v-else @switch='focusLogin = !focusLogin'/>
    </section>
    <section class='box-right'>
      <div class='content-box index-content'  v-html='content'/>
    </section>
  </main>
</template>

<script>
import {ref} from 'vue'
import LoginForm from '@/components/LoginForm'
import RegisterForm from '@/components/RegisterForm'
import {useAxios} from "@/scripts/useHooks";
import {LOGIN_TEXT_KEY} from "@/scripts/ui";

export default {
  name: 'RootPage',
  components: {LoginForm, RegisterForm},
  setup() {
    const focusLogin = ref(true);
    const axios = useAxios();
    const content = ref('Loading...');

    useLazyFetch(async () => {
      const response = await axios.get(`/content/${LOGIN_TEXT_KEY}`).catch(() => {
      })
      content.value = response.data.value ?? '<p>Welcome to AppIndels.com!</p>';
    })

    return {
      content,
      focusLogin
    }
  }
}
</script>

<style lang='scss'>
@import 'assets/scss/globals';

main.index-main {
  display: flex;
  flex: 1;
  flex-direction: row;
  padding: 0;
  margin: 0;
  @include respond-below(md) {
    flex-direction: column;
  }
}

section.box-left {
  flex: 0.37;
  background-color: $white;
}

section.box-right {
  flex: 0.68;
  height: 93vh;
  background: linear-gradient($primary, $primary-lighter);
  text-align: center;
  padding: 2% 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#content-paragraph {
  width: 60%;
  margin: auto;
}

figure.sample-image {
  text-align: left;
  width: fit-content;
  padding: 5px 3% 2% 1%;
  margin: 3% 5%;
  border: #c3fdfd 2px solid;

  .card-header {
    color: $gray;
    border: 1px solid $primary;
    background-color: #e6f1ff;
  }

  figcaption {
    font-size: 18px;
    font-family: Roboto, Arial, sans-serif;
  }
}

.index-content {
  background: #D9EDF7;
  color: #4c4c64;
  border: 2px solid #98838F;
  max-height: 90%;
}
</style>
