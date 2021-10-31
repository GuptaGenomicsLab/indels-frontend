<template>
  <div class='node-container'>
    <b-collapse animation='fade' :open='false'>
      <template #trigger='props'>
        <div class='card-header' role='button'>
          <span>{{ node.taxonName }}</span> &nbsp;
          <span v-if='node.specificHits.value.length > 0'>({{ node.specificHits.value.length }})</span>
          <b-icon v-if='node.specificHits.value.length > 0' :icon="props.open ? 'menu-up' : 'menu-down'" />
        </div>
      </template>

      <div class='card-container'>
        <div v-for='hit of node.specificHits.value' :key='hit.subject' class='card-content'>
          <NuxtLink :to='`/csi/${hit.csi.id}`'>
            {{ hit.indelInfo.size }} aa insert
            <span v-if='hit.csi.proteinName.length > 0'>in {{ hit.csi.proteinName }}</span>
          </NuxtLink>
          <br><br>
          Query: <code>{{ hit.query }}</code>
          <br>
          Subject: <code>{{ hit.subject }}</code>
          <br><br>
          <i>Reference:</i> {{shortReference(hit.csi.reference)}}
        </div>
      </div>
    </b-collapse>
    <TreeNode v-for='child of children' :key='child.taxonName' :tree='child' :clickable='false' />
  </div>
</template>

<script lang='ts'>
import { computed, ref } from '@nuxtjs/composition-api'
import { Indel } from '~/scripts/indel.type'

type Node = {
  taxonName: string;
  specificHits: Indel[];
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
          .filter((child: Node) => child.specificHits.length > 0 || Object.keys(child.children).length > 0)
        ?? []
    )

    const availableCsis = computed(() => props.tree.specificHits.filter(hit => hit !== null) ?? [])

    const node = computed(() => ({
      taxonName: props.tree?.taxonName ?? 'Loading',
      specificHits: availableCsis,
      children
    }))

    const open = props.clickable ? ref(false) : false

    const shortReference = (full: string): string => {
      const segments = full.match(/.+\(\d{4}\)/g);
      if (segments === null || segments.length < 1)
        return full.slice(0, 32);
      return segments[0];
    }

    return {
      children,
      node,
      open,
      shortReference
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
