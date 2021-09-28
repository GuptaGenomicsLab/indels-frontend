<template>
  <div id='global-container'>
    <nav>
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
        <b-icon icon='cog-outline' size='sm' />
        <img class='avatar' :src='avatarUrl' />
      </div>
    </nav>
    <Nuxt />
  </div>
</template>

<script>
import DnaIcon from '@/components/DnaIcon'

export default {
  components: { DnaIcon },
  computed: {
    avatarUrl() {
      const properties = {
        name: this.$auth.user.username,
        length: 1,
        background: '0cb8fd',
        isRounded: true,
        caps: 1
      };
      return `https://avatar.oxro.io/avatar.svg?${new URLSearchParams(properties)}`;
    }
  }
}
</script>

<style lang='scss'>
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
    @include respond-below(sm) {
      visibility: hidden;
    }

    font-family: Montserrat, Arial, sans-serif;
    font-weight: lighter;
    margin: 0 10px 0 5px;
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
</style>
