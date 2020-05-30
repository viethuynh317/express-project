var db = require('../db');
var md5 = require('md5');
var router = require('../routes/auth.route');
module.exports.login = function(req, res){
	res.render('auth/login');
};
module.exports.postLogin = function(req, res){
	var email = req.body.email;
	var password = req.body.password;
	var user = db.get('users').find({ email: email }).value();

	if(!user){
		res.render('auth/login', {
			errors: ['Email is not exists.'],
			values: req.body
		});
		return;
	}
	if(user.password !== md5(password)) {
		res.render('auth/login', {
			errors: ['Wrong password'],
			values: req.body
		});
		return;
	}
	res.cookie('userId', user.id);
	res.redirect('/users');
}
