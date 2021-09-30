<template>
  <div id='global-container'>
    <nav class='navbar'>
      <div class='branding'>
        <DnaIcon size='none' animated />
        <h2>gliiscen</h2>
      </div>
      <div class='links'>
        <NuxtLink to='/home'>Home</NuxtLink>
        <NuxtLink to='/query'>Query</NuxtLink>
        <NuxtLink to='/results'>Results</NuxtLink>
        <NuxtLink to='/support'>Support</NuxtLink>
      </div>
      <div class='icons'>
        <b-icon icon='bell-outline' size='sm' />
        <img class='avatar' :src='avatarUrl' @click='activeDropdown = "account"'/>
        <div class='dropdown-container'>
          <div v-if='activeDropdown === "account"' id='account-dropdown' class='dropdown'>
            <NuxtLink to='/settings'>
              <b-icon icon='cog-outline' size='sm' />
              Account Settings
            </NuxtLink>
            <NuxtLink to='/logout'>
              <b-icon icon='logout' size='sm' />
              Logout
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>
    <Nuxt />
  </div>
</template>

<script>
import { ref } from '@nuxtjs/composition-api'
import DnaIcon from '@/components/DnaIcon'

export default {
  components: { DnaIcon },
  setup() {
    const activeDropdown = ref('s')

    return {
      activeDropdown
    }
  },
  computed: {
    avatarUrl() {
      const properties = {
        name: this.$auth.user.username,
        length: 1,
        background: '03B6FF',
        isRounded: true,
        caps: 1
      }
      return `https://avatar.oxro.io/avatar.svg?${new URLSearchParams(properties)}`
    }
  }
}
</script>

<style scoped lang='scss'>
@import 'assets/scss/globals';

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
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  overflow: hidden;
  width: 100%;
  height: 7vh;
  padding-right: 20px;
  background: linear-gradient($primary, $primary-darker);
  color: white;
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
  align-items: center;

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
    padding: 0 15px;
    height: 60%;
  }
}

.dropdown-container {
  position: relative;
  display: inline-block;
}

.dropdown {
  display: block;
  position: absolute;
  background-color: #f1f1f1;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  z-index: 1;
  margin-left: -100px;
  overflow: visible;
}
</style>
