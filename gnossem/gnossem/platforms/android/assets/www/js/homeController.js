

function HomeController($rootScope, $scope, $location,$interval,$http ,$stateParams,$ionicLoading) {
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
	$scope.goPage = function(btnName) {
		if (btnName == 'home') {
			$location.path("/Home");
		} else if (btnName == 'cart') {
			if(isAlreadyLogin==true){
				$location.path("/Cart");
			}else{
				doLoginPopup();
			}
		} else if (btnName == 'wishlist') {
			if(isAlreadyLogin==true){
				$location.path("/Wishlist");
			}else{
				doLoginPopup();
			}
		} else if (btnName == 'thanks') {
			$location.path("/Thanks");
		} else if (btnName == 'order1') {
			$location.path("/OrderStip1");
		} else if (btnName == 'top') {
			$location.path("/Top");
		} else if (btnName == 'designers') {
			$location.path("/Designers");
		} else if (btnName == 'subdetail') {
			$location.path("/ProductSubDetail");
		} else {
			$location.path("/Products/cat/" + btnName);
		}

	};
	$scope.goCartPage = function() {
		if(isAlreadyLogin==true){
				$location.path("/Cart");
			}else{
				doLoginPopup();
			}
	};
	$scope.logout = function() {
		deleteDB();
		isAlreadyLogin=false;
		$location.path("/Home");
	};

	/*
	$scope.showHideFilterBox = function() {
			//alert('showHide called');
			$("#main_dropdown_wrapper").toggle();
		};
		
		$scope.getproducts = function(text,filter){
			$(".product_drowdown_main_text").html(text);
			if(filter == 'all')
				{
		$scope.pro = "http://images.gnossem.com/components/com_virtuemart/shop_image/product/Secret_Hideaway__4f75b95f925e0.jpg";
		var id = $stateParams.pId;
		 $scope.bags = {};
		 //$scope.show();
		$http.get(baseURL+'products/cat/'+id).success(function (data) {
			 $scope.bags = data; 
			 $rootScope.objects = $scope.bags; 
			 $("#main_dropdown_wrapper").toggle();
			// $scope.hide(); 
		})
	   .error(function () {
			   //$scope.hide();    
			alert("Please check your internet connection or data source..");
	   });
						 }
		};*/
	

	/*
	$scope.productDetail = function(pId) {
			$location.path("/ProductDetail/" + pId);
		};
	*/
	
	$scope.openLeft = function() {
		$scope.sideMenuController.toggleLeft();
	};

	$scope.oneAtATime = true;
	$scope.$watch('groups[0].open', function(isOpen) {
		if ( isOpen = true) {
			console.log('First group was opened');
			$scope.$broadcast('scroll.resize');
		}
	});

	$scope.editButton = function() {
		$(".delete_icon").toggle();
	};

}

