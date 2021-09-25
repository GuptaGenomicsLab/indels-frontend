<template>
  <div id='global-container'>
    <Nuxt />
  </div>
</template>

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

//#global-container {
//  @include respond-above(lg) {
//    max-width: br(lg);
//    margin: auto;
//  }
//}
</style>
