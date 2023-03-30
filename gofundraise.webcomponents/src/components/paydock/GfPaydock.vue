<template lang="html">
  <div>    
    <div id="paydockWidget"></div>
  </div>
</template>

<script>
import { HtmlWidget } from '@paydock/client-sdk/lib/widget';
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
  },
  created: function() {
    let widget = new HtmlWidget('#paydockWidget', '945fdaf9c410cd16a036521da4b46f75fb7f6f5b', '58bcedf43c541b5b87f73935,593882d1ff6c291b9e74aecb'); 
    widget.load();
  }
}
</script>

<style lang="css" scoped>
</style>
