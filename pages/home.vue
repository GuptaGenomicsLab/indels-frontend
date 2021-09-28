<template>
  <div>
    <h1>Logged in: {{info.in ? 'Yes' : 'No'}}</h1>
    <p>{{info.usr + '   ' + info.mail}}</p>
    <button @click='logout'>Logout</button>
  </div>
</template>

<script lang='ts'>
export default {
  name: 'HomePage',
  computed: {
    info(): any {
      return {
        in: this.$auth.loggedIn,
        usr: this.$auth.user?.username,
        mail: this.$auth.user?.email
      }
    }
  },
  methods: {
    logout() {
      this.$auth.logout();
    }
  }
}
</script>

<!--<style scoped>-->

<!--</style>-->
