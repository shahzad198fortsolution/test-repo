
function ProductController($scope,$rootScope, $http ,$stateParams,$ionicLoading) {
	
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
	/*$scope.pro = "http://images.gnossem.com/components/com_virtuemart/shop_image/product/Secret_Hideaway__4f75b95f925e0.jpg";*/
	var id = $stateParams.pId;
 	$scope.bags = {};
 	$scope.show();
    $http.get(baseURL+'products/cat/'+id).success(function (data) {
    	 $scope.bags = data; 
    	 $rootScope.objects = $scope.bags; 
    	 $scope.hide(); 
    })
   .error(function () {
   	    $scope.hide();    
        alert("Please check your internet connection or data source..");
   });
   
  }
  
   function ProductDetailController($scope,$rootScope,$ionicLoading,$http,$stateParams,$ionicModal) {
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
	  
	   $scope.wasim = function(){
	   // alert("heheheeh");
	  };
	  
	   $scope.productImages = {};
        var id = $stateParams.pId;
         var obj = $rootScope.objects; 
         $rootScope.productSubDetail=null;
 	    $scope.productCatId=id;
 	    var results = [];
		var searchField = "product_id";
		var searchVal = id;
		$scope.show();
		for (var i=0 ; i < obj.length ; i++)
		{
		    if(obj[i][searchField] == searchVal)
		    	{
		    		//$rootScope.productDetail
		    		$scope.productDetail = obj[i];
		    		$rootScope.productSubDetail=$scope.productDetail;
		    		console.log($rootScope.productSubDetail);
		    		break;
		    	}
		}
		
	    $http.get(baseURL+'products/images/'+$scope.productDetail.product_id).success(function (data) {
	    	 $scope.productImages = data;
	    	 var count= $scope.productImages.length;
	    	 
	    	setTimeout(function(){
	    	  for(var i=count;i<7;i++){
	   	
		   		$("#id"+i).remove();

	   		}
	   		},5000);
	   
	    	 console.log($scope.productImages);
	    	 $scope.hide(); 
	    })
	   .error(function () {
	   	    $scope.hide();    
	        alert("Please check your internet connection or data source..");
	   });
      
      
      angular.element(document).ready(function() {
          alert("wasim");
        });
	  
			$ionicModal.fromTemplateUrl('modal.html', function(modal) {
		    $scope.modal = modal;
		  }, {
		    // Use our scope for the scope of the modal to keep it simple
		    scope: $scope,
		    // The animation we want to use for the modal entrance
		    animation: 'slide-in-up'
		  });
		
		  $scope.openModal = function() {
		  //	alert("1");
		    $scope.modal.show();
		   // alert("2");0
		  };
		  $scope.closeModal = function() {
		    $scope.modal.hide();
		  };
		
		  //Be sure to cleanup the modal
		  $scope.$on('$destroy', function() {
		    $scope.modal.remove();
		  });
 
   	}
   	
function PDetailController($rootScope,$scope,$stateParams) {
	
	
	var materialsCare=$rootScope.productSubDetail.product_fabric+"<br/>"+$rootScope.productSubDetail.product_care;
	var sizeFit=$rootScope.productSubDetail.product_size_fit;
	var modelMakeup=$rootScope.productSubDetail.product_models_makeup;
	var stylingTips=$rootScope.productSubDetail.product_styling_tips;
	 $scope.items = [{'heading':'Materials & Care',
                     'value':$rootScope.productSubDetail.product_fabric+"<br/>"+$rootScope.productSubDetail.product_care},
                     
                    {'heading':'Size & Fit',
                     'value':$rootScope.productSubDetail.product_size_fit},
                     
                     {'heading':"Model's Makeup",
                     'value':$rootScope.productSubDetail.product_models_makeup},
                     
                      {'heading':'Styling Tips',
                     'value':$rootScope.productSubDetail.product_styling_tips},
                     
                     {'heading':'Delivery & Returns',
                     'value':$rootScope.productSubDetail.product_delivery+"<br/>"+$rootScope.productSubDetail.product_returns}
                   ];
	
	
       // $scope.items = [{'heading':'Materials Care','value':'Test',}  ];
                     
                    /*
                    {'heading':'Size  Fit','value':$rootScope.productSubDetail.product_size_fit},
                                         
                                         {'heading':'Model s Makeup','value':$rootScope.productSubDetail.product_models_makeup},
                                         
                                          {'heading':'Styling Tips','value':$rootScope.productSubDetail.product_styling_tips},
                                         
                                         {'heading':'Delivery Returns','value':$rootScope.productSubDetail.product_delivery}
                                     */
                    
	
	//$scope.items = ['Materials & Care','Size & Fit','Styling Tips','Delivery & Returns'];
    $scope.toggleDetail = function($index) {
        //$scope.isVisible = $scope.isVisible == 0 ? true : false;
        $scope.activePosition = $scope.activePosition == $index ? -1 : $index;
    };
 
   	}

function TopController($http,$scope,$stateParams,$rootScope ,$ionicLoading) {

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
  	
  	
    $scope.topProducts = {};
 	$scope.show();
    $http.get(baseURL+'top').success(function (data) {
    	 $scope.topProducts = data; 
    	  $rootScope.objects = $scope.topProducts;
    	 $scope.hide(); 
    })
   .error(function () {
   	    $scope.hide();    
        alert("Please check your internet connection or data source..");
   });
 
 }
 


function DesignerController($http,$scope,$stateParams,$rootScope ,$ionicLoading) {
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
  	
  	
    $scope.designers = {};
 	$scope.show();
    $http.get(baseURL+'designers').success(function (data) {
    	 $scope.designers = data; 
    	 $scope.hide(); 
    })
   .error(function () {
   	    $scope.hide();    
        alert("Please check your internet connection or data source..");
   });
 
 }
 
 function ProductFilterController($rootScope, $scope, $location,$interval,$http ,$stateParams,$ionicLoading) {
 	
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
  	var id = $stateParams.pId;
 	$scope.bags = {};
 	$scope.show();
    $http.get(baseURL+'products/cat/'+id).success(function (data) {
    	 $scope.bags = data; 
    	 $rootScope.objects = $scope.bags; 
    	 $scope.hide(); 
    })
   .error(function () {
   	    $scope.hide();    
        alert("Please check your internet connection or data source..");
   });
   
  	$scope.setMainFiterText = function(text) {
		$(".product_drowdown_main_text").html(text);
	};
	
  	if(id==14){
  		$scope.setMainFiterText('By CATEGORY');	
  	}else if(id==39){
  		$scope.setMainFiterText('BY TYPE');
  	}else {
  		$scope.setMainFiterText('VIEW');
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

		
	
	$scope.showHideFilterBox = function() {
		if(id==14){
			$("#women_filter").toggle();
		}else if(id==39){
			$("#bag_fiter").toggle();
		}else if(id==80){
			$("#shoes_fiter").toggle();
		}else if(id==13){
			$("#men_fiter").toggle();
		}else if(id==32){
			$("#Accessory_fiter").toggle();
		}
		
	};
	$scope.fiterwomen = function(text,filter){
		$scope.setMainFiterText(text);
		$scope.showHideFilterBox();
	};
	$scope.fitermen = function(text,filter){
		$scope.setMainFiterText(text);
		$scope.showHideFilterBox();
	};
	$scope.fitershoes = function(text,filter){
		$scope.setMainFiterText(text);
		$scope.showHideFilterBox();
	};
	$scope.fiterAccessory = function(text,filter){
		$scope.setMainFiterText(text);
		$scope.showHideFilterBox();
	};
	
		$scope.fiterBags = function(text){
			$scope.setMainFiterText(text);
			$scope.showHideFilterBox();
			var url='products/cat/39';
			if(text == 'Clutches')
			{
				url='bags/subcat/40';
			}else if(text == 'Cardholders'){
				url='bags/subcat/84';
			}else if(text == 'Leather'){
				url='bags/material/39/leather';
			}else if(text == 'Less Than S$80'){
				url='bags/price/39/80';
			}else if(text == 'Less Than S$150'){
				url='bags/price/39/150';
			}else if(text == 'Less Than S$300'){
				url='bags/price/39/300';
			}else if(text == 'Boho Chick'){
				url='bags/style/39/chic';
			}else if(text == 'Glam'){
				url='bags/style/39/Glam';
			}else if(text == 'Eclectic'){
				url='bags/style/39/Eclectic';
			}else if(text == 'Minimalist'){
				url='bags/style/39/Minimalist';
			}else if(text == 'Minimalist'){
				url='bags/style/39/Grunge';
			}
			$scope.getDataRequest(url);
		};	
		
		$scope.fiterwomen = function(text){
			$scope.setMainFiterText(text);
			$scope.showHideFilterBox();
			var url='products/cat/14';
			if(text =='Clutches')
			{
				url='bags/subcat/40';
			}else if(text == 'Less Than S$50'){
				url='bags/price/14/50';
			}else if(text == 'Less Than S$100'){
				url='bags/price/14/100';
			}else if(text == 'Less Than S$200'){
				url='bags/price/14/200';
			}else if(text == 'Less Than S$300'){
				url='bags/style/14/300';
			}else if(text == 'Boho Chic'){
				url='bags/style/14/chic';
			}else if(text == 'Glam'){
				url='bags/style/14/Glam';
			}else if(text == 'Eclectic'){
				url='bags/style/14/Eclectic';
			}else if(text == 'Minimalist'){
				url='bags/style/14/Minimalist';
			}else if(text == 'Grunge'){
				url='bags/style/14/Grunge';
			}else if(text == 'Pear Shape'){
				url='bags/type/14/Pear';
			}else if(text == 'Apple Shape'){
				url='bags/type/14/Apple';
			}else if(text == 'Hourglass Shape'){
				url='bags/type/14/Hourglass';
			}else if(text == 'Athletic Shape'){
				url='bags/type/14/Athletic';
			}else if(text == 'Banana Shape'){
				url='bags/type/14/Banana';
			}else if(text == 'Accessories'){
				url='filters/subcat/14/33';
			}else if(text == 'Tops'){
				url='filters/subcat/14/26';
			}else if(text == 'Bottoms'){
				url='filters/subcat/14/68';
			}else if(text == 'Dresses'){
				url='filters/subcat/14/28';
			}else if(text == 'Beachwear'){
				url='filters/subcat/14/63';
			}else if(text == 'Bags'){
				url='filters/subcat/14/39';
			}else if(text == 'Shoes'){
				url='filters/subcat/14/80';
			}
			 $scope.getDataRequest(url);
		};
		
		$scope.fiterAccessory = function(text){
			$scope.setMainFiterText(text);
			$scope.showHideFilterBox();
			var url='products/cat/32';
			if(text == 'All Accessories')
			{
				url='products/cat/32';
			}else if(text == 'Less Than S$80'){
				url='bags/price/32/80';
			}else if(text == 'Less Than S$150'){
				url='bags/price/32/150';
			}else if(text == 'Less Than S$300'){
				url='bags/price/32/300';
			}else if(text == 'Semi-Precious Stones'){
				url='bags/style/32/Semi-Precious Stones';
			}else if(text == 'Celebrity Endorsed'){
				url='bags/style/32/Celebrity Endorsed';
			}else if(text == 'Minimalist'){
				url='bags/style/32/Minimalist';
			}else if(text == 'Gold'){
				url='bags/style/32/Gold';
			}else if(text == 'Edgy'){
				url='bags/style/32/Edgy';
			}else if(text == 'Bangles & Cuffs'){
				url='filters/subcat/32/56';
			}else if(text == 'Jewelry'){
				url='filters/subcat/32/59';
			}else if(text == 'Body Jewelry'){
				url='filters/subcat/32/85';
			}else if(text == 'Rings'){
				url='filters/subcat/32/37';
			}else if(text == 'Necklaces'){
				url='filters/subcat/32/35';
			}else if(text == 'Earrings'){
				url='filters/subcat/32/38';
			}else if(text == 'Bracelets'){
				url='filters/subcat/32/34';
			}else if(text == ''){
				url='filters/subcat/32/';
			}else if(text == 'Belts'){
				url='filters/subcat/32/36';
			}else if(text == 'Scarves'){
				url='filters/subcat/32/41';
			}
			 $scope.getDataRequest(url);
		};
		
		$scope.fitermen = function(text){
			
			$scope.setMainFiterText(text);
			$scope.showHideFilterBox();
			var url='products/cat/13';
			if(text == 'All Menswear')
			{
				url='products/cat/13';
			}else if(text == 'Less Than S$50'){
				url='bags/price/13/50';
			}else if(text == 'Less Than S$100'){
				url='bags/price/13/100';
			}else if(text == 'Less Than S$200'){
				url='bags/price/13/200';
			}else if(text == 'Less Than S$300'){
				url='bags/price/13/300';
			}else if(text == ''){
				url='bags/style/32/Celebrity Endorsed';
			}else if(text == ''){
				url='bags/style/32/Minimalist';
			}else if(text == ''){
				url='bags/style/32/Gold';
			}else if(text == 'All Menswear'){
				url='products/cat/13';
			}else if(text == 'Shirts'){
				url='filters/subcat/13/29';
			}else if(text == 'T-Shirts'){
				url='filters/subcat/13/45';
			}else if(text == 'Shorts'){
				url='filters/subcat/13/43';
			}else if(text == 'Trousers'){
				url='filters/subcat/13/44';
			}else if(text == 'Jackets'){
				url='filters/subcat/13/47';
			}else if(text == 'Accessories'){
				url='filters/subcat/13/33';
			}
			 $scope.getDataRequest(url);
			 
		};
		
		
		/*
		'http://images.gnossem.com/components/com_virtuemart/shop_image/product/GNOSSEM-331W-PAOLI-005(01).jpg'
				"http://images.gnossem.com/components/com_virtuemart/shop_image/product/Cholesburys_Judy_51ad745adfdd9.jpg"
				
				"http://images.gnossem.com/components/com_virtuemart/shop_image/product/Cholesburys_Judy_51ad745adfdd9.jpg"
				*/
		
		$scope.fitershoes = function(text){
			$scope.setMainFiterText(text);
			$scope.showHideFilterBox();
			var url='products/cat/80';
			if(text == 'All Shoes')
			{
				url='products/cat/80';
			}else if(text == 'Less than S$ 200'){
				url='bags/price/80/200';
			}
			 $scope.getDataRequest(url);
		};
		$scope.getDataRequest = function(furl) {
			$scope.show();
			$http.get(baseURL+furl).success(function (data) {
				if(data.length>0){
					$scope.bags = data; 
				 	$rootScope.objects = $scope.bags; 
				}else{
					alert('Product not found aginst this filter');
				}
				
				 //$("#main_dropdown_wrapper").toggle();
				$scope.hide(); 
			})
		   .error(function () {
				$scope.hide();    
				alert("Please check your internet connection or data source..");
		   });				
			
			
			
		};
		
	
		$scope.productDetail = function(pId) {
			$location.path("/ProductDetail/" + pId);
		};
	
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

  	
  	
  	
  	
 
 }