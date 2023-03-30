class StripeRequestor {
    constructor() {}

    tokenizeRequest(hostedFieldsInstance, successCallback, errorCallback) {
        hostedFieldsInstance.tokenize({}, (tokenizeErr, payload) => {
            if (tokenizeErr) {
                if (errorCallback)
                    errorCallback(tokenizeErr);
                return;
            }

            successCallback(payload);
        })
    }
}

export default StripeRequestor;
