<template lang="html">
  <div>
    <div ></div>
    <form action="/charge" method="post" id="payment-form">
      <div class="form-row">
        <label for="card-element">
          Credit or debit card
        </label>
        <div id="card-element">
          <!-- A Stripe Element will be inserted here. -->
        </div>

        <!-- Used to display form errors. -->
        <div id="card-errors" role="alert"></div>
      </div>

      <button>Submit Payment</button>
    </form>
  </div>
</template>

<script>
  // import {Client} from 'braintree-web/client';
  // import {HostedFields} from 'braintree-web/hosted-fields';

  import StripeInitializer from './StripeInitializer.vue';
  import GfPaymentComponent from '../../common/GfPaymentComponent.vue';
  import StripeRequestor from './StripeRequestor';
  // import { stripeKey, stripeOptions } from './stripeConfig.json'
  import { Card, createToken } from 'vue-stripe-elements-plus';
  import { CardNumber, CardExpiry, CardCvc } from 'vue-stripe-elements-plus';


  export default {
    // components: {Client, HostedFields},
    mixins: [StripeInitializer, GfPaymentComponent],
    name: 'StripeCreditCard',
    props: {
      tokenizationKey: {
        type: String,
        default: '',
        required: true
      },
      preFillData: {
        type: Object,
        default: () => {
        }
      }
    },
    data: function () {
      return {
        stripeRequestor: new StripeRequestor(),
        hostedFieldInstance: ''
      }
    },
    mounted: function () {
      this.initialize("sandbox_p7f4kscm_h472r2723rfch9w7", this.preFillData, this.onPaymentMethodReceived, this.onPaymentError);
      var stripe = Stripe('pk_test_g6do5S237ekq10r65BnxO6S0');

// Create an instance of Elements.
      var elements = stripe.elements();

// Custom styling can be passed to options when creating an Element.
// (Note that this demo uses a wider set of styles than the guide below.)
      var style = {
        base: {
          color: '#32325d',
          lineHeight: '18px',
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSmoothing: 'antialiased',
          fontSize: '16px',
          '::placeholder': {
            color: '#aab7c4'
          }
        },
        invalid: {
          color: '#fa755a',
          iconColor: '#fa755a'
        }
      };

// Create an instance of the card Element.
      var card = elements.create('card', {style: style});

// Add an instance of the card Element into the `card-element` <div>.
      card.mount('#card-element');
    },
    methods: {
      makeTransactionRequest: function () {
        this.stripeRequestor.tokenizeRequest(this.hostedFieldInstance, this.onPaymentSuccessfulRequest, this.onPaymentError);
      },

      onPaymentSuccessfulRequest(payload) {
        this.onPaymentMethodReceived(payload.nonce, payload.details.cardType, payload.details.lastFour);
      }
    }
  }
</script>

<style lang="css" scoped>

  .StripeElement {
    background-color: white;
    height: 40px;
    padding: 10px 12px;
    border-radius: 4px;
    border: 1px solid transparent;
    box-shadow: 0 1px 3px 0 #e6ebf1;
    -webkit-transition: box-shadow 150ms ease;
    transition: box-shadow 150ms ease;
  }

  .StripeElement--focus {
    box-shadow: 0 1px 3px 0 #cfd7df;
  }

  .StripeElement--invalid {
    border-color: #fa755a;
  }

  .StripeElement--webkit-autofill {
    background-color: #fefde5 !important;
  }

</style>
