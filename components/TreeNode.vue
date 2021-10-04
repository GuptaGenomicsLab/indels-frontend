<template>
  <div class='node-container'>
    <b-collapse class='card' animation='slide'>
      <template #trigger='props'>
        <div class='card-header' role='button'>
          <span>{{node.taxonName}}</span> &nbsp;
          <span v-if='node.specificHits.value.length > 0'>({{node.specificHits.value.length}})</span>
          <b-icon v-if='node.specificHits.value.length > 0' :icon="props.open ? 'menu-up' : 'menu-down'" />
        </div>
      </template>

      <div class='card-container'>
        <div v-for='hit of node.specificHits.value' :key='hit.subject' class='card'>
          <b>
            {{ hit.indelInfo.size }} aa insert
            <span v-if='hit.csi.proteinName.length > 0'>in {{ hit.csi.proteinName }}</span>
          </b>
          <br>
          Query: <code>{{ hit.query }}</code>
          <br>
          Subject: <code>{{ hit.subject }}</code>
          <br>
          <!-- todo: switch to dynamic reference -->
          <i>Reference:</i> <span>Gupta RS et al (2013)</span>
        </div>
      </div>
    </b-collapse>
    <TreeNode v-for='child of children' :key='child.taxonName' :tree='child' :clickable='false'/>
  </div>
</template>

<script lang='ts'>
import { computed, ref } from '@nuxtjs/composition-api'
import { Indel } from '~/scripts/indel.type'

type Node = {
  taxonName: string;
  specificHits: Indel[];
  children: Node;
}
type TreeNodeProps = {
  depth: number;
  node: Node;
  clickable: boolean;
}

export default {
  name: 'TreeNode',
  props: {
    depth: Number,
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

    const node = computed((): Node => ({
      taxonName: props.tree?.taxonName ?? 'Loading',
      specificHits: availableCsis,
      children
    }))

    const open = props.clickable ? ref(false) : false

    return {
      children,
      node,
      open
    }
  }
}
</script>

<style scoped lang='scss'>
.node-container {
  margin-left: 10px;
}
</style>
