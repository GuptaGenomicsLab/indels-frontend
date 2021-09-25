<template>
  <main>
    <section class='box-left'>
      A
    </section>
    <section class='box-right'>
      <h1>Welcome to GLIISCEN.</h1>

    </section>
  </main>
</template>

<script>
export default {
  name: 'HomePage',
  components: {}
}
</script>

<style scoped lang='scss'>
@import 'assets/scss/globals';

main {
  display: flex;
  flex: 1;
  flex-direction: row;
}

section.box-left {
  flex: 0.4;
  background-color: $white;
}

section.box-right {
  flex: 0.6;
  height: 100vh;
  background: linear-gradient($primary, $primary-lighter);
}
</style>
