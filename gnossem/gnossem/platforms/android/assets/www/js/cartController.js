
	var userId=0;
	var productIds='';
	var productPrice='';
	var price=0;

function CartController($rootScope,$scope, $location, $http, $ionicLoading) {
	userId=$rootScope.userIdInfo;
	$scope.goPageHome = function(btnName) {
		alert('goPage on CartController ');
		if (btnName == 'home') {
			$location.path("/Home");
		}
	};
	$scope.openLeft = function() {
		$scope.sideMenuController.toggleLeft();
	};
	
	function popup()
	{
	var x;
	var r=confirm("Proceed to check out ?");
	if (r==true)
	  {
	  x="You pressed OK!";
		  $location.path("/Cart");
	  }
	else
	  {
	  x="You pressed Cancel!";
	  
	  
	  }
	document.getElementById("demo").innerHTML=x;
	}
	
	
	function doLoginPopup()
	{
	var x;
	var r=confirm("Please Proceed to Login for this task");
	if (r==true)
	  {
		  x="You pressed OK!";
			  $location.path("/Login");
		}else
		  {
			  x="You pressed Cancel!";
		  }
		document.getElementById("demo").innerHTML=x;
	}

	$scope.addToCart = function(object) {
		if(isAlreadyLogin==true){
			var user = {
				user_id : userId,
				cartpro : {
					quantity : 1,
					product_id : object.product_id,
					parent_id : object.product_parent_id,
					category_id : 0,
					description : object.product_desc
				}
			};
			 var data = { "data" : user};
			$scope.show();
			$http.get('http://gnossem.fountaintechies.com/api/api.php?action=addcart', {params :data})
			.success(function (res) { 
	             $scope.hide();
	              //console.log(res);
	              popup();
	              alert(res.message);
	              
	      });
       }else{
       	
			doLoginPopup();
		}
	};


	$scope.addToWishList = function(object) {
		if(isAlreadyLogin==true){
			var user = {
			user_id : userId,
			product_id : object.product_id
			};
			$scope.show();
			$http.post(baseURL+'addwishlist', user).success(function(res) {
	
				console.log(res);
				$scope.hide();
				alert(res);
	
			}).error(function(error) {
				$scope.hide();
				alert(error);
	
			});
		}else{
			doLoginPopup();
		}

		
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

	$scope.hide = function() {
		$scope.loading.hide();
	};

}

function CartProductList($rootScope, $scope, $http, $location, $ionicLoading) {
	userId=$rootScope.userIdInfo;
	$rootScope.cartProducts = {};
	$scope.show = function() {
		$scope.loading = $ionicLoading.show({
			content : 'Loading',
			animation : 'fade-in',
			showBackdrop : true,
			maxWidth : 200,
			showDelay : 500
		});
	};

	$scope.hide = function() {
		$scope.loading.hide();
	};
	var user = {
		user_id : userId
	};
	//alert(user.user_id);
	$scope.show();
	 var data = { "data" : user};
	$http.get('http://gnossem.fountaintechies.com/api/api.php?action=getcart', {params :data})
	.success(function (res) {   
        console.log(res);
         $scope.hide();
        if(res.status!='false'){
		$rootScope.cartProducts = res.product_info;
		var ojects=$rootScope.cartProducts;
		$scope.totalPrice=0;
		$scope.productPrices='';
		price=0;
		var dash='';
		for(var i=0;i<ojects.length;i++){
			ojects[i].product_price=parseInt(ojects[i].product_price, 10);
			price=price+ojects[i].product_price;//parseInt(ojects[i].product_price, 10);
			productIds=productIds+dash+ojects[i].product_id;
			productPrice=productPrice+dash+ojects[i].product_price;
			dash='-';
		}
		$scope.totalPrice=price;
		$rootScope.totalamount = price;
		$scope.hide();
		
		}else{
			alert('No Product exist in the cart ');
		}
       });       
       
       $scope.deleteButton = function(id,index) {
		var prprice = $("#price"+id).val();
		prprice = parseInt(prprice);
		var cprice = $rootScope.totalamount;
		cprice = parseInt(cprice);
		cprice = cprice - prprice;
		$rootScope.totalamount = cprice;
		$("#"+id ).remove();
		$rootScope.cartProducts.splice(index, 1);
	};
     
}

function wishListProduct($rootScope,$scope, $http, $location, $ionicLoading) {

	$scope.whishListProducts = {};
	$scope.show = function() {
		$scope.loading = $ionicLoading.show({
			content : 'Loading',
			animation : 'fade-in',
			showBackdrop : true,
			maxWidth : 200,
			showDelay : 500
		});
	};

	$scope.hide = function() {
		$scope.loading.hide();
	};
	userId=$rootScope.userIdInfo;
	var user = {
		user_id : userId
	};
	//alert(user.user_id);
	$scope.show();
	$http.post(baseURL+'getwishlist', user).success(function(res) {
		console.log(res);
		$scope.whishListProducts=res;
		if($scope.whishListProducts.length==0){
			alert('No Product exist in the WishList');
		}
		$scope.hide();
		console.log(res);

	}).error(function(error) {
		$scope.hide();
		alert("Error message " + error);

	});

}

function storeController($scope, DataService) {
    $scope.cart = DataService.cart;
}