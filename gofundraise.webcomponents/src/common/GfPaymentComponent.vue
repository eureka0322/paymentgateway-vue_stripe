<script>
import GfPaymentInputHandler from './GfPaymentInputHandler.vue';
import GfPaymentHandler from './GfPaymentHandler.vue';

export default {
    name: 'GfPaymentComponent',
    mixins: [GfPaymentInputHandler, GfPaymentHandler],
    data: function() {
        return {
            processButton: ''
        }
    },
    props: {
        /**
         * The id of the button that will be used to trigger the payment
         */
        processButtonId: {
            type: String,
            default: '',
            required: true
        },

        /**
         * The function that will be called once the widget is ready.
         */
        onReady: {
            type: String,
            default: ''
        },

        /**
         * The function that will be called once the user input is tokenized.
         */
        onTokenizeSuccess: {
            type: String,
            default: ''
        },

        /**
         * The function that will be called if there was an error with the tokenization..
         */
        onTokenizeError: {
            type: String,
            default: ''
        },

        /**
         * You can add any additional properties that needs to be passed to the widgets.
         * The additional properties will be passed to the widgets through the `additional-properties` attributes
         */
        additionalProperties: {
            type: Object,
            default: function() { return {}; }
        }
    },
    mounted: function() {
        var vm = this;
        vm.processButton = document.getElementById(vm.processButtonId);

        if (vm.processButton !== null && vm.processButton !== '') {
            vm.processButton.addEventListener('click', function(e) {
                if (vm.onTokenizeError !== '' && !vm.detailsTokenized) {
                    window[vm.onTokenizeError]();
                    return;
                }

                if (vm.onTokenizeSuccess !== '' && vm.detailsTokenized) {
                    window[vm.onTokenizeSuccess]();
                }
            });
        }
        
        if (vm.onReady !== '' && vm.onReady) {
            window[vm.onReady]();
        }
    },
    methods: {
        /**
         * Call this method once you get successful details from the user input.
         * 
         * **nonce** - The nonce or token recieved from the payment service
         *
         * **paymentType** - The type of payment. E.g. visa, mastercard, amex, paypal etc
         * 
         * **lastDigits** - Meta data about the tokenised details. This could be the last x digits of the card or email address of account holder
         * 
         * **additionalData** - optional parameter that allows you to pass in any additional data from your component. The additional data will be 
         * emitted through the `data-propertyname` attribute. The object should be in the form of a key-value-pair object. e.g. `{prop1: 'test', prop2: 'test2'}`
         * 
         * @param {string} nonce
         * @param {string} paymentType
         * @param {string} lastDigits
         * @param {object} [additionalData]
         * @return {undefined}
         * @public
         */
        onPaymentMethodReceived: function (nonce, paymentType, lastDigits, additionalData) {
            this._updatePaymentMethodData(nonce, paymentType, lastDigits, additionalData);      
        },

        /**
         * Call this method to update the payment type once it becomes available.
         * 
         * **paymentType** - The type of payment. E.g. visa, mastercard, amex, paypal etc
         * 
         * @param {string} paymentType
         * @return {undefined}
         * @public
         */
        onPaymentTypeChanged: function(paymentType) {
            this._updatePaymentType(paymentType);
        },
    }
}
</script>