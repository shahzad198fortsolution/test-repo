// var http = require('http');
// var mysql = require('mysql');
// var DB = 'gnossem';
// var connection = mysql.createConnection({
//   database: 'gnossem',
//   user : 'gnossem',
//   password : 'ferrari4321',
//   port : '3306'
// }); 
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
	
	
	exports.testing = function(req, res) {
      
      
  //     var PHPUnserialize = require('php-unserialize');

  //     var VALS = 'a:2:{i:0;a:8:{s:8:"quantity";i:2;s:10:"product_id";s:4:"3229";s:9:"parent_id";i:3229;s:11:"category_id";i:14;s:5:"attr1";s:12:"Blue & Ivory";s:5:"attr2";s:9:"Free size";s:10:"attr_stock";s:1:"4";s:11:"description";s:0:"";}s:3:"idx";i:1;}';
		
		// var res = PHPUnserialize.unserialize(VALS);

        var php = require('phpjs');
        
        var VALS = 'a:2:{i:0;a:8:{s:8:"quantity";i:2;s:10:"product_id";s:4:"3229";s:9:"parent_id";i:3229;s:11:"category_id";i:14;s:5:"attr1";s:12:"Blue & Ivory";s:5:"attr2";s:9:"Free size";s:10:"attr_stock";s:1:"4";s:11:"description";s:0:"";}s:3:"idx";i:1;}';

		var objS = php.unserialize(VALS);
        console.log(objS);

		//res.jsonp(json);
	    
};


exports.testingtwo = function(req, res) {
      
        var php = require('phpjs');
        
        //var data = req.body;

        var myCars=new Array();
		myCars[0]="Saab";      
		myCars[1]="Volvo";
		myCars[2]="BMW";

		console.log(myCars);

		var objS = php.serialize(myCars);

        console.log(objS);

        var dbcart = php.unserialize(objS);

        console.log(dbcart);
		
};


exports.getCart = function(req, res) {
      
        var php = require('phpjs');
      
		if(php.is_object(req.body))
				{

					
     				 var query = "SELECT * from jos_vm_cart where jos_vm_cart.user_id="+req.body.user_id+"";

			  		connection.query(query, function(err,rows){

			  			

			  			var objS = php.unserialize(rows[0]['cart_content']);

			  			//console.log(objS.length);

			  			//console.log(objS);



					    //res.jsonp(objS);

					 });

				}
				 else
				 	 {
		                res.jsonp("Object is not correct");
				 	 }

        
		
};


exports.addtoCart = function(req, res) {
      
        var php = require('phpjs');
         
		if(php.is_object(req.body))
				{

					var query = "SELECT count(user_id) as total from jos_vm_cart where jos_vm_cart.user_id="+req.body.user_id+"";

					connection.query(query, function(err,rows){
		   
		            count = rows[0]['total'];

		            count = parseInt(count);
		            if(count > 0)
		            	{
		            	}
		            	 else
		            	 	 {
		            	 	 	 var query = "INSERT INTO jos_vm_cart SET jos_vm_cart.user_id = "+req.body.user_id;

                    			 connection.query(query, function(err,rows){

                    			 	});
		            	 	 }
		            });

     				 var query = "SELECT * from jos_vm_cart where jos_vm_cart.user_id="+req.body.user_id+"";

			  		 connection.query(query, function(err,rows){

					 var cartpro = req.body.cartpro;
					 
					 cartpro = json2array(req.body);
                     
                     cartpro.shift();

					 dbcart = cartpro[0];

					 dbcart = php.serialize(dbcart);

					 dbcart = rows[0]['cart_content']+"-:-"+dbcart;

					var query = "UPDATE jos_vm_cart SET jos_vm_cart.cart_content = '"+dbcart+"' where user_id="+req.body.user_id;

			  		connection.query(query, function(err,rows){

			  		 	res.jsonp("Product added successfully");

			  		 	});

					 });

				}
				 else
				 	 {
		                res.jsonp("Object is not correct");
				 	 }

        
		
};


function json2array(json){
    var result = [];
    var keys = Object.keys(json);
    keys.forEach(function(key){
        result.push(json[key]);
    });
    return result;
}


function getArray(object){
     var array = [];
     for(var key in object){
        var item = object[key];
        array[parseInt(key)] = (typeof(item) == "object")?getArray(item):item;
     }
     return array;
}

checkIfMultiDimentional = function(arr)
{
for(var item in arr)
{
if(typeof(arr[item]) == 'object') { return true; }
}
return false;
}
myJsonify = function(thing, level)
{
var jsonString = "";
if(!level) { level = 0; }
var start;
if(typeof(thing) == 'object') {
if(checkIfMultiDimentional(thing))
{
start = 0;
for(var item in thing)
{
var value = thing[item];
if(start > 0) { jsonString += ','; }

if(value.substring) { jsonString += item+":"+value; }
else { jsonString += "\""+item+"\":{"+myJsonify(value, level+1)+"}"; }
start++;
}
}
else
{
start = 0;
for(var item in thing)
{
if(start > 0){ jsonString +=','; }
jsonString += "\""+item+"\":"+thing[item];
start++;
}

return jsonString;
}
}
else { jsonString = thing; }
return jsonString;
}