var db = require('../db');
module.exports.addCart = function(req, res){
	var productId = req.params.productId;
	var sessionId = req.signedCookies.sessionId;
	var page = req.query.page || 1;
	var perPage = 8;
	var start = (page-1) * perPage;
	var end = page * perPage;
	if(!sessionId){
		res.redirect('/products');
		return;
	}

	var count = db.get('sessions')
	.find({sessionId: sessionId})
	.get('cart.' + productId, 0)
	.value();

	db.get('sessions')
	.find({sessionId: sessionId})
	.set('cart.' + productId, count + 1)
	.write();

	var total = db.get('sessions')
	.find({sessionId: sessionId})
	.get('total', count)
	.value();

	db.get('sessions')
	.find({sessionId: sessionId})
	.set('total', total + 1)
	.write();
	res.render('products/index', {
		total: db.get('sessions').find({sessionId:sessionId}).get('total').value(),
		products: db.get('products').drop(start).take(perPage).value()
	});
	
}