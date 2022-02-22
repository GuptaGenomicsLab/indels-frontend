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
            <b-icon v-if='["ADMIN", "MANAGER"].includes($store.$auth.user.role)'  icon='cog-outline' size='sm' />
          </template>

          <b-dropdown-item custom>
            <NuxtLink to='/csi'>
              <b-icon icon='dna' size='md' />
              Manage CSIs
            </NuxtLink>
          </b-dropdown-item>
          <b-dropdown-item v-if='$store.$auth.user.role === "ADMIN"'>
            <NuxtLink to='/user'>
              <b-icon icon='account-box-multiple' size='md' />
              Manage Users
            </NuxtLink>
          </b-dropdown-item>
          <b-dropdown-item v-if='$store.$auth.user.role === "ADMIN"'>
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
          <b-dropdown-item>
            <NuxtLink to='/bulk-query'>
              <b-icon icon='stack-overflow' size='md' />
              Bulk Query
            </NuxtLink>
          </b-dropdown-item>
          <b-dropdown-item v-if='$store.$auth.user.role === "ADMIN"'>
            <NuxtLink to='/site-settings'>
              <b-icon icon='table' size='md' />
              Site Settings
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
    <div class='spacer' />
    <footer>
      <span class='footer-content'>
        © Gupta Lab {{new Date().getFullYear()}}
      </span>
      <div class='footer-links'>
        <NuxtLink to="/about">About</NuxtLink>
        <NuxtLink to="/support">Support</NuxtLink>
        <NuxtLink to="/extra/copyright">Copyright</NuxtLink>
        <NuxtLink to="/extra/disclaimer">Disclaimer</NuxtLink>
        <NuxtLink to="/extra/privacy">Privacy Policy</NuxtLink>
      </div>
      <span class='footer-logo'>
        McMaster University
        <img class='footer-logo-img' src='~/assets/img/logo-mcmaster.png' alt='McMaster Logo'/>
      </span>
    </footer>
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
  position: sticky;
  top: 0;
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

.spacer {
  display: flex;
  flex-flow: column;
  height: 100%;
}

footer {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  max-height: 2vh;
  padding: 2px 10px;
  //
  position: fixed;
  bottom: 0;
  @include respond-above(lg) {
    left: 22.5vw;
    width: 55vw;
  }
  @include respond-below(lg) {
    left: 1vw;
    width: 96vw;
  }
  @include respond-below(sm) {
    max-height: 4vh;
  }

  //
  background-color: #F5F5F5;
  font-family: 'Roboto', 'Segoe UI Light', sans-serif;
  font-size: 12px;

  a {
    margin: auto 5px;
  }

  .footer-links {
    @include respond-below(sm) {
      flex-direction: column;
    }
  }

  .footer-logo {
    display: flex;
    flex-direction: row;
    align-items: center;
    .footer-logo-img {
      height: 1.5vh;
      margin-left: 5px;
    }
  }
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
