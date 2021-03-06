var shortid = require('shortid');
var db = require('../db');
var router = require('../routes/user.route');
module.exports.index = function(req, res){
	var sessionId = req.signedCookies.sessionId;
	res.render('hello/index',{
		total: db.get('sessions').find({sessionId:sessionId}).get('total').value(),
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
	console.log(req.cookies);
	res.render('hello/create');
};

module.exports.view = function(req, res){
	
	var id = req.params.id;
	var user = db.get('users').find({id: id}).value();
	res.render('hello/view', {
		
		user: user	
	});
}; 

module.exports.postCreate = function(req, res){
	req.body.id = shortid.generate();
	req.body.avatar = req.file.path.split('\\').slice(1).join('/');
	db.get('users').push(req.body).write();
	res.redirect('/users');
};