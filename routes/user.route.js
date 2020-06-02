var express = require('express');
var multer = require('multer');

var router = express.Router();
var controller = require('../controllers/user.controller');
var validate = require('../validate/user.validate');
var upload = multer({ dest: './public/uploads/' });
router.get('/', controller.index);

router.get('/cookie', function(req, res, next){
	res.cookie('user-id', 1567);
	res.send('Hello');
});

router.get('/search', controller.search);

router.get('/create', controller.getCreate);

router.get('/:id', controller.view);



router.post('/create',  upload.single('avatar'), validate.postCreate, controller.postCreate);



module.exports = router;