var express = require('express');
var router = express.Router();
var controller = require('../controllers/transfer.controller');

router.get('/add', controller.getTransfer);
router.post('/add', controller.postTransfer);

module.exports = router;