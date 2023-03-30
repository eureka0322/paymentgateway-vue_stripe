This is the interface, or main mixin module that needs to be included to include to your vue payment gateway widget.

First create a new component and include the mixin. E.g.

```jsx static
<template lang="html">
  <div>
    <div id="paydockWidget"></div>
  </div>
</template>

<script>
import GfPaymentComponent from '../../common/GfPaymentComponent.vue';

export default {
  components: { HtmlWidget },
  mixins: [GfPaymentComponent],
  name: 'GfPaydock',
  props: {
    gatewayId: {
      type: String,
      default: '',
      required: true
    }
  }
}
</script>

<style lang="css" scoped>
</style>
```