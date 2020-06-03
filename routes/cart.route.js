var express = require('express');
var router = express.Router();
var controller = require('../controllers/cart.controller');

router.get('/add/:productId', controller.addCart);

module.exports = router;