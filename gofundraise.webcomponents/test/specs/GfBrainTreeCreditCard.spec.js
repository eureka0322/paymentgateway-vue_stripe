import Vue from 'vue';
import GfBrainTreeCreditCard from '../../src/components/braintree-creditcard/GfBrainTreeCreditCard';

describe('GfBrainTreeCreditCard.vue', () => {
  const $ = require('jquery');

  var vm = '';
  const Constructor = Vue.extend(GfBrainTreeCreditCard);
  var propsData = {tokenizationKey: "some-key", processButtonId: "someButtonId"};

  it('should emit success event after braintree hosted field instance mounts sucessfully', function (done) {
    // arrange
    this.timeout(2000);
    vm = new Constructor({propsData});
    
    vm.$on('hostedFieldsReady', function(instance) {
      complete();
    });

    // act
    mountBrainTreeComponent(vm);

    // assert
    var complete = function() {
      done();
    };
  });

  it('should callback to onError when erroring payment', function (done) {
    // arrange
    propsData.onTokenizeError = "onError",
    vm = new Constructor({propsData});
    
    window.onError = function() {
      success();
    };

    mountBrainTreeComponent(vm);
    
    // act
    setTimeout(function() {
      $("#someButtonId").click(); 
    }, 1000);
    
    // assert
    var success = function() {
      console.log("got error like expected")
      done();
    };
  });

  it('should not callback to tokenizeSuccess when details not entered', function (done) {
    // arrange
    propsData = {
      processButtonId: "someButtonId",
      onTokenizeSuccess: "onSuccessfulTokenization",
      tokenizationKey: "some-key", 
      preFillData: {
        cardNumber: 4444333322221111,
        cardExpiry: 1130
      }
    };
    window.onSuccessfulTokenization = function() {
      console.log("came to callback");
      assert.fail( "came to callback", "not expected to come here");
    };
    vm = new Constructor({propsData});
    mountBrainTreeComponent(vm);

    // act
    setTimeout(function() {
      $("#someButtonId").click();  
    }, 1000);
    
    // assert
    setTimeout(function() {
      done();  
    }, 1500);
  });

  it('should callback to success when valid details passed', function (done) {
    // arrange
    propsData = {
      processButtonId: "someButtonId",
      onTokenizeSuccess: "onSuccessfulTokenization",
      tokenizationKey: "some-key", 
      preFillData: {
        cardNumber: 4444333322221111,
        cardExpiry: 1130,
        cvv: 111
      }
    };
    window.onSuccessfulTokenization = function() {      
      done();
    };
    vm = new Constructor({propsData});
    mountBrainTreeComponent(vm);

    // act
    setTimeout(function() {
      $("#someButtonId").click();  
    }, 1000);
    
    // assert
    var success = function() {
      done();
    };
  });

  it('should update card type, last digits and nonce of card when valid details passed', function (done) {
    // arrange
    propsData = {
      processButtonId: "someButtonId",
      tokenizationKey: "some-key", 
      preFillData: {
        cardNumber: 378282246310005,
        cardExpiry: 1130,
        cvv: 9999
      }
    };
    vm = new Constructor({propsData});
    mountBrainTreeComponent(vm);

    // act
    setTimeout(function() {
      var cardTypeAttr = $("#someButtonId").attr("data-payment-type");
      expect(cardTypeAttr).to.equal('American Express');
        
      var lastCreditCardDigitsAttr = $("#someButtonId").attr("data-last-digits");
      expect(lastCreditCardDigitsAttr).to.equal('0005');
      
      var nonceAttr = $("#someButtonId").attr("data-nonce");
      expect(nonceAttr).to.not.equal('undefined');
      expect(nonceAttr).to.not.equal('');
      
      expect(vm.detailsTokenized).to.be.true;
      success();
    }, 1000);

    // assert
    var success = function() {
      done();
    };
  });

  var mountBrainTreeComponent = function(vm) {
    $('#app').remove();
    $('body').append('<div id="app"><div id="component"></div></div>'); 
    $('#app').append('<button id="someButtonId">Process</button>');    
    vm.$mount('#component');
  };

  afterEach(function(done) {
    vm.$on('teardownSuccess', function() {
      done();
    })

    vm.tearDown();    
  });
});
