var express = require('express');
var router = express.Router();
var controller = require('../controllers/product.controller');

router.get('/products', controller.index);
router.post('/products', controller.create);
router.delete('/products/:id', controller.deletePost);
router.patch('/products/:id', controller.patchPost)
module.exports = router;