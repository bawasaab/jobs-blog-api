const express = require('express');
const router = express.Router();

const ContactUsController = new require('../controllers').ContactUsController;
const ContactUsControllerObj = new ContactUsController();


router.post('/', [ContactUsControllerObj.contact]);

module.exports = router;