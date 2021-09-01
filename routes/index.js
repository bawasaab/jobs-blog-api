var express = require('express');
var router = express.Router();

const ApiRouter = require('./ApiRouter');
const WebRouter = require('./WebRouter');

const AuthController = require('../controllers/').AuthController;
const AuthControllerObj = new AuthController();

/* GET home page. */

// router.use('/api', ApiRouter);
router.use('/', WebRouter);

module.exports = router;