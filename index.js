require('dotenv').config();
var csurf = require('csurf');
var express = require('express');
var app = express();
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL);

var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');



var userRoute = require('./routes/user.route');
var authRoute = require('./routes/auth.route');
var productRoute = require('./routes/product.route');
var cartRoute = require('./routes/cart.route');
var transferRoute = require('./routes/transfer.route');

var authMiddleware = require('./middleware/auth.middleware');
var sessionMiddleware = require('./middleware/session.middleware');
var productRouteAPI = require('./api/routes/product.route');
app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleware.session);
//app.use(csurf({cookie: true}));
app.use(express.static('public'));	
app.use('/users', authMiddleware.auth, userRoute);
app.use('/auth', authRoute);
app.use('/products', authMiddleware.auth, productRoute);
app.use('/cart', cartRoute);
app.use('/transfer', authMiddleware.auth, transferRoute);
app.use('/api', productRouteAPI);
app.listen(port, function(){
	console.log('Server listening on port ' + port);
});

