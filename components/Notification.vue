<template>
  <div v-if='active' :class='`notification ${type}`'>
    <p>{{renderMessage}}</p>
  </div>
</template>

<script lang='ts'>
import { animate } from 'motion'

type NotificationType = 'none' | 'info' | 'warning' | 'positive';
interface NotificationProps {
  type: NotificationType,
  message: string
}

export default {
  name: 'Notification',
  props: {
    type: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    }
  },
  setup(props: NotificationProps) {
    const active = () => props.message.length > 0;
    let renderMessage;
    const expand = () => {
      renderMessage = props.message;
      animate('.notification', {maxHeight: '50px'}, {duration: 0.25})
    };

    return {
      expand,
      active,
      renderMessage
    }
  }
}
</script>

<style scoped lang='scss'>
.notification {
  max-height: 0;
  width: auto;
}
</style>
