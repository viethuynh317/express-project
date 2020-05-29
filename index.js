var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var port = 3000;
var userRoute = require('./routes/user.route');
app.set('view engine', 'pug');
app.set('views', './views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));		
app.use('/users', userRoute);

app.listen(port, function(){
	console.log('Server listening on port ' + port);
});

