import Vue from 'vue';
import Component from '../../src/GfPayments';

describe('gf-payments.vue', () => {
  const $ = require('jquery');
  const Constructor = Vue.extend(Component);
  var propsData = {processButtonId: "someButtonId"};

  it('should instance the right component', () => {
    const vm = new Constructor({propsData});
    expect(vm.$options.name).to.equal('GfPayments');
  });

  it('when paydock gateway requested, it should render paydock widget', () => {
    const vm = new Constructor({propsData}).$mount();
    expect(vm.$el.innerHTML).to.contain("paydockWidget");
  });

  it('after payment widget mounted, it should callback to ready function', function (done) {
    // arrange
    propsData.onReady = "onWidgetReady";
    propsData.processButtonId = '';    
    window.onWidgetReady = function() {
      done()
    };

    // act
    const vm = new Constructor({propsData}).$mount();
  });

  it('when payment widget contains additional properties, the extended widget can access those additional properties', function () {
    // arrange
    propsData.additionalProperties = {prop1: 'something', prop2: 'something else'};
    const vm = new Constructor({propsData});

    // act
    mountComponent(vm);

    // assert
    expect(vm.$children[0].$props.additionalProperties).to.have.property('prop1');
    expect(vm.$children[0].$props.additionalProperties).to.have.property('prop2');
  });

  it('when there is additional data sent to onPaymentMethodReceived, the properties are sent as data attributes to the process button', function () {
    // arrange
    propsData.processButtonId= "someButtonId";
    const vm = new Constructor({propsData});

    // act
    mountComponent(vm);
    vm.$children[0].onPaymentMethodReceived('some-nonce','visa','1111', {testprop: 'someprop', testprop2: 'something else'})

    // assert
    var testPropAttributeValue = $("#someButtonId").attr("data-testprop");
    var testProp2AttributeValue = $("#someButtonId").attr("data-testprop2");
    expect(testPropAttributeValue).to.equal('someprop');
    expect(testProp2AttributeValue).to.equal('something else');
  });

  var mountComponent = function(vm) {
    $('#app').remove();
    $('body').append('<div id="app"><div id="component"></div></div>'); 
    $('#app').append('<button id="someButtonId">Process</button>');    
    vm.$mount('#component');
  };
});
