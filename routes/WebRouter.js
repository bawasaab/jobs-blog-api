const express = require('express');
const moment = require('moment');
const router = express.Router();

const ArticleService = require('../services').ArticleService;
const articleServiceObj = new ArticleService();

/* GET home page. */
router.get('/', function(req, res, next) {
    try {
        articleServiceObj.getAll()
        .then( async (result) => {
            res.render('web/index', { 
                title: 'Home Page',
                articles: result 
            });
        } )
        .catch( (ex) => {
            console.log('ex', ex);
        } )
    } catch( ex ) {
        console.log('ex', ex);
    }
});

router.get('/about-us', function(req, res, next) {
    res.render('web/about_us', { title: 'Express' });
});

router.get('/contact-us', function(req, res, next) {
    res.render('web/contact_us', { title: 'Express' });
});

router.get('/all-jobs', (req, res, next) => {
    try {
        articleServiceObj.getAll()
        .then( async (result) => {
            res.render('web/all_jobs', { articles: result });
        } )
        .catch( (ex) => {
            console.log('ex', ex);
        } )
    } catch( ex ) {
        console.log('ex', ex);
    }
});

router.get('/job-details/:slug', (req, res, next) => {
    try {
        articleServiceObj.getBySlug( req.params.slug )
        .then( async (result) => {
            res.render('web/job_details', {
                article: result, moment: moment 
            });
        } )
        .catch( (ex) => {
            console.log('ex', ex);
        } )
    } catch( ex ) {
        console.log('ex', ex);
    }
});

module.exports = router;