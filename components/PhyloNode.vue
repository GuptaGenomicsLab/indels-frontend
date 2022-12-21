<template>
  <div class='node-container'>

      <div class='card-header' role='button'>
        <span>{{ node.taxonName }}</span> &nbsp;
        <span v-if='node.count > 0'>({{ node.count }})</span>
      </div>

    <TreeNode v-for='child of children' :key='child.taxonName' :tree='child' :clickable='false' />
  </div>
</template>

<script lang='ts'>
import { computed } from 'vue'

type Node = {
  taxonName: string;
  count: number;
  weight: number;
  children: Node[];
}
type TreeNodeProps = {
  depth: number;
  tree: Node;
  clickable: boolean;
}

export default {
  name: 'TreeNode',
  props: {
    depth: {
      type: Number,
      default: 0
    },
    tree: {
      type: Object,
      required: true
    },
    // todo: implement clickable event prevention in template
    clickable: {
      type: Boolean,
      default: true
    }
  },
  setup(props: TreeNodeProps) {
    const children = computed(
      () => Object.values(props.tree.children)
          .filter((child: Node) => child.count > 0 || Object.keys(child.children).length > 0)
        ?? []
    )

    const node = computed(() => ({
      taxonName: props.tree?.taxonName ?? 'Loading',
      count: props.tree?.count ?? 0,
      weight: props.tree?.weight ?? 0,
      children
    }))


    return {
      children,
      node,
    }
  }
}
</script>

<style scoped lang='scss'>
@import '~assets/scss/globals.scss';

.node-container {
  margin: .75rem 0 0 1.5rem;
}

.card-header {
  width: fit-content;
  padding: .25rem 1rem;
  font-family: Consolas, monospace;
  border: 1px solid $primary;
}

.card-header:hover {
  color: white;
  background-color: $primary;
}

.card-content {
  margin: 1% 0 0 10px;
  border: 1px solid #8f969d;
  border-radius: 2px;

  code {
    color: black;
  }
}
</style>
