<script>
export default {
    name: 'GfPaymentInputHandler',
    data: function() {
        return {
            cardType: '',
            lastDigits: ''
        }
    },
    computed: {
        detailsTokenized: function() {
            return this.cardType !== '' && this.lastDigits !== '' && this.nonce !== ''
        }
    },
    methods: {
        _updatePaymentType: function(paymentType) {
            this.cardType = paymentType;
            this.processButton.setAttribute("data-payment-type", this.cardType);
        },
        onDetailsEntered: function(lastDigits) {
            this.lastDigits = lastDigits;
            this.processButton.setAttribute("data-last-digits", this.lastDigits);
        },
        updateNonce: function(nonce) {                        
            this.nonce = nonce;
            this.processButton.setAttribute("data-nonce", this.nonce);
        },
        _updateAdditionalData: function(additionalData) {
            var vm = this;
            Object.keys(additionalData).forEach(key =>
            {
                vm.processButton.setAttribute("data-" + key, additionalData[key]);
            });
        },
        updateInputData(paymentType, lastDigits, nonce, additionalData) {            
            this.onPaymentTypeChanged(paymentType);
            this.onDetailsEntered(lastDigits);
            this.updateNonce(nonce);
            
            if (additionalData && additionalData !== undefined)
                this._updateAdditionalData(additionalData);
        },
        clearInputData: function() {
            this.updateInputData('','','');
        }
    }
}
</script>