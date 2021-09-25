const express = require('express');
const moment = require('moment');
const router = express.Router();

const ArticleService = require('../services').ArticleService;
const articleServiceObj = new ArticleService();

// WEB_BASE_URL
var webBaseUrl = require('../config/config').WEB_BASE_URL;

/* GET home page. */
router.get('/latest-jobs', function(req, res, next) {
    try {
        articleServiceObj.getAll()
        .then( async (result) => {
            console.log('result', result);
            res.render('web/latest_jobs', { 
                articles: result,
                meta_slug: webBaseUrl + 'latest-jobs',
                meta_title: 'Jobsnplacements - Latest Government Jobs | Latest Government Jobs page of the Jobsnplacements',
                meta_keywords: 'Jobsnplacements, All Government jobs, Free SMS Alert, Sarkari naukri, Latest govt Jobs, Sarkari results, Free job alert, Govt jobs Alert, Latest Notifications, Recruitment',
                meta_description: 'Find you Latest Notifications for All Government jobs across India and First Govt jobs forum for all Examination Discussion. Get Free SMS Alert subscription to the New updates of Sarkari naukri, Results, Mock Test and all.',
            });
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
            res.render('web/jobs_closing_soon', {
                articles: result,
                meta_title: 'Jobsnplacements - Jobs Closing Soon | Jobs closing soon page of the Jobsnplacements',
                meta_slug: webBaseUrl + 'jobs-closing-soon',
                meta_keywords: 'Jobsnplacements, All Government jobs, Free SMS Alert, Sarkari naukri, Latest govt Jobs, Sarkari results, Free job alert, Govt jobs Alert, Latest Notifications, Recruitment',
                meta_description: 'Find you Latest Notifications for All Government jobs across India and First Govt jobs forum for all Examination Discussion. Get Free SMS Alert subscription to the New updates of Sarkari naukri, Results, Mock Test and all.',
            });
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
            res.render('web/upcoming_jobs', {
                articles: result,
                meta_slug: webBaseUrl + 'upcoming-jobs',
                meta_title: 'Jobsnplacements - Upcoming Jobs | Upcoming Jobs page of the Jobsnplacements',
                meta_keywords: 'Jobsnplacements, All Government jobs, Free SMS Alert, Sarkari naukri, Latest govt Jobs, Sarkari results, Free job alert, Govt jobs Alert, Latest Notifications, Recruitment',
                meta_description: 'Find you Latest Notifications for All Government jobs across India and First Govt jobs forum for all Examination Discussion. Get Free SMS Alert subscription to the New updates of Sarkari naukri, Results, Mock Test and all.',
            });
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
            res.render('web/join_us_on_whatsapp', {
                articles: result,
                meta_slug: webBaseUrl + 'join-us-on-whatsapp',
                meta_title: 'Jobsnplacements - Join us on Whatsapp | Join us on Whatsapp page of the Jobsnplacements',
                meta_keywords: 'Jobsnplacements, All Government jobs, Free SMS Alert, Sarkari naukri, Latest govt Jobs, Sarkari results, Free job alert, Govt jobs Alert, Latest Notifications, Recruitment',
                meta_description: 'Find you Latest Notifications for All Government jobs across India and First Govt jobs forum for all Examination Discussion. Get Free SMS Alert subscription to the New updates of Sarkari naukri, Results, Mock Test and all.',
            });
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
            res.render('web/join_us_on_telegram', {
                articles: result,
                meta_slug: webBaseUrl + 'join-us-on-telegram',
                meta_title: 'Jobsnplacements - Join us on Telegram | Join us on Telegram page of the Jobsnplacements',
                meta_keywords: 'Jobsnplacements, All Government jobs, Free SMS Alert, Sarkari naukri, Latest govt Jobs, Sarkari results, Free job alert, Govt jobs Alert, Latest Notifications, Recruitment',
                meta_description: 'Find you Latest Notifications for All Government jobs across India and First Govt jobs forum for all Examination Discussion. Get Free SMS Alert subscription to the New updates of Sarkari naukri, Results, Mock Test and all.',
            });
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
            res.render('web/join_us_on_facebook', {
                articles: result,
                meta_slug: webBaseUrl + 'join-us-on-facebook',
                meta_title: 'Jobsnplacements - Join us on Facebook | Join us on Facebook page of the Jobsnplacements',
                meta_keywords: 'Jobsnplacements, All Government jobs, Free SMS Alert, Sarkari naukri, Latest govt Jobs, Sarkari results, Free job alert, Govt jobs Alert, Latest Notifications, Recruitment',
                meta_description: 'Find you Latest Notifications for All Government jobs across India and First Govt jobs forum for all Examination Discussion. Get Free SMS Alert subscription to the New updates of Sarkari naukri, Results, Mock Test and all.',
            });
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
            res.render('web/join_us_on_twitter', {
                articles: result,
                meta_slug: webBaseUrl + 'join-us-on-twitter',
                meta_title: 'Jobsnplacements - Join us on Twitter | Join us on Twitter page of the Jobsnplacements',
                meta_keywords: 'Jobsnplacements, All Government jobs, Free SMS Alert, Sarkari naukri, Latest govt Jobs, Sarkari results, Free job alert, Govt jobs Alert, Latest Notifications, Recruitment',
                meta_description: 'Find you Latest Notifications for All Government jobs across India and First Govt jobs forum for all Examination Discussion. Get Free SMS Alert subscription to the New updates of Sarkari naukri, Results, Mock Test and all.',
            });
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
            res.render('web/join_us_on_linkedin', {
                articles: result,
                meta_slug: webBaseUrl + 'join-us-on-linkedin',
                meta_title: 'Jobsnplacements - Join us on Linkedin | Join us on Linkedin page of the Jobsnplacements',
                meta_keywords: 'Jobsnplacements, All Government jobs, Free SMS Alert, Sarkari naukri, Latest govt Jobs, Sarkari results, Free job alert, Govt jobs Alert, Latest Notifications, Recruitment',
                meta_description: 'Find you Latest Notifications for All Government jobs across India and First Govt jobs forum for all Examination Discussion. Get Free SMS Alert subscription to the New updates of Sarkari naukri, Results, Mock Test and all.',
            });
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
            res.render('web/android_app', {
                articles: result,
                meta_slug: webBaseUrl + 'download-jobsnplacemnents-android-app-from-google-play-store',
                meta_title: 'Jobsnplacements - Download Jobsnplacements Android App | Download Jobsnplacements Android App page of the Jobsnplacements',
                meta_keywords: 'Jobsnplacements, All Government jobs, Free SMS Alert, Sarkari naukri, Latest govt Jobs, Sarkari results, Free job alert, Govt jobs Alert, Latest Notifications, Recruitment',
                meta_description: 'Find you Latest Notifications for All Government jobs across India and First Govt jobs forum for all Examination Discussion. Get Free SMS Alert subscription to the New updates of Sarkari naukri, Results, Mock Test and all.',
            });
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
                articles: result,
                meta_slug: webBaseUrl + 'home',
                meta_title: 'Jobsnplacements - Home Page | Home page of the Jobsnplacements',
                meta_keywords: 'Jobsnplacements, All Government jobs, Free SMS Alert, Sarkari naukri, Latest govt Jobs, Sarkari results, Free job alert, Govt jobs Alert, Latest Notifications, Recruitment',
                meta_description: 'Find you Latest Notifications for All Government jobs across India and First Govt jobs forum for all Examination Discussion. Get Free SMS Alert subscription to the New updates of Sarkari naukri, Results, Mock Test and all.',
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
                articles: result,
                meta_slug: webBaseUrl,
                meta_title: 'Jobsnplacements - Home Page | Home page of the Jobsnplacements',
                meta_keywords: 'Jobsnplacements, All Government jobs, Free SMS Alert, Sarkari naukri, Latest govt Jobs, Sarkari results, Free job alert, Govt jobs Alert, Latest Notifications, Recruitment',
                meta_description: 'Find you Latest Notifications for All Government jobs across India and First Govt jobs forum for all Examination Discussion. Get Free SMS Alert subscription to the New updates of Sarkari naukri, Results, Mock Test and all.',
            });
        } )
        .catch( (ex) => {
            console.log('ex', ex);
        } )
    } catch( ex ) {
        console.log('ex', ex);
    }
});

router.get('/importance-of-government-jobs-in-india', function(req, res, next) {
    res.render('web/importance_of_government_jobs_in_india', {
        meta_slug: webBaseUrl + 'importance-of-government-jobs-in-india',
        meta_title: 'Jobsnplacements - Government Jobs Importance Page | Government Jobs Importance Page of the Jobsnplacements',
        meta_keywords: 'Jobsnplacements, All Government jobs, Free SMS Alert, Sarkari naukri, Latest govt Jobs, Sarkari results, Free job alert, Govt jobs Alert, Latest Notifications, Recruitment',
        meta_description: 'Find you Latest Notifications for All Government jobs across India and First Govt jobs forum for all Examination Discussion. Get Free SMS Alert subscription to the New updates of Sarkari naukri, Results, Mock Test and all.',
    });
});

router.get('/how-to-choose-the-right-government-job-for-you-in-india', function(req, res, next) {
    res.render('web/how_to_choose_the_right_government_job_for_you_in_india', {
        meta_slug: webBaseUrl + 'how-to-choose-the-right-government-job-for-you-in-india',
        meta_title: 'Jobsnplacements - Choose the right government job for you | Choose the right government job Page of the Jobsnplacements',
        meta_keywords: 'Jobsnplacements, All Government jobs, Free SMS Alert, Sarkari naukri, Latest govt Jobs, Sarkari results, Free job alert, Govt jobs Alert, Latest Notifications, Recruitment',
        meta_description: 'Find you Latest Notifications for All Government jobs across India and First Govt jobs forum for all Examination Discussion. Get Free SMS Alert subscription to the New updates of Sarkari naukri, Results, Mock Test and all.',
    });
});

// how_to_choose_the_right_government_job_for_you

router.get('/about-us', function(req, res, next) {
    res.render('web/about_us', {
        meta_slug: webBaseUrl + 'about-us',
        meta_title: 'Jobsnplacements - About Us Page | About Us Page of the Jobsnplacements',
        meta_keywords: 'Jobsnplacements, All Government jobs, Free SMS Alert, Sarkari naukri, Latest govt Jobs, Sarkari results, Free job alert, Govt jobs Alert, Latest Notifications, Recruitment',
        meta_description: 'Find you Latest Notifications for All Government jobs across India and First Govt jobs forum for all Examination Discussion. Get Free SMS Alert subscription to the New updates of Sarkari naukri, Results, Mock Test and all.',
    });
});

router.get('/contact-us', function(req, res, next) {
    res.render('web/contact_us', {
        meta_slug: webBaseUrl + 'contact-us',
        meta_title: 'Jobsnplacements - Contact Us Page | Contact Us Page of the Jobsnplacements',
        meta_keywords: 'Jobsnplacements, All Government jobs, Free SMS Alert, Sarkari naukri, Latest govt Jobs, Sarkari results, Free job alert, Govt jobs Alert, Latest Notifications, Recruitment',
        meta_description: 'Find you Latest Notifications for All Government jobs across India and First Govt jobs forum for all Examination Discussion. Get Free SMS Alert subscription to the New updates of Sarkari naukri, Results, Mock Test and all.',
    });
});

router.get('/frequently-asked-questions-faqs', function(req, res, next) {
    res.render('web/faqs', {
        meta_slug: webBaseUrl + 'frequently-asked-questions-faqs',
        meta_title: 'Jobsnplacements - Frequently asked questions faqs Page | Frequently asked questions faqs Page of the Jobsnplacements',
        meta_keywords: 'Jobsnplacements, All Government jobs, Free SMS Alert, Sarkari naukri, Latest govt Jobs, Sarkari results, Free job alert, Govt jobs Alert, Latest Notifications, Recruitment',
        meta_description: 'Find you Latest Notifications for All Government jobs across India and First Govt jobs forum for all Examination Discussion. Get Free SMS Alert subscription to the New updates of Sarkari naukri, Results, Mock Test and all.',
    });
});

router.get('/disclaimer', function(req, res, next) {
    try {
        res.render('web/disclaimer', {
            meta_slug: webBaseUrl + 'disclaimer',
            meta_title: 'Jobsnplacements - Disclaimer Page | Disclaimer Page of the Jobsnplacements',
            meta_keywords: 'Jobsnplacements, All Government jobs, Free SMS Alert, Sarkari naukri, Latest govt Jobs, Sarkari results, Free job alert, Govt jobs Alert, Latest Notifications, Recruitment',
            meta_description: 'Find you Latest Notifications for All Government jobs across India and First Govt jobs forum for all Examination Discussion. Get Free SMS Alert subscription to the New updates of Sarkari naukri, Results, Mock Test and all.',
        });
    } catch( ex ) {
        console.log('ex', ex);
    }
});

router.get('/privacy-policy', function(req, res, next) {
    try {
        res.render('web/privacy_policy', {
            meta_slug: webBaseUrl + 'privacy-policy',
            meta_title: 'Jobsnplacements - Privacy Policy Page | Privacy Policy Page of the Jobsnplacements',
            meta_keywords: 'Jobsnplacements, All Government jobs, Free SMS Alert, Sarkari naukri, Latest govt Jobs, Sarkari results, Free job alert, Govt jobs Alert, Latest Notifications, Recruitment',
            meta_description: 'Find you Latest Notifications for All Government jobs across India and First Govt jobs forum for all Examination Discussion. Get Free SMS Alert subscription to the New updates of Sarkari naukri, Results, Mock Test and all.',
        });
    } catch( ex ) {
        console.log('ex', ex);
    }
});

router.get('/all-jobs', (req, res, next) => {
    try {
        articleServiceObj.getAll()
        .then( async (result) => {
            res.render('web/all_jobs', {
                articles: result,
                meta_slug: webBaseUrl + 'all-jobs',
                meta_title: 'Jobsnplacements - All Jobs Listing Page | All Jobs Listing Page of the Jobsnplacements',
                meta_keywords: 'Jobsnplacements, All Government jobs, Free SMS Alert, Sarkari naukri, Latest govt Jobs, Sarkari results, Free job alert, Govt jobs Alert, Latest Notifications, Recruitment',
                meta_description: 'Find you Latest Notifications for All Government jobs across India and First Govt jobs forum for all Examination Discussion. Get Free SMS Alert subscription to the New updates of Sarkari naukri, Results, Mock Test and all.',
            });
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
            let keywords = '';
            if( result && result.comments ) {
                let tmp_comments = result.comments.reverse();
                result.comments = tmp_comments;
            }

            if( result && result.tags  ) {
                keywords = result.tags.toString();
            }
            res.render('web/job_details', {
                article: result, 
                moment: moment, 
                meta_title: result.title,
                meta_description: result.short_description,
                meta_keywords: keywords,
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
            res.render('web/all_jobs', { 
                searchStr: !str ? '' : str, 
                articles: result,
                meta_slug: webBaseUrl + '/search/'+ req.params.slug,
                meta_title: 'Jobsnplacements - Search Government Jobs Page | Search Government Jobs Page of the Jobsnplacements',
                meta_keywords: 'Jobsnplacements, All Government jobs, Free SMS Alert, Sarkari naukri, Latest govt Jobs, Sarkari results, Free job alert, Govt jobs Alert, Latest Notifications, Recruitment',
                meta_description: 'Find you Latest Notifications for All Government jobs across India and First Govt jobs forum for all Examination Discussion. Get Free SMS Alert subscription to the New updates of Sarkari naukri, Results, Mock Test and all.',
            });
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
        res.render('web/social_login', {
            meta_slug: webBaseUrl + 'social-login',
            meta_title: 'Jobsnplacements - Login Page | Login Page of the Jobsnplacements',
            meta_keywords: 'Jobsnplacements, All Government jobs, Free SMS Alert, Sarkari naukri, Latest govt Jobs, Sarkari results, Free job alert, Govt jobs Alert, Latest Notifications, Recruitment',
            meta_description: 'Find you Latest Notifications for All Government jobs across India and First Govt jobs forum for all Examination Discussion. Get Free SMS Alert subscription to the New updates of Sarkari naukri, Results, Mock Test and all.',
        });
    } catch( ex ) {
        console.log('ex', ex);
    }
});

app.get('/robots.txt', function (req, res) {
    res.type('text/plain');
    res.send("User-agent: *\nallow: /");
});

module.exports = router;