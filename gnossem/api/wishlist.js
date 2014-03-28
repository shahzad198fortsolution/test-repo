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
	
	






exports.getwishlist = function(req, res) {
      
        var php = require('phpjs');
      
		if(php.is_object(req.body))
				{
					
     				 var query = "SELECT * from jos_vm_wishlist where jos_vm_wishlist.user_id="+req.body.user_id+"";

			  		connection.query(query, function(err,rows){
                       
                       len = rows.length;
                       len = parseInt(len);
                       var j= 0;
                       var prodata = new Array();
                       
                       for(var i=0;i<len;i++)
                       		{
                               var pid = rows[i]['products'];

                               var query = "SELECT pro.*,jos_vm_product_price.*,cat.* FROM jos_vm_product_price,jos_vm_product_category_xref as cat,jos_vm_product as pro WHERE cat.product_id = "+pid+" and pro.product_id = "+pid+" and jos_vm_product_price.product_id= "+pid+"";
                               connection.query(query, function(err,prows){

                               		prodata[j] = prows[0];
                               		j++;


                               });
                       		}

                       		setTimeout(function(){ 

                                 res.jsonp(prodata);

                       		 }, 1000);
                       		
			  			
					 });

				}
				 else
				 	 {
		                res.jsonp("Object is not correct");
				 	 }

        
		
};


exports.addwishlist = function(req, res) {
      
        var php = require('phpjs');
         
		if(php.is_object(req.body))
				{

					var now = new Date();
					
					var query = "INSERT INTO jos_vm_wishlist SET date = '"+now+"', jos_vm_wishlist.products = "+req.body.product_id+", jos_vm_wishlist.user_id = "+req.body.user_id;
					

                    			 connection.query(query, function(err,rows){

                    			 	res.jsonp("product added successfully");

                    			 	});

				}
				 else
				 	 {
		                res.jsonp("Object is not correct");
				 	 }

			};