<template>
  <img :class='`logo size-${size}`' src='~/assets/img/dna-circular.png'  alt='Logo' @mouseenter='animateSquiggle'/>
</template>

<script lang='ts'>
import { animate } from 'motion'
import { Sizes } from '~/scripts/size.type'

type IconProps = {
  size: Sizes,
  squiggle?: boolean
};

export default {
  name: 'DnaIcon',
  props: {
    size: {
      type: String,
      default: 'md'
    },
    squiggle: {
      type: Boolean,
      default: false
    }
  },
  setup({squiggle}: IconProps) {
    const animateSquiggle = () => {
      if (!squiggle) return;
      animate(
        '.logo',
        {rotate: 15},
        {duration: 0.1, easing: 'ease-in-out', repeat: 3, direction: 'alternate'}
      )
    }

    return {
      animateSquiggle
    }
  }
}
</script>

<style scoped lang='scss'>
.size-sm {
  width: 1%;
}

.size-md {
  width: 20%;
}

.size-lg {
  width: 30%;
}

//.logo {
//  margin: auto;
//}
</style>
