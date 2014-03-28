//----------------------------------------------------------------
// shopping cart
//
function shoppingCart() {
 
    this.checkoutParameters = {};
   
  
}

// define checkout parameters
shoppingCart.prototype.addCheckoutParameters = function (serviceName, merchantID, options) {

    // check parameters
    if (serviceName != "PayPal" && serviceName != "Google" && serviceName != "Stripe") {
        throw "serviceName must be 'PayPal' or 'Google' or 'Stripe'.";
    }
    if (merchantID == null) {
        throw "A merchantID is required in order to checkout.";
    }

    // save parameters
    this.checkoutParameters[serviceName] = new checkoutParameters(serviceName, merchantID, options);
};



// check out
shoppingCart.prototype.checkout = function (serviceName) {

    // select serviceName if we have to
    if (serviceName == null) {
        var p = this.checkoutParameters[Object.keys(this.checkoutParameters)[0]];
        serviceName = p.serviceName;
    };

    // sanity
    if (serviceName == null) {
        throw "Use the 'addCheckoutParameters' method to define at least one checkout service.";
    }

    // go to work
    var parms = this.checkoutParameters[serviceName];
    if (parms == null) {
        throw "Cannot get checkout parameters for '" + serviceName + "'.";
    }
    switch (parms.serviceName) {
        case "PayPal":
            this.checkoutPayPal(parms);
            break;
        case "Google":
            this.checkoutGoogle(parms);
            break;
        case "Stripe":
            this.checkoutStripe(parms);
            break;
        default:
            throw "Unknown checkout service: " + parms.serviceName;
    }
};

// check out using PayPal
// for details see:
// www.paypal.com/cgi-bin/webscr?cmd=p/pdn/howto_checkout-outside
shoppingCart.prototype.checkoutPayPal = function (oject,order) {

    // global data
     var parms = this.checkoutParameters["PayPal"];
    var data = {
        cmd: "_cart",
        business: parms.merchantID,
        upload: "1",
        rm: "2",
        charset: "utf-8"
    };
   
    var products=oject.products;
 
    for(var i=0;i<products.length;i++){
    	//alert(i);
    	data["item_number_" + (i+1)]=products[i].cart.product_id;
    	 data["item_name_" + (i+1)] = products[i].product_name;
        data["quantity_" + (i+1)] = products[i].cart.quantity;
        data["amount_" + (i+1)] = products[i].product_price;
      // data["amount_" + (i+1)] = 0.01;
    }
   
   	 data["shipping"]= oject.shippingprice;
 	data["return"] = "http://gnossem.fountaintechies.com:3000/api/redirecturl/"+order;
   	//data["return"] = "http://192.168.1.65:3000/api/redirecturl/"+order;
      //  data["return"] = "http://192.168.1.77:3000/#/Thanks/"+order;
      	// data["order_id"] = "2";
		console.log(data);
    // build form
    var form = $('<form/></form>');
    form.attr("action", "https://www.sandbox.paypal.com/cgi-bin/webscr");
    form.attr("method", "POST");
    form.attr("style", "display:none;");
    this.addFormFields(form, data);
    this.addFormFields(form, parms.options);
    $("body").append(form);
    form.submit();
    form.remove();
};

// utility methods
shoppingCart.prototype.addFormFields = function (form, data) {
    if (data != null) {
        $.each(data, function (name, value) {
            if (value != null) {
                var input = $("<input></input>").attr("type", "hidden").attr("name", name).val(value);
                form.append(input);
            }
        });
    }
};
shoppingCart.prototype.toNumber = function (value) {
    value = value * 1;
    return isNaN(value) ? 0 : value;
};

//----------------------------------------------------------------
// checkout parameters (one per supported payment service)
//
function checkoutParameters(serviceName, merchantID, options) {
    this.serviceName = serviceName;
    this.merchantID = merchantID;
    this.options = options;
}