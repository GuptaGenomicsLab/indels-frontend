<template>
  <img :class='`logo size-${size}`' src='~/assets/img/dna-circular.png'  alt='Logo' @mouseenter='animateSquiggle'/>
</template>

<script lang='ts'>
import { animate } from 'motion'
import { Sizes } from '~/scripts/size.type'

type IconProps = {
  size: Sizes,
  animated?: boolean
};

export default {
  name: 'DnaIcon',
  props: {
    size: {
      type: String,
      default: 'md'
    },
    animated: {
      // note: animated is not reactive since destructuring props in setup({animated}) removes reactivity
      type: Boolean,
      default: false
    }
  },
  setup({animated}: IconProps) {
    let cnt = 1;
    const animateSquiggle = () => {
      if (!animated) return;
      animate(
        '.logo',
        {rotate: (180 * cnt++)},
        {duration: 0.5, easing: 'ease-in-out'}
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

