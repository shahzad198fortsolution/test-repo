
function Signup($scope,$location,$http,$ionicLoading) {
  $scope.user = {name: '', email: '', passwordp: ''};
    $scope.signup = function(user) {
    	if(user.name==''){
    		alert('Enter valid User Name ');
    	}else if(user.email==''){
    		alert('Enter valid Email ');
    	}else if(user.passwordp==''){
    		alert('Enter valid Password ');
    	}else{
    		$scope.show();
    		 $http.post(baseURL+'loginsignup/signup',user).success(function (res) { 
              $scope.response = res;  
              if(res.status=='false'){
              	$scope.hide();
              	alert(res.message);
              }else{
              	$scope.hide();
              	$location.path("/Login");
              }
        })
        .error(function () {
             $scope.hide();
             alert("Please check your internet connection or data source..");
                
            
        });
    	}
        
	};
	
	$scope.cancel = function() {
        $location.path("/Login");
	};
	
	
		$scope.show = function() {
		$scope.loading = $ionicLoading.show({
		content: 'Loading',
		animation: 'fade-in',
		showBackdrop: true,
		maxWidth: 200,
		showDelay: 500
    });
  };

  $scope.hide = function(){
    $scope.loading.hide();
  };
}