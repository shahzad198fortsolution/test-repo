 document.addEventListener("deviceready", onDeviceReady, false);
	var userInfoObject=null;
	var isDeviceReady=false;
	var userLogin=false;
    // Populate the database 
    function createDB(tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS userinfo (userid unique, useremail, username,userinfoid)');
         isDeviceReady=true;
       
    }

    // Query the database
    //
    function queryDB(tx) {
        tx.executeSql('SELECT * FROM userinfo', [], querySuccess, errorCB);
    }
  
    // Transaction error callback

    function errorCB(err) {
    	//alert("error in batabase creating = "+err.toString);
        console.log("Error processing SQL: "+err.code);
        userLogin=true;
    }

    // Transaction success callback
   
    function querySuccess(tx, results) {
    	userInfoObject =null;
        var len = results.rows.length;
        for (var i=0; i<len; i++){
        	//alert(" UserID = " + results.rows.item(i).userid + " useremail =  " + results.rows.item(i).useremail+ " username =  " + results.rows.item(i).username+ " userinfoid =  " + results.rows.item(i).userinfoid);
		  userInfoObject = {
					  user_id: results.rows.item(i).userid,
					  user_name: results.rows.item(i).username,
					  user_username: "",
					  user_email: results.rows.item(i).useremail,
					  user_info_id: results.rows.item(i).userinfoid
				 };
           }
           userLogin=true;
	    }

	
	function successCB() {
        var db = window.openDatabase("gnossem", "1.0", "Gnossem Databas", 200000);
         db.transaction(queryDB, errorCB);
         
    }
	
	function insertDB(tx) {				
		var query='('+userInfoObject.user_id+' , "'+userInfoObject.user_email+'" , "'+userInfoObject.user_username+'" , "")';
        tx.executeSql('INSERT INTO userinfo (userid, useremail, username, userinfoid) VALUES '+query);
        userInfoObject=null;
       
	}
		
	 function getUserInfo() {
    	return userInfoObject;
    }
	
	function isertInDB(object) {
		userInfoObject=object;
        var db = window.openDatabase("gnossem", "1.0", "Gnossem Databas", 200000);
        db.transaction(insertDB, errorCB);
    }
    function queryDeleteSuccess(tx, results) {
    	alert('You are logout Successfully..');
	}
    function queryDeleteDB(tx) {
    	//alert('queryDeleteDB befor');
        tx.executeSql('DELETE FROM userinfo', [], queryDeleteSuccess, errorCB);
       // alert('queryDeleteDB After');
    }
    
	function deleteDB() {
        var db = window.openDatabase("gnossem", "1.0", "Gnossem Databas", 200000);
        db.transaction(queryDeleteDB, errorCB);
    }
    function onDeviceReady() {
    	
    	// if (navigator.notification) { // Override default HTML alert with native dialog
        	// window.alert = function (message) {
            // navigator.notification.alert(
                // message,    // message
                // null,       // callback
                // "Gnossem", // title
                // 'OK'        // buttonName
            	// );
        	// };
    	// }
    	
        document.addEventListener("backbutton", onBackKeyDown, false);
    	 function onBackKeyDown() {
    	 	//alert('backbutton  addEventListener');
    	 	 navigator.app.exitApp();
			/*
			 if($.mobile.activePage.is('#/Login')){
										   alert('backbutton  addEventListener');
										   //e.preventDefault();
										   navigator.app.exitApp();
									   } else {
										   alert('backbutton  else');
										   navigator.app.backHistory();
									   }*/
			
    	 	
    	}
        var db = window.openDatabase("gnossem", "1.0", "Gnossem Databas", 200000);
        db.transaction(createDB, errorCB);
       
        
    }
    