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
	
	   var id = parseInt(req.params.id);
	
	    var query = "SELECT pcat.category_parent_id,cat.*,pro.*,jos_vm_product_price.* FROM `jos_vm_category_xref` as pcat ,jos_vm_product_category_xref as cat,jos_vm_product as pro,jos_vm_product_price WHERE pcat.category_child_id = "+id+" and cat.category_id = pcat.category_child_id and pro.product_id = cat.product_id and jos_vm_product_price.product_id= pro.product_id limit 30";
		
		connection.query(query, function(err, rows){
		res.jsonp(rows);		
		});
};


exports.findBymaterial = function(req, res) {
	
	   var id = parseInt(req.params.id);
	   var filter = req.params.filter;
	
	    var query = "SELECT pro.*,jos_vm_product_price.*,cat.* FROM jos_vm_product_price,jos_vm_product_category_xref as cat,jos_vm_product as pro,jos_vm_product_type_1 as type WHERE cat.category_id = "+id+" and type.product_id = cat.product_id and type.fabric___material LIKE '%"+filter+"%' and pro.product_id = cat.product_id and jos_vm_product_price.product_id= pro.product_id limit 30";
		
		connection.query(query, function(err, rows){
		res.jsonp(rows);		
		});
};

exports.findByPrice = function(req, res) {
	
	   var id = parseInt(req.params.id);
	   var price = parseInt(req.params.price);
	
	    var query = "SELECT pro.*,jos_vm_product_price.*,cat.* FROM jos_vm_product_price,jos_vm_product_category_xref as cat,jos_vm_product as pro WHERE cat.category_id = "+id+" and pro.product_id = cat.product_id and jos_vm_product_price.product_id= pro.product_id and jos_vm_product_price.product_price < "+price+" limit 30";
		
		connection.query(query, function(err, rows){
		res.jsonp(rows);		
		});
};

exports.findByStyle = function(req, res) {
	
	   var id = parseInt(req.params.id);
	   var filter = req.params.filter;
	
	    var query = "SELECT pro.*,jos_vm_product_price.*,cat.* FROM jos_vm_product_price,jos_vm_product_category_xref as cat,jos_vm_product as pro,jos_vm_product_type_1 as type WHERE cat.category_id = "+id+" and type.product_id = cat.product_id and type.body_style LIKE '%"+filter+"%' and pro.product_id = cat.product_id and jos_vm_product_price.product_id= pro.product_id limit 30";
		
		connection.query(query, function(err, rows){
		res.jsonp(rows);		
		});
};

exports.findByType = function(req, res) {
	
	   var id = parseInt(req.params.id);
	   var filter = req.params.filter;
	
	    var query = "SELECT pro.*,jos_vm_product_price.*,cat.* FROM jos_vm_product_price,jos_vm_product_category_xref as cat,jos_vm_product as pro,jos_vm_product_type_1 as type WHERE cat.category_id = "+id+" and type.product_id = cat.product_id and type.body__type LIKE '%"+filter+"%' and pro.product_id = cat.product_id and jos_vm_product_price.product_id= pro.product_id limit 30";
		
		connection.query(query, function(err, rows){
		res.jsonp(rows);		
		});
};