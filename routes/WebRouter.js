const express = require('express');
const moment = require('moment');
const router = express.Router();

const ArticleService = require('../services').ArticleService;
const articleServiceObj = new ArticleService();

/* GET home page. */
router.get('/latest-jobs', function(req, res, next) {
    try {
        articleServiceObj.getAll()
        .then( async (result) => {
            res.render('web/latest_jobs', { articles: result });
        } )
        .catch( (ex) => {
            console.log('ex', ex);
        } )
    } catch( ex ) {
        console.log('ex', ex);
    }
});

router.get('/jobs-closing-soon', function(req, res, next) {
    try {
        articleServiceObj.getAll()
        .then( async (result) => {
            res.render('web/jobs_closing_soon', { articles: result });
        } )
        .catch( (ex) => {
            console.log('ex', ex);
        } )
    } catch( ex ) {
        console.log('ex', ex);
    }
});

router.get('/upcoming-jobs', function(req, res, next) {
    try {
        articleServiceObj.getAll()
        .then( async (result) => {
            res.render('web/upcoming_jobs', { articles: result });
        } )
        .catch( (ex) => {
            console.log('ex', ex);
        } )
    } catch( ex ) {
        console.log('ex', ex);
    }
});

router.get('/join-us-on-whatsapp', function(req, res, next) {
    try {
        articleServiceObj.getAll()
        .then( async (result) => {
            res.render('web/join_us_on_whatsapp', { articles: result });
        } )
        .catch( (ex) => {
            console.log('ex', ex);
        } )
    } catch( ex ) {
        console.log('ex', ex);
    }
});

router.get('/join-us-on-telegram', function(req, res, next) {
    try {
        articleServiceObj.getAll()
        .then( async (result) => {
            res.render('web/join_us_on_telegram', { articles: result });
        } )
        .catch( (ex) => {
            console.log('ex', ex);
        } )
    } catch( ex ) {
        console.log('ex', ex);
    }
});

router.get('/join-us-on-facebook', function(req, res, next) {
    try {
        articleServiceObj.getAll()
        .then( async (result) => {
            res.render('web/join_us_on_facebook', { articles: result });
        } )
        .catch( (ex) => {
            console.log('ex', ex);
        } )
    } catch( ex ) {
        console.log('ex', ex);
    }
});

router.get('/join-us-on-twitter', function(req, res, next) {
    try {
        articleServiceObj.getAll()
        .then( async (result) => {
            res.render('web/join_us_on_twitter', { articles: result });
        } )
        .catch( (ex) => {
            console.log('ex', ex);
        } )
    } catch( ex ) {
        console.log('ex', ex);
    }
});

router.get('/join-us-on-linkedin', function(req, res, next) {
    try {
        articleServiceObj.getAll()
        .then( async (result) => {
            res.render('web/join_us_on_linkedin', { articles: result });
        } )
        .catch( (ex) => {
            console.log('ex', ex);
        } )
    } catch( ex ) {
        console.log('ex', ex);
    }
});

router.get('/download-jobsnplacemnents-android-app-from-google-play-store', function(req, res, next) {
    try {
        articleServiceObj.getAll()
        .then( async (result) => {
            res.render('web/android_app', { articles: result });
        } )
        .catch( (ex) => {
            console.log('ex', ex);
        } )
    } catch( ex ) {
        console.log('ex', ex);
    }
});

router.get('/home', function(req, res, next) {
    try {
        articleServiceObj.getAll()
        .then( async (result) => {
            res.render('web/index', { 
                title: 'PUNJAB POLICE RECRUITMENT 2021',
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

router.get('/', function(req, res, next) {
    try {
        articleServiceObj.getAll()
        .then( async (result) => {
            res.render('web/index', { 
                title: 'PUNJAB POLICE RECRUITMENT 2021',
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

router.get('/disclaimer', function(req, res, next) {
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

router.get('/privacy-policy', function(req, res, next) {
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

router.get('/:slug/job-details', (req, res, next) => {
    try {
        articleServiceObj.getBySlug( req.params.slug )
        .then( async (result) => {
            if( result && result.comments ) {
                let tmp_comments = result.comments.reverse();
                result.comments = tmp_comments;
            }
            res.render('web/job_details', {
                article: result, 
                moment: moment, 
                meta_title: result.title,
                meta_description: result.short_description,
                meta_slug: 'https://www.jobsnplacements.com/'+ result.slug +'/job-details',
                author_details: result.author_details.first_name +' '+ result.author_details.last_name
            });
        } )
        .catch( (ex) => {
            console.log('ex', ex);
        } )
    } catch( ex ) {
        console.log('ex', ex);
    }
});

router.get('/search/:slug?', (req, res, next) => {
    try {
        let str = !req.params.slug ? undefined : req.params.slug.split('-').join(' ').toLowerCase();

        articleServiceObj.search( str )
        .then( async (result) => {
            res.render('web/all_jobs', { searchStr: !str ? '' : str, articles: result });
        } )
        .catch( (ex) => {
            console.log('ex', ex);
        } )
    } catch( ex ) {
        console.log('ex', ex);
    }
});

router.get('/social-login', (req, res, next) => {
    try {
        res.render('web/social_login', {});
    } catch( ex ) {
        console.log('ex', ex);
    }
});

module.exports = router;