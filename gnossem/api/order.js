var http = require('http');
var mysql = require('mysql');
var DB = 'gnossem';
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

exports.orderproceed = function(req, res) {
	
	  var md5 = require('MD5');

    //console.log(req.body.products[0].cart.product_id);

   // return;
    
    
    var query = "SELECT * from jos_vm_user_info where jos_vm_user_info.user_id="+req.body.user_id;
		
		connection.query(query, function(err,rows){
            var user_info_id = rows[0]['user_info_id'];
            var user_id = req.body.user_id;
            var email = req.body.email;
            var firstname = req.body.firstname;
            var lastname = req.body.lastname;

            var phone = req.body.phone;
            var mobile = req.body.mobile;
            var country = req.body.country;
            var address1 = req.body.address1;
            var address2 = req.body.address2;
            var state = req.body.state;
            var city = req.body.city;
            var zipcode = req.body.zipcode;

            var total = req.body.total;

             var shippingtype = req.body.shippingtype;
             var shippingprice = req.body.shippingprice;

            // var itemname = req.body.itemname;
            // var price = req.body.price;
            // var quantity = req.body.quantity;
            // var subtotal = req.body.subtotal;
            
            // var shoppingamount = req.body.shoppingamount;
            // var copoundiscount = req.body.copoundiscount;
            // var ordertotal = req.body.ordertotal;
            // var agree = req.body.agree;
            // var product_id = req.body.product_id;
            // var product_price = req.body.product_price;


            
var query = "UPDATE jos_vm_user_info SET user_info_id = '"+user_info_id+"' , user_email = '"+email+"',first_name='"+firstname+"',last_name='"+lastname+"',phone_1='"+phone+"',phone_2='"+mobile+"',address_1='"+address1+"',address_2='"+address2+"',city='"+city+"',state='"+state+"',country='"+country+"',zip='"+zipcode+"',user_email='"+email+"' where user_id = "+user_id+"";

                         connection.query(query, function(err,rows){
                          var php = require('phpjs');

                         var user_hash = md5(user_id);
                         user_hash = php.substr(user_hash, 0, 25);
                         order_number = user_id+"_"+user_hash;

        var query = "INSERT INTO jos_vm_orders SET vendor_id=1,order_number='"+order_number+"' ,user_info_id = '"+user_info_id+"',order_total='"+total+"',order_subtotal='"+total+"',coupon_discount='N',order_status='P',ship_method_id='"+shippingtype+"' , user_id = "+user_id+"";
       
               connection.query(query, function(err,rows){

                  var order_id = rows.insertId;

    var query = "INSERT INTO jos_vm_order_user_info SET address_type = 'BT' ,address_type_name='-default-' order_id = "+order_id+" , user_email = '"+email+"', first_name='"+firstname+"',last_name='"+lastname+"',phone_1='"+phone+"',phone_2='"+mobile+"', address_1='"+address1+"', address_2='"+address2+"', city='"+city+"', state='"+state+"', country='"+country+"',zip='"+zipcode+"', user_id = "+user_id+"";
              
                         connection.query(query, function(err,rows){

              var query = "INSERT INTO jos_vm_order_history SET order_id = "+order_id+" ,order_status_code='P'";
                         connection.query(query, function(err,rows){
                          
                          
                          var products = req.body.products;

                         
                          for (var i = 0;i<products.length; i++) {
                            var product_id = products[i].product_id;
                            var vendor_id = products[i].vendor_id;

                            var product_sku = products[i].product_sku;
                            var order_item_name = products[i].product_name;
                            var product_quantity = products[i].cart.quantity; // it will have to change
                            var product_item_price = products[i].product_price;

                            var product_final_price = parseInt(product_quantity)*parseInt(product_item_price);
                            var order_item_currency  = products[i].product_currency;
                            var product_attribute = products[i].product_s_desc;
                            
                            
                            var query = "INSERT INTO jos_vm_order_item SET order_id = "+order_id+" , user_info_id='"+user_info_id+"', vendor_id="+vendor_id+", product_id="+product_id+", product_quantity="+product_quantity+", product_item_price="+product_item_price+", product_final_price="+product_final_price+", order_item_currency='"+order_item_currency+"', order_status='P',order_item_sku='"+product_sku+"',order_item_name='"+order_item_name+"'";

                            connection.query(query, function(err,rows){
                            }); // oerder items

                          };

                     


                         
                               
                               var query = "INSERT INTO jos_vm_order_payment SET order_id = "+order_id+" , payment_method_id=4";
                            
                                connection.query(query, function(err,rows){
                                  }); // oerder payment

                           

                          var resdata = {
                                
                                status: 'true',
                                order_id: order_id,
                                message: 'Order submitted successfully'
                            };

                            var query = "DELETE FROM jos_vm_cart where jos_vm_cart.user_id="+user_id+"";
                            connection.query(query, function(err,rows){
                              }); // delete cart


                             res.jsonp(resdata);

                 }); // oerder history

                 }); // oerderuserinfo

                 }); // oerderinfo
                             
                  }); // user_info

		}); // user

  

	
};