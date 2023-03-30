Using Stripe Credit Card payment gateway. Create a function that will be called on success then use the function name in the attributes of the control

```js static
window.success = function() {console.log("success");}
```

    <div>
        <gf-payments type="stripe-credit-card" tokenizationKey="someKey" process-button-id="btnDonate" on-tokenize-success="success" on-tokenize-error=""></gf-payments>
        <button id="btnDonate" class="btn btn-primary">Donate</button>
    </div>


You will need to ensure the `on-tokenize-success` and `on-tokenize-error` functions are available as a global namespace.
