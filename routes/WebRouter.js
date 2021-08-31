var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/about-us', function(req, res, next) {
    res.render('about_us', { title: 'Express' });
});

router.get('/contact-us', function(req, res, next) {
    res.render('contact_us', { title: 'Express' });
});

router.get('/all-jobs', (req, res, next) => {
    res.render('all_jobs', { title: 'Express' });
});

router.get('/job-details', (req, res, next) => {
    res.render('job_details', { title: 'Express' });
});

module.exports = router;