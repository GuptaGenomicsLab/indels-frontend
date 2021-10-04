<template>
  <main>
    <section class='box-left'>
      <LoginForm />
    </section>
    <section class='box-right'>
      <h1>Identify genomes using conserved signature indels.</h1>
    </section>
  </main>
</template>

<script>
import LoginForm from '@/components/LoginForm'
export default {
  name: 'RootPage',
  components: { LoginForm },
  setup() {

  }
}
</script>

<style scoped lang='scss'>
@import 'assets/scss/globals';

main {
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
}

#content-paragraph {
  width: 60%;
  margin: auto;
}
</style>
