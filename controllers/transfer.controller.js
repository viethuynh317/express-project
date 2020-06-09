var db = require('../db');
var shortid = require('shortid');
module.exports.getTransfer = function(req, res, next){
	res.render('transfers/index', { 
		csrfToken: req.csrfToken() 
	});
}

module.exports.postTransfer = function(req, res, next){
	req.body.id = shortid.generate();

	var data = {
		id: req.body.id,
		account: req.body.account,
		amount: parseInt(req.body.amount),
		userId: req.signedCookies.userId 
	};
	db.get('transfers').push(data).write();

	res.redirect('/transfer/add');

}