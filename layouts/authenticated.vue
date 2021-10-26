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
        <b-dropdown close-on-click append-to-body position='is-bottom-left'>
          <template #trigger>
            <b-icon v-if='$store.$auth.user.role === "ADMIN"'  icon='cog-outline' size='sm' />
          </template>

          <b-dropdown-item custom>
            <NuxtLink to='/csi'>
              <b-icon icon='dna' size='md' />
              Manage CSIs
            </NuxtLink>
          </b-dropdown-item>
          <b-dropdown-item>
            <NuxtLink to='/user'>
              <b-icon icon='account-box-multiple' size='md' />
              Manage Users
            </NuxtLink>
          </b-dropdown-item>
          <b-dropdown-item>
            <NuxtLink to='/import'>
              <b-icon icon='database' size='md' />
              Bulk Edit CSIs
            </NuxtLink>
          </b-dropdown-item>
          <b-dropdown-item>
            <NuxtLink to='/results/all'>
              <b-icon icon='table' size='md' />
              View All Queries
            </NuxtLink>
          </b-dropdown-item>
        </b-dropdown>

        <b-dropdown close-on-click append-to-body position='is-bottom-left'>
          <template #trigger>
            <img class='avatar' :src='avatarUrl'/>
          </template>

<!--          <b-dropdown-item custom>-->
<!--            <NuxtLink to='/preferences'>-->
<!--              <b-icon icon='tune-variant' size='sm' />-->
<!--              Account Settings-->
<!--            </NuxtLink>-->
<!--          </b-dropdown-item>-->
          <b-dropdown-item custom>
            <a @click='logout'>
              <b-icon icon='logout' size='sm' />
              Logout
            </a>
          </b-dropdown-item>
        </b-dropdown>
      </div>
    </nav>
    <Nuxt />
  </div>
</template>

<script>
import DnaIcon from '@/components/DnaIcon'

export default {
  components: { DnaIcon },
  middleware: 'auth',
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
  },
  methods: {
    logout() {
      this.$auth.logout();
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
    padding: 0 20px;
    height: 5vh;
  }
}

.dropdown-container {
  position: relative;
  display: inline-block;
}

</style>
