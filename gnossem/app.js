var express = require('express'),
    path = require('path');
    product = require('./api/product');
	top = require('./api/top');
	designers = require('./api/designers');
	loginsignup = require('./api/loginsignup');
	cart = require('./api/cart');
	wishlist = require('./api/wishlist');
	order = require('./api/order');
	paypal = require('./api/payment');
	user = require('./api/user');
	bags = require('./api/bagsfilters');
	profilters = require('./api/productfilters');
   
var app = express();
app.use(express.bodyParser());
app.use(express.static(path.join(__dirname, 'gnossem/www')));

//New products respects to the ctegory Id and all top
app.get('/api/top', top.findAll);
app.get('/api/top/:id', top.findByCategory);

//All Products present in the database
app.get('/api/products', product.findAll);
app.get('/api/products/cat/:id', product.findByCatagory);
app.get('/api/products/subcat/:id', product.findBySubCatagory);
app.get('/api/products/detail/:id', product.findByID);
app.get('/api/products/images/:id', product.findImages);


//Designers according to category
app.get('/api/designers', designers.findAll);
app.get('/api/designers/:id', designers.findByCategory);
app.get('/api/designers/:contry/country', designers.findByCountry);
//app.post('/api/designers/postdata', designers.Postdata);


// users data login and signup
app.post('/api/loginsignup', loginsignup.loginmethod);
app.post('/api/loginsignup/signup', loginsignup.signupmethod);

app.post('/api/getCart', cart.getCart);
app.post('/api/addtoCart', cart.addtoCart);

app.post('/api/getwishlist', wishlist.getwishlist);
app.post('/api/addwishlist', wishlist.addwishlist);

app.post('/api/order', order.orderproceed);

app.get('/api/redirecturl:id', paypal.redirecturl);
app.post('/api/redirecturl:id', paypal.redirecturl);


//app.post('/api/paynow', paypal.paynow);


app.post('/api/user_info', user.userinfo);

app.get('/api/shopping_info', user.shoppinginfo);


app.get('/api/bags/subcat/:id', bags.findBySubCatagory);
app.get('/api/bags/material/:id/:filter', bags.findBymaterial);
app.get('/api/bags/price/:id/:price', bags.findByPrice);
app.get('/api/bags/style/:id/:filter', bags.findByStyle);
app.get('/api/bags/type/:id/:filter', bags.findByType);

app.get('/api/filters/subcat/:catid/:subid', profilters.findBySubCatagory);


app.listen(3000);
console.log('Listening on port 3000...');