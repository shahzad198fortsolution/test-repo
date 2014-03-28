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
	
	

exports.loginmethod = function(req, res) {
	
	var md5 = require('MD5');
    var resdata = new Array();
    resdata['status'] = "true";



   // resdata="['response':{status:'false',message:'username / password not match'}]";
    
    var query = "SELECT * from jos_users where jos_users.email='"+req.body.username+"'";
		
		connection.query(query, function(err, rows){
		   
            var count = rows.length;

            count = parseInt(count);
            
            if(count > 0){

            var dbpass = rows[0]['password'];

            var passparts = dbpass.split(":");

            var countpass = passparts.length;

            countpass = parseInt(countpass);
            
            if(countpass == 2)
            		{
            			var orgpass = req.body.passwordp+passparts[1];
            			orgpass = md5(orgpass);
            			if(orgpass == passparts[0])
            					{
								 
								  var resdata = {
									    status: 'true',
									    message: 'Login successfully',
                      user_id: rows[0]['id'],
                      user_name: rows[0]['name'],
                      user_username: rows[0]['username'],
                      user_email: rows[0]['email']
									};
									res.jsonp(resdata);
            					}
            					 else
					              	  {
					              	  	var resdata = {
														    status: 'false',
														    message: 'Wrong Username or password'
														};
														res.jsonp(resdata);
					              	  }
            		}
            		 else
            		 	 {
            		 	 	var qpass = md5(req.body.passwordp);

            		 	 	if(dbpass == qpass)
            		 	 	{
            		 	 		
            		 	 		var resdata = {
									    status: 'true',
									    message: 'Login successfully',
                      user_id: rows[0]['id'],
                      user_name: rows[0]['name'],
                      user_username: rows[0]['username'],
                      user_email: rows[0]['email']
									};
									res.jsonp(resdata);
            		 	 	}
            		 	 	 else
				              	  {
				              	  	var resdata = {
													    status: 'false',
													    message: 'Wrong Username or password'
													};
													res.jsonp(resdata);
				              	  }

            		 	 }
             }
              else
              	  {
              	  	var resdata = {
									    status: 'false',
									    message: 'Wrong Username or password'
									};
									res.jsonp(resdata);
              	  }

		});

   

	
};



exports.signupmethod = function(req, res) {
	
	var md5 = require('MD5');


    
    var query = "SELECT count(id) as total from jos_users where jos_users.email='"+req.body.email+"'";
		
		connection.query(query, function(err,rows){
		   
            count = rows[0]['total'];

            count = parseInt(count);
            if(count > 0)
            	{
            		
                    var resdata = {
				    status: 'false',
				    message: 'email already exists'
				};
  					res.jsonp(resdata);

            	}
            	 else
            	 	 {
                  var salt = genRandomPassword(32);
            	 	 //	var salt = "Hxzh91gPPEDeP08VZcNRU91iKtjY0b6a";
                  var php = require('phpjs');
            	 	 	var passfinal = req.body.passwordp+salt;
                  passfinal = php.stripslashes(passfinal);
            	 	 	passfinal = md5(passfinal);
            	 	 	passfinal = passfinal+":"+salt;
              var query = "INSERT INTO jos_users SET usertype='Registered',username='"+req.body.email+"' , gid=18,  email='"+req.body.email+"' , password='"+passfinal+"' , name = '"+req.body.name+"'";
            	 	 	connection.query(query, function(err,rows){

                            var userid = rows.insertId;

            	 	 		/////////////////

                    var query = "INSERT INTO jos_core_acl_aro SET section_value = 'users',value='"+userid+"',order_value=0,name='"+req.body.name+"',hidden=0";

                    connection.query(query, function(err,rows){
                      var or_id = rows.insertId;

                      var query = "INSERT INTO jos_core_acl_groups_aro_map SET group_id = 18,aro_id="+or_id;

                     connection.query(query, function(err,rows){

                      });

                      

                      });

                    //////////////////

                    var query = "INSERT INTO jos_vm_cart SET jos_vm_cart.user_id = "+rows.insertId;

                    connection.query(query, function(err,rows){

                         var php = require('phpjs');

                         var user_info_id = md5(userid);
                         user_info_id = php.substr(user_info_id, 0, 32);
                         var user_id = userid;
                         var email = req.body.email;

                         var query = "INSERT INTO jos_vm_user_info SET user_info_id = '"+user_info_id+"' , user_id = "+user_id+" , first_name='"+req.body.name+"' , user_email = '"+email+"'";
                         connection.query(query, function(err,rows){


                             var resdata = {
                                userid:  userid,
                                user_info_id:  user_info_id,
                                status: 'true',
                                message: 'Signup successfully'
                            };


                             res.jsonp(resdata);
                            });

                        });

            	 	 		//res.jsonp(resdata);


            	 	 	});
            	 	 }

		});

  

	
};


function genRandomPassword(length)
    {
     var php = require('phpjs');
     var salt = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
     var len = 36;
     var makepass = '';
     //mt_srand(10000000 * (double) microtime());

     for (var i = 0;i < length;i ++) {
        makepass += salt[php.mt_rand(0, len -1)];
     }

     return makepass;
    }