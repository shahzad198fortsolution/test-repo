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
	
	

exports.userinfo = function(req, res) {
	
	
    
    var query = "SELECT * from jos_vm_user_info where user_id="+req.body.user_id+"";
		//console.log(query);
		connection.query(query, function(err, rows){
		   
         /*
            var resdata = {
                                     status: 'true',
                                     data: rows,
                                     message: 'User info found'
                                 };*/
         
						setTimeout(function(){ 

                                 res.jsonp(rows[0]);

                       		 }, 0);
		});

};


exports.shoppinginfo = function(req, res) {
	
    var query = "SELECT * from jos_vm_shipping_rate,jos_vm_shipping_carrier where jos_vm_shipping_rate.shipping_rate_carrier_id=jos_vm_shipping_carrier.shipping_carrier_id";
		
		connection.query(query, function(err, rows){
		   
            var resdata = {
						    status: 'true',
						    data: rows,
						    message: 'Shipping info'
						};
						res.jsonp(resdata);         
		});

};



