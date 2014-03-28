// angular.module is a global place for creating, registering and retrieving Angular modules
// 'directory' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'directory.services' is found in services.js
// 'directory.controllers' is found in controllers.js
var storeApp =angular.module('gnossem', ['ionic',  'gnossem.controllers', 'snap', 'truncate', 'angular-lazy','ngSanitize'])


    .config(function ($stateProvider, $urlRouterProvider) {
	
        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
    
        $stateProvider
      	  .state('Splash', {
                url: '/Splash',
                templateUrl: 'templates/splash.html'
            })
            .state('login', {
                url: '/Login',
                templateUrl: 'templates/login.html'
            })
			
			.state('Singup', {
				url: '/Singup',
				templateUrl: 'templates/signup.html'
			})
			.state('Home', {
				url: '/Home',
				templateUrl: 'templates/home.html'
			})
			
			.state('Products', {
				url: '/Products/cat/:pId',
				templateUrl: 'templates/products.html'
			})
			.state('Designers', {
				url: '/Designers',
				templateUrl: 'templates/designers.html'
			})
			.state('Top', {
				url: '/Top',
				templateUrl: 'templates/top_products.html'
			})
			.state('ProductDetail', {
				url: '/ProductDetail/:pId',
				templateUrl: 'templates/product_detail.html'
			})
			.state('ProductSubDetail', {
				url: '/ProductSubDetail',
				templateUrl: 'templates/product_sub_detail.html'
			})
			.state('Cart', {
				url: '/Cart',
				templateUrl: 'templates/mycart.html'
			})
			.state('Wishlist', {
				url: '/Wishlist',
				templateUrl: 'templates/mywishlist.html'
			})
			.state('OrderStip1', {
				url: '/OrderStip1',
				templateUrl: 'templates/order_info1.html'
			})
			.state('OrderStip2', {
				url: '/OrderStip2',
				templateUrl: 'templates/order_info2.html'
			})
			.state('OrderStip3', {
				url: '/OrderStip3',
				templateUrl: 'templates/order_info3.html'
			})
			.state('OrderStip4', {
				url: '/OrderStip4',
				templateUrl: 'templates/order_info4.html'
			})
			.state('Thanks', {
				url: '/Thanks',
				templateUrl: 'templates/thanks.html'
			});
            
        $urlRouterProvider.otherwise('/Home');

    });
    
    storeApp.factory("DataService", function () {

    // create store
    var myStore = new store();

    // create shopping cart
    var myCart = new shoppingCart("gnossem");

    // enable PayPal checkout
    // note: the second parameter identifies the merchant; in order to use the 
    // shopping cart with PayPal, you have to create a merchant account with 
    // PayPal. You can do that here:
    // https://www.paypal.com/webapps/mpp/merchant
    myCart.addCheckoutParameters("PayPal","chouhdarywasim@gmail.com");


    // return data object with store and cart
    return {
        store: myStore,
        cart: myCart
    };
});
