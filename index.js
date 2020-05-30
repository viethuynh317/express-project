require('dotenv').config();
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var port = 3000;
var userRoute = require('./routes/user.route');
var authRoute = require('./routes/auth.route');
var authMiddleware = require('./middleware/auth.middleware');
app.set('view engine', 'pug');
app.set('views', './views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(express.static('public'));		
app.use('/users', authMiddleware.auth, userRoute);
app.use('/auth', authRoute);
app.listen(port, function(){
	console.log('Server listening on port ' + port);
});

