<template lang="html">
  <div>
    <div id="braintreeWidget"></div>
    <div class="panel panel-default">
      <form action="/" method="post" id="cardForm" class="panel-body braintree-fields">
        <div class="row">
          <div class="form-group col-xs-12">
            <div id="card-number" class="hosted-field form-control form-control-sm"></div>
          </div>
        </div>
        <div class="row">
          <div class="form-group col-xs-6">
            <label class="control-label" for="card-expiry">Expiry</label>
            <div id="card-expiry" class="form-control form-control-sm hosted-field"></div>
          </div>
          <div class="form-group col-xs-6">
            <label class="control-label" for="card-security">Security Number</label>
            <div id="card-security" class="form-control form-control-sm hosted-field"></div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { Client } from 'braintree-web/client';
import { HostedFields } from 'braintree-web/hosted-fields';

import GfBrainTreeInitializer from './GfBrainTreeInitializer.vue';
import GfPaymentComponent from '../../common/GfPaymentComponent.vue';
import BrainTreePaymentRequestor from './BrainTreePaymentRequestor';

export default {
  components: { Client, HostedFields },
  mixins: [GfBrainTreeInitializer, GfPaymentComponent],
  name: 'GfBrainTreeCreditCard',
  props: {    
    tokenizationKey: {
      type: String,
      default: '',
      required: true
    },
    preFillData: {
      type: Object,
      default: () => {}
    }
  },
  data: function() {
    return {
      brainTreePaymentRequestor: new BrainTreePaymentRequestor(),
      hostedFieldInstance: ''
    }
  },
  mounted: function() {
    this.initialize("sandbox_p7f4kscm_h472r2723rfch9w7", this.preFillData, this.onPaymentMethodReceived, this.onPaymentError);
  },
  methods: {
    makeTransactionRequest: function() {
      this.brainTreePaymentRequestor.tokenizeRequest(this.hostedFieldInstance, this.onPaymentSuccessfulRequest, this.onPaymentError);
    },

    onPaymentSuccessfulRequest(payload) {
      this.onPaymentMethodReceived(payload.nonce, payload.details.cardType, payload.details.lastFour);
    }
  }
}
</script>

<style lang="css" scoped>

.hosted-field {
  height: 34px;
  box-sizing: border-box;
  width: 100%;
  padding: 6px;
  display: inline-block;
  box-shadow: none;
  font-weight: 600;
  font-size: 14px;
  border: 1px solid #dddddd;
  line-height: 20px;
  transition: all 300ms ease-in-out;
}

</style>
