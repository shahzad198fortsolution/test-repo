
function OrderInfo($rootScope,$scope, $location, $http, $ionicLoading,DataService) {
	 $scope.cart = DataService.cart;
	
	$rootScope.info1 = {
		user_id : userId,
		firstname : $rootScope.info1.firstname,
		lastname : $rootScope.info1.lastname,
		email : email,
		phone : $rootScope.info2.phone,
		mobile : $rootScope.info2.mobile,
		country : $rootScope.info2.country,
		address1 : $rootScope.info2.address1,
		address2 : $rootScope.info2.address1,
		state : $rootScope.info2.state,
		city : $rootScope.info2.city,
		zipcode : $rootScope.info2.zipcode,
		shippingtype : $rootScope.shippingOject.shipping_rate_name,
		shippingprice : $rootScope.shippingOject.shipping_rate_value,
		total : $rootScope.totalamount,
		products:$rootScope.cartProducts 
		
	};
	$rootScope.totalamount=$rootScope.totalamount+$rootScope.info1.shippingprice;
	

	$scope.consoleLog = function() {
		//alert('consoleLog called');
		console.log($rootScope.info1 );
	};

	$scope.show = function() {
		$scope.loading = $ionicLoading.show({
			content : 'Loading',
			animation : 'fade-in',
			showBackdrop : true,
			maxWidth : 200,
			showDelay : 500
		});
	};

	$scope.changequantiy= function(index){
		//alert(index);
		var price =$rootScope.cartProducts[index].product_price;
		var id =$rootScope.cartProducts[index].product_id;
			
			price = parseInt(price);
			var quanty = $rootScope.cartProducts[index].cart.quantity;
			
			if(quanty == '')
				{
					$rootScope.cartProducts[index].cart.quantity = 1;
				}
				 else
				     {
				     	quanty = parseInt(quanty);
				     	var final = price*$rootScope.cartProducts[index].cart.quantity;
				     	$("#subprice"+id).html("$ "+final);
				     	
				     	var total = 0;
						   for(var i=0;i<$rootScope.cartProducts.length;i++)
						   	{
						   		total +=parseInt($rootScope.cartProducts[i].product_price)*parseInt($rootScope.cartProducts[i].cart.quantity);
						   		
						   	}
						   	//alert(i);
						$rootScope.totalamount = total+parseInt($rootScope.shippingOject.shipping_rate_value);
		
				     }
			
		   
		};
		
	$scope.hide = function() {
		$scope.loading.hide();
	};


	$scope.goPage = function(btnName) {
		 if (btnName == 'cart') {
		 	alert('go to cart');
			$location.path("/Cart");
		}else if(btnName == 'submit'){
			submitOrder();
		}

	};

	submitOrder = function() {
		$rootScope.info1 = {
		user_id : userId,
		firstname : $rootScope.info1.firstname,
		lastname : $rootScope.info1.lastname,
		email : email,
		phone : $rootScope.info2.phone,
		mobile : $rootScope.info2.mobile,
		country : $rootScope.info2.country,
		address1 : $rootScope.info2.address1,
		address2 : $rootScope.info2.address1,
		state : $rootScope.info2.state,
		city : $rootScope.info2.city,
		zipcode : $rootScope.info2.zipcode,
		shippingtype : $rootScope.shippingOject.shipping_rate_name,
		shippingprice : $rootScope.shippingOject.shipping_rate_value,
		total : $rootScope.totalamount,
		products:$rootScope.cartProducts 
		
	};
		console.log($rootScope.info1);
		$scope.show();
				$http.post(baseURL + 'order', $rootScope.info1 ).success(function(res) {
					console.log(res);
					if(res.status=='true'){
						$scope.hide();
						$scope.cart.checkoutPayPal($rootScope.info1,res.order_id);
					}else{
						alert('Please try again');
					}
					
					//$location.path("/Thanks");
				}).error(function(error) {
					$scope.hide();
					alert(error);
		
				});
				
		
		
		
	};

}

function OrderInfo1($rootScope,$scope, $location, $http, $ionicLoading) {
	$rootScope.userInfo={};
	$scope.show = function() {
	$scope.loading = $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 2000
    });
  };

  $scope.hide = function(){
    $scope.loading.hide();
  };
	var user = {
		user_id : userId,
	};
	console.log(user);
	$scope.show();
    $http.post(baseURL+'user_info',user).success(function (data) {
    	$rootScope.userInfo=data;
    	//console.log(data);
    	$rootScope.info1 = {
			user_id : userId,
			firstname : $rootScope.userInfo.first_name,
			lastname : $rootScope.userInfo.last_name,
			email : email
		};
    	$scope.hide(); 
    })
   .error(function () {
   	    $scope.hide();    
        alert("Please check your internet connection or data source..");
   });
	
	$scope.goPage = function(btnName) {
		if (btnName == 'cart') {
			$location.path("/Cart");
		}

	};

	$scope.goStep2Page = function() {
		if ($rootScope.info1.firstname == '') {
			alert('Enter valid First Name ');
		} else if ($rootScope.info1.lastname == '') {
			alert('Enter valid Last Name ');
		} else if ($rootScope.info1.email == '') {
			alert('Enter valid Email ');
		} else {
			$location.path("/OrderStip2");
		}

	};
	$scope.consoleLog = function() {
		
		console.log($scope.info1);
	};
}

function OrderInfo2($rootScope,$scope, $location, $http, $ionicLoading) {	
	console.log($rootScope.userInfo);
	$rootScope.info2 = {
		phone : $rootScope.userInfo.phone_1,
		mobile : $rootScope.userInfo.phone_2,
		country : $rootScope.userInfo.country,
		address1 : $rootScope.userInfo.address_1,
		address2 : $rootScope.userInfo.address_2,
		state : $rootScope.userInfo.state,
		city : $rootScope.userInfo.city,
		zipcode : $rootScope.userInfo.zip
	};
	$scope.goStep3Page = function() {
		if ($rootScope.info2.phone == '') {
			alert('Enter valid phone number ');
		} else if ($rootScope.info2.country == '') {
			alert('Enter valid Country Name ');
		} else if ($rootScope.info2.address1 == '') {
			alert('Enter valid Address ');
		} else if ($rootScope.info2.state == '') {
			alert('Enter valid Zip or Postal Code ');
		} else if ($rootScope.info2.city == '') {
			alert('Enter valid City Name ');
		} else if ($rootScope.info2.zipcode == '') {
			alert('Enter valid Zip or Postal Code ');
		} else {
			$location.path("/OrderStip3");
		}

	};
	$scope.goPage = function(btnName) {
		if (btnName == 'cart') {
			$location.path("/Cart");
		}

	};
	$scope.consoleLog = function() {
		alert('consoleLog called');
		console.log($scope.info2);
	};
}
function OrderInfo3($rootScope,$scope, $location, $http, $ionicLoading) {	
	
		$scope.show = function() {
		$scope.loading = $ionicLoading.show({
	      content: 'Loading',
	      animation: 'fade-in',
	      showBackdrop: true,
	      maxWidth: 200,
	      showDelay: 2000
	    });
	  };
	
	  $scope.hide = function(){
	    $scope.loading.hide();
	  };
	
	$scope.goPage = function(btnName) {
		 if (btnName == 'cart') {
			$location.path("/Cart");
		}else if(btnName == 'order4'){
			if($rootScope.shippingOject!=null){
				$location.path("/OrderStip4");
			}else{
				alert('Please select shipping category ');
			}
			
		}

	};
	$rootScope.shippingOject=null;
	$scope.show();
	$http.get(baseURL + 'shopping_info' ).success(function(res) {
			//console.log(res);
			$scope.shippingInfos=res.data;
			//$rootScope.shippingOject=$scope.shippingInfos[0];
			//console.log($rootScope.shippingOject);
			$scope.hide();
		}).error(function(error) {
			$scope.hide();
			alert(error);
		});

	$scope.setShipping = function(object){
		//alert("Shipping set");
		$rootScope.shippingOject=object;
		//console.log($rootScope.shippingOject);
	  };
	
}
