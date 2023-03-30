# Payment Gateway components
-----



## **Creating a gofundraise payment gateway component**

The gf payment gateway library allows us to create new payment gateway components that can be dropped in to the gofundraise pages and then used. You will need to create these using VueJs and type script conforming to the same language structure and semantics as applied throughout the project.

The interfaces and semantics that have to be followed are expalined in this section below.


### **Location**

The payment gateway components should all be kept in the `src\components\<componentname>` sub folder

All components must have accompanied tests which are to be kept in the `test\specs\<componentname>.spec.js`


### **Common files**

Common file are located in the `src\common\` directory. These should not be touched unless there is a need for common functionality to be added across all the components. 



### **GfPayments.vue**

The main entry point of the widget is `src\GfPayments.vue`
There is work to be done to make this more dynamic but for the time being, any new components can be added to the template of this file and pass in the appropriate parameters.


### **Importing payment interface for the new component**

You will need to import the `GfPaymentComponent` as a `mixin` to the vue componet. For an example, see `src\components\braintree-creditcard\GfBrainTreeCreditCard.vue`

This will ensure all the common methods are imported to the component.


### **Callback after user enters valid data**

You will need to manage the user input and make a callback to the method

`onPaymentMethodReceived: function (nonce, paymentType, lastDigits)`

This method is located in the `src\common\GfPaymentHandler`

This will inform the client that has instantiated the widget with the appropriate details.

if any of the properties are not applicable, you can mark them with `na`. DO NOT mark them with an empty string.  

The calback can be called as many times as required.

### **Updating payment type once details are availabe**

When the user inputs data, the payment type may be made available. If so, the component should make a call to

`onPaymentTypeChanged: function(paymentType)`

e.g. payment type may be visa, mastercard, amex etc.

### **Invalidating data when there is incorrect data**

If we have a change in the user input that makes the previously valid data invalid, you must clear the old data. You can make a call to `clearInputData()` function, which will clear out the data.

TODO: make a callback to the client caller when the tokenization state changes.