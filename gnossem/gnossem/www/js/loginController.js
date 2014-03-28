var baseURL = 'http://localhost:3000/api/';
//https://docs.google.com/a/fortsolution.com/spreadsheet/ccc?key=0Amyfb74CrM09dDUtSjBfa1ByWnU2RmhQM3RyQXRuR2c&usp=sharing#gid=0
var isAlreadyLogin = false;
var userIdInfo=0;
var email='';
//var baseURL='http://gnossem.fountaintechies.com:3000/api/';
function Login($rootScope,$scope, $location, $http, $ionicLoading) {
	$rootScope.userIdInfo=0;
	$scope.user = {
		username : '',
		passwordp : ''
	};
	$scope.login = function(user) {
		if (user.username == '') {
			alert('Enter valid User Name ');
		} else if (user.passwordp == '') {
			alert('Enter valid Password ');
		} else {

			$scope.show();
			$http.post(baseURL + 'loginsignup', user).success(function(res) {
				$scope.response = res;
				console.log(res);
				if (res.status == 'false') {
					alert(res.message);
				} else {
					$rootScope.userIdInfo=res.user_id;
					email=res.user_email;
					//alert($rootScope.userIdInfo);
					isAlreadyLogin = true;
					//$scope.insertIndb(res);
					$location.path("/Home");
				}
				$scope.hide();
			}).error(function() {
				$scope.hide();
				alert("Please check your internet connection or data source..");
			});
		}
	};

	$scope.gonext = function() {
		$location.path("/Singup");
		//$scope.getDataFromDB();
	};
	$scope.insertIndb = function(userOject) {
		isertInDB(userOject);
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
function Splash($rootScope,$location,$scope,$interval) {
	var stop;
	var isDBReady = false;
	goLoginPage = function() {
		
		$location.path("/Home");
		$interval.cancel(stop);
		

		// if (isDeviceReady == true && userLogin == true) {
					// if (userInfoObject != null) {
						// //alert('AlreadyLogin');
						// $rootScope.userIdInfo = userInfoObject.user_id;
						// email = userInfoObject.user_email;
						// isAlreadyLogin = true;
						// $location.path("/Home");
					// } else {
						// //alert('Login requred');
						// isAlreadyLogin = false;
						// $location.path("/Home");
					// }
					// $interval.cancel(stop);
				// } else {
					// if (isDeviceReady == true && isDBReady != true) {
						// successCB();
						// isDBReady = true;
					// }
				// }

		
	};
	stop = $interval(goLoginPage, 100, 30, true);		
}