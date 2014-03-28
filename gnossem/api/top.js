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
	
	
	exports.findAll = function(req, res) {
		
		var table = 'jos_vm_product';
	    var query = "SELECT * from jos_vm_product,jos_vm_product_price where "+table+".product_publish = 'Y' and jos_vm_product_price.product_id = jos_vm_product.product_id order by jos_vm_product.product_id limit 30";
		
		connection.query(query, function(err, rows){
		res.jsonp(rows);		
		});
};


exports.findByCategory = function(req, res) {
	
	var id = parseInt(req.params.id);
	//var table1 = 'jos_vm_product';
	//var table2 = 'jos_vm_product_category_xref';
	var query = "SELECT pro.*,jos_vm_product_price.*,cat.* FROM jos_vm_product_price,jos_vm_product_category_xref as cat,jos_vm_product as pro WHERE cat.category_id = "+id+"	and pro.product_id = cat.product_id and jos_vm_product_price.product_id= pro.product_id order by jos_vm_product.product_id limit 30";
	
	connection.query(query, function(err, rows){
	res.jsonp(rows);		
	});
};
	

