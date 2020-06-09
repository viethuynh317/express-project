var Product = require('../../models/product.model');
var db = require ('../../db');
var router = require('../routes/product.route');
module.exports.index = async function(req, res){
	// var sessionId = req.signedCookies.sessionId;
	// var page = req.query.page || 1;
	// var perPage = 8;
	// var start = (page-1) * perPage;
	// var end = page * perPage;
	// res.json(db.get('products').drop(start).take(perPage).value());
	var products = await Product.find();
	res.json(products);
};

module.exports.create = async function(req, res){
	var products = await Product.create(req.body);
	res.json(products);
}

module.exports.patchPost = async function(req, res){
	var updateProduct = await Product.updateOne({_id: req.params.id}, req.body);
	res.json(updateProduct);
}

module.exports.putPost = async function(req, res){
	await Product.findByIdAndUpdate({_id: req.params.id}, req.body);
	var replaceProduct = await Product.findOne({_id: req.params.id});
	res.json(replaceProduct);	
}

module.exports.deletePost = async function(req, res){
	var deleteProduct = await Product.remove({_id: req.params.id});
	res.json(deleteProduct);
};