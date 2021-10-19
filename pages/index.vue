<template>
  <main class='index-main'>
    <section class='box-left'>
      <LoginForm />
    </section>
    <section class='box-right'>
      <h1>Identify genomes using conserved signature indels.</h1>
      <figure class='sample-image'>
        <figcaption>
          {{name}}
        </figcaption>
        <TreeNode :tree='tree' :clickable='false' />
      </figure>
    </section>
  </main>
</template>

<script>
import TreeNode from '@/components/TreeNode'
import LoginForm from '@/components/LoginForm'

const sampleQueries = [
  {name: 'Enterobacter Soli', fileName: 'EnterobacterSoli'}
]

export default {
  name: 'RootPage',
  components: { TreeNode, LoginForm },
  setup() {
    const random = sampleQueries[Math.floor(Math.random() * sampleQueries.length)]
    const tree = require(`static/queries/${random.fileName}.json`)

    return {
      name: random.name,
      tree
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
</style>
