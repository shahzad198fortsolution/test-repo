var http=require('http');
var mysql=require('mysql');
var db="";
var connection=mysql.createConnection({
	database:'dbname',
	user:'root',
	password:'',
	port: '3306'
});
connection.connect (function(err){
	if(err!=null){
		console.log('err'+err);
	}
});
exports.getuser = function(req, res) {
	var query="select * from tbl_user";
	connection.query(query,function(req,rows){
	
	});
};