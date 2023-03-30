<template lang="html">
  <div id="gf-payments-gateway">
    <div v-if="type === 'paydock'">
      <GfPaydock :additional-properties="additionalProperties" gatewayId="123" tokenizationKey="sometokenizationKey" :process-button-id="processButtonId" :on-tokenize-success="onTokenizeSuccess" :on-ready="onReady"></GfPaydock>
    </div>
    <div v-if="type === 'braintree-credit-card'">
      <GfBrainTreeCreditCard :additional-properties="additionalProperties" tokenizationKey="some-braintree-key" :process-button-id="processButtonId" :on-tokenize-success="onTokenizeSuccess" :on-ready="onReady"></GfBrainTreeCreditCard>
    </div>
    <div v-if="type === 'stripe-credit-card'">
      <StripeCreditCard tokenizationKey="some-braintree-key" :process-button-id="processButtonId" :on-tokenize-success="onTokenizeSuccess" :on-ready="onReady"></StripeCreditCard>
    </div>
  </div>
</template>

<script>
import GfPaydock from './components/paydock/GfPaydock.vue';
import GfBrainTreeCreditCard from './components/braintree-creditcard/GfBrainTreeCreditCard.vue';
import StripeCreditCard from './components/stripe-creditcard/StripeCreditCard.vue';
export default {
  name: 'GfPayments',
  components: { GfPaydock, GfBrainTreeCreditCard, StripeCreditCard },
  props: {
    type: {
      type: String,
      default: 'paydock'
    },
    processButtonId: {
      type: String,
      default: '',
      required: true
    },
    onTokenizeSuccess: {
      type: String,
      default: ''
    },
    onReady: {
      type: String,
      default: ''
    },
    additionalProperties: {
      type: Object,
      default: function() { return {}; }
    }
  }
}
</script>

<style lang="css" scoped>
</style>
