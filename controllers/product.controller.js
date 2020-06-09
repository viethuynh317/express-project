var Product = require('../models/product.model');
var router = require('../routes/product.route');
module.exports.index = async function(req, res, next){
	// var sessionId = req.signedCookies.sessionId;
	// var page = req.query.page || 1;
	// var perPage = 8;
	// var start = (page-1) * perPage;
	// var end = page * perPage;
	// res.render('products/index', {
	// 	total: db.get('sessions').find({sessionId:sessionId}).get('total').value(),
	// 	products: db.get('products').drop(start).take(perPage).value()
	// });
	try{
		var products = await Product.find();
		res.render('products/index',{
			products: products
		});
	}catch(error){
		next(error);
	}
};