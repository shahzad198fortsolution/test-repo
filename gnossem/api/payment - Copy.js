var http = require('http');
var mysql = require('mysql');
var DB = 'gnossem';
var count = "";
var connection = mysql.createConnection({
  database: 'gnossem',
  user : 'root',
  password : '',
  port : '3306'
});
    
    connection.connect(function(err){
        if(err != null) {
        	console.log ('Err' +err);
        }
    });
	

exports.paynow = function(req, res) {

  var paypal_api = require('paypal-rest-sdk');

  //console.log(req.body);

  var user_id = req.body.user_id;
  var number = req.body.number;
  var type = req.body.ctype;
  var expire_month = req.body.expire_month;
  var expire_year = req.body.expire_year;
  var cvv2 = req.body.cvv2;
  var first_name = req.body.first_name;
  var last_name = req.body.last_name;
  var billing_address = req.body.billing_address;
  var city = req.body.city;
  var state = req.body.state;
  var postal_code = req.body.postal_code;
  var country_code = req.body.country_code;
  var total = req.body.total;
  var description = req.body.description;
  var order_id = req.body.order_id;
  

var config_opts = {
    'host': 'api.sandbox.paypal.com',
    'port': '',
    'client_id': 'EBWKjlELKMYqRNQ6sYvFo64FtaRLRR5BdHEESmha49TM',
    'client_secret': 'EO422dn3gQLgDbuwqTjzrFgFtaRLRR5BdHEESmha49TM'
};

var create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
        // "funding_instruments": [{
        //     "credit_card": {
        //         "type": type,
        //         "number": number,
        //         "expire_month": expire_month,
        //         "expire_year": expire_year,
        //         "cvv2": cvv2,
        //         "first_name": first_name,
        //         "last_name": last_name,
        //         "billing_address": {
        //             "line1": billing_address,
        //             "city": city,
        //             "state": state,
        //             "postal_code": postal_code,
        //             "country_code": country_code
        //         }
        //     }
        // }]
    },
    "transactions": [{
        "amount": {
            "total": total,
            "currency": "USD",
            "details": {
                "subtotal": total,
                "tax": "0",
                "shipping": "0"
            }
        },
        "description": description
    }]
};
//console.log(create_payment_json);
paypal_api.payment.create(create_payment_json, config_opts, function (err, res) {
    if (err) {
         console.log(err);
         throw err;
        // var resdata = {
        //         status: 'false',
        //         message: 'wrong card information'
        //     };
        //     setTimeout(function(){ 

        //                          res.jsonp(resdata);

        //                      }, 10000);
    }

    if (res) {
       console.log(res);
      // setTimeout(function(){ 
       
      //  order_payment_trans_id = res['id'];
      
      //   var query = "UPDATE jos_vm_order_payment SET order_payment_log = '"+description+"', order_payment_trans_id = '"+order_payment_trans_id+"' where order_id = "+order_id+"";
                            
      //               connection.query(query, function(err,rows){
      //                   var resdata = {
      //                           status: 'true',
      //                           message: 'Payment Complete'
      //                       };
      //                       res.jsonp(resdata);
      //                 }); // oerder payment
      //   }, 10000);
      
        
    }

});
	
};