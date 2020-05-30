var db = require('../db');
module.exports.auth = function(req, res, next){
	var user = db.get('users').find({ id: req.signedCookies.userId}).value();
	console.log(req.cookies, req.signedCookies);
	if(!user){
		res.redirect('/auth/login');
		return;
	}

	res.locals.user = user;
	next();	
}