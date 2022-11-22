<template>
  <main>
    Hi!
  </main>
</template>

<script>
import {ref} from 'vue'
import {useAxios} from "@/scripts/useHooks";
import {LOGIN_TEXT_KEY} from "@/scripts/ui";

export default {
  name: 'RootPage',
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
  height: 100vh;
  background: linear-gradient($primary, $primary-lighter);
  color: $white;
  text-align: center;
  padding: 5% 10px;
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

* {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  width: 100vw;
}

nav {
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  width: 100%;
  height: 7vh;
  padding-right: 20px;
  background: linear-gradient($primary, $primary-darker);
  color: white;
}
.spacer {
  display: flex;
  flex-flow: column;
  height: 100%;
}

.branding {
  display: flex;
  flex-direction: row;
  flex-basis: content;
  align-items: center;

  .logo {
    height: 85%;
    margin: auto 10px;
    opacity: 0.9;
  }

  h2 {
    font-family: Montserrat, Arial, sans-serif;
    font-weight: lighter;
    margin: 0 10px 0 5px;

    @include respond-below(sm) {
      visibility: hidden;
      width: 0;
      margin: 0;
    }
  }
}

.links {
  display: flex;
  flex-direction: row;

  a {
    padding: 25px;
    font-size: 17px;
    text-decoration: none;
    color: inherit;
  }

  a:hover {
    background: linear-gradient($primary-lighter, $primary);
  }
}

.icons {
  flex-basis: content;
  display: flex;
  flex-direction: row;
  align-items: center;

  .avatar {
    padding: 0 20px;
    height: 5vh;
  }
}
</style>
