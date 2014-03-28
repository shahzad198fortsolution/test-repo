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





exports.findBySubCatagory = function(req, res) {
	
	   var catid = parseInt(req.params.catid);
	   var subid = parseInt(req.params.subid);
	
	    var query = "SELECT pcat.category_parent_id,cat.*,pro.*,jos_vm_product_price.* FROM `jos_vm_category_xref` as pcat ,jos_vm_product_category_xref as cat,jos_vm_product as pro,jos_vm_product_price WHERE pcat.category_parent_id = "+catid+" and pcat.category_child_id = "+subid+" and cat.category_id = pcat.category_child_id and pro.product_id = cat.product_id and jos_vm_product_price.product_id= pro.product_id limit 30";
		
		connection.query(query, function(err, rows){
		res.jsonp(rows);		
		});
};


