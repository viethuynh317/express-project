var shortid = require('shortid');
var db = require('../db');
var router = require('../routes/user.route');
module.exports.index = function(req, res){
	res.render('hello/index',{
		users: db.get('users').value()
	});
};

module.exports.search = function(req, res){
	var q = req.query.q;
	var matchedUsers = db.get('users').value().filter(function(user){
		return db.get('users').value().name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	}); 
	console.log(matchedUsers);
	res.render('hello/index', {
		users: matchedUsers
	});
};

module.exports.getCreate = function(req, res){
	res.render('hello/create');
};

module.exports.view = function(req, res){
	var id = req.params.id;
	var user = db.get('users').find({ id: id}).value();
	res.render('hello/view', {
		user: user
	});
}; 

module.exports.postCreate = function(req, res){
	req.body.id = shortid.generate();
	var errors = [];
	if (!req.body.name){
		errors.push('Name is required');
	}
	if (!req.body.phone){
		errors.push('Phone is required');
	}
	if(errors.length){ 
		res.render('hello/create', {
			errors: errors,
			values: req.body
		});
		return;
	}
	db.get('users').push(req.body).write();
	res.redirect('/users');
};