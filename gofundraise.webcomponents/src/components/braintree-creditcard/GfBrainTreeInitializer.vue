<script>
export default {
    name: 'GfBrainTreeInitializer',
    data: function() {
        return {
            hostedFieldInstance: ''
        };
    },
    methods: {
        initialize: function(tokenizationKey, preFillData) {
            this.createBrainTreeClient(tokenizationKey, preFillData);
        },

        createBrainTreeClient: function(clientToken, preFillData, paymentMethodReceivedCallback, paymentErrorCallback) {
            var vm = this;
            const client = require('braintree-web/client');
            var authorization = clientToken;

            client.create({
                authorization: authorization,
                options: vm.getOptions(paymentMethodReceivedCallback, paymentErrorCallback)
            }, function (err, clientInstance) {
                if (err) {
                    console.log("got some error in creating client");
                    return;
                }
                vm.createBrainTreeHostedFields(clientInstance, preFillData);
            });
        },

        getOptions: function(paymentMethodReceivedCallback, paymentErrorCallback) {
            return {
                onPaymentMethodReceived: paymentMethodReceivedCallback,
                onError: paymentErrorCallback
            };
        },

        createBrainTreeHostedFields: function (clientInstance, preFillData) {
            var vm = this;
            var fields = this.initFields(preFillData);
            var styles = this.initStyles;

            const hostedFields = require('braintree-web/hosted-fields');
            hostedFields.create({
                client: clientInstance,
                styles: styles,
                fields: fields
            }, (err, hostedFieldInstance) => {
                if (err) {
                    console.log("hosting fields error: " + err);
                    return;
                }

                vm.$data.hostedFieldInstance = hostedFieldInstance;
                vm.$emit('hostedFieldsReady', hostedFieldInstance);

                hostedFieldInstance.on('cardTypeChange', function (data) {
                    vm.onBrainTreeCardTypeChangeEvent(data);
                });
                hostedFieldInstance.on('validityChange', function (data) {
                    vm.onBrainTreeCardValidityChangeEvent(data);
                });

                vm.onBrainTreeCardTypeChangeEvent(hostedFieldInstance.getState());
                vm.onBrainTreeCardValidityChangeEvent(hostedFieldInstance.getState());                
            });
        },

        onBrainTreeCardTypeChangeEvent: function(data) {
            this.clearInputData();
            this.onPaymentTypeChanged(this.getCardTypeFromPayload(data));
        },

        getCardTypeFromPayload: function(data) {
            var cardType = '';
            if (data.cards && data.cards.length === 1)
                cardType = data.cards[0].niceType;
            return cardType;
        },

        onBrainTreeCardValidityChangeEvent: function(data) {
            var vm = this;
            vm.clearInputData();
            var isAllDetailsValid = true;
            
            for (var field in data.fields) {                
                if (!data['fields'][field].isValid) {
                    isAllDetailsValid = false;
                }
            }

            if (isAllDetailsValid) {
                vm.makeTransactionRequest();
            }            
        },        

        initFields: function(preFillData) {
            var fields = {
                    number: {
                        selector: '#card-number',
                        placeholder: 'Credit card number'
                    },
                    expirationDate: {
                        selector: '#card-expiry',
                        placeholder: 'MM/YY'
                    },
                    cvv: {
                        selector: '#card-security',
                        placeholder: 'CVV'
                    }
            };
            
            if (preFillData && preFillData.cardNumber)
                fields.number['prefill'] = preFillData.cardNumber;
            if (preFillData && preFillData.cardExpiry)
                fields.expirationDate['prefill'] = preFillData.cardExpiry;                            
            if (preFillData && preFillData.cvv)
                fields.cvv['prefill'] = preFillData.cvv;
            return fields;   
        },

        initStyles: function() {
            return {
                    'input': {
                        'font-size': '16px',
                        'font-family': 'courier, monospace',
                        'font-weight': 'lighter',
                        'color': '#ccc'
                    },
                    'input.invalid': {
                        'color': 'red'
                    },
                    ':focus': {
                        'color': 'black'
                    },
                    'input.valid': {
                        'color': 'green'
                    }
                };
        },

        tearDown: function() {            
            var vm = this;
            if (vm.$data.hostedFieldInstance === undefined)
                return
            if (vm.$data.hostedFieldInstance !== '') {
                vm.$data.hostedFieldInstance.teardown((err) => {
                    if (err) {
                        console.log("teardown err: " + err);
                        return;
                    }
                    vm.$emit('teardownSuccess');
                    vm.$data.hostedFieldInstance = '';
                });
            }
        }
    }
}
</script>