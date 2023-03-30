Use paydock gateway

Create a function into the window element that gets called once the widget is ready.

```js static
window.widgetReady = function() {console.log("widget is ready");}
```

Then create the gf-paydock widget with a reference to the on ready function.

    <div>
        <gf-payments type="paydock" style="color: red;" process-button-id="process-payment" on-ready="widgetReady"></gf-payments>
        <button id="process-payment" data-nonce="" data-payment-type="" data-last-digits="">Process Payment</button>
    </div>