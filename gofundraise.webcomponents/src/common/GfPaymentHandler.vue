<script>
import axios from 'axios';

export default {
    name: 'GfPaymentHandler',
    data: function() {
        return {
            nonce: ''
        }
    },
    methods: {
        makePaymentRequest: function() {
            // currently not used
            axios.get('https://www.gofundraise.com.au')
                .then(function (response) {
                    console.log(response);
                });
        },

        onPaymentError: function(err) {
            console.log("got error: " + err);
        },

        _updatePaymentMethodData: function (nonce, paymentType, lastDigits, additionalData) {
            this.updateInputData(paymentType, lastDigits, nonce, additionalData);

            if (this.onTokenizeSuccess && this.onTokenizeSuccess !== '') {
                window[this.onTokenizeSuccess]();
            }         
        }
    }
}
</script>