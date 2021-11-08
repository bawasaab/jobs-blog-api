var express = require('express');
var router = express.Router();

const authRouter = require('./api/AuthRouter');
const userRouter = require('./api/UsersRouter');
const contactUsRouter = require('./api/ContactUsRouter');
const commentsRouter = require('./api/CommentsRouter');
const articleRouter = require('./api/ArticleRouter');
const DepartmentRouter = require('./api/DepartmentRouter');
const CategoryRouter = require('./api/CategoryRouter');
const OpenRouter = require('./api/OpenRouter');
const NewsletterRouter = require('./api/NewsletterRouter');

const ArticleController = require('../controllers').ArticleController;
const articleControllerObj = new ArticleController();

const FcmController = require('../controllers').FcmController;
const fcmControllerObj = new FcmController();

const AuthController = require('../controllers').AuthController;
const AuthControllerObj = new AuthController();

// var { basePath } = require('../config/config').WEB_ROOT_IMAGE_PATH;

let basePath = 'http://localhost:3000/';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('api/index', { base_path: basePath });
});

router.use( '/auth', authRouter );
router.use( '/open', OpenRouter );
router.use('/newsletter', NewsletterRouter);

router.post( '/fcm', [
  fcmControllerObj.saveDeviceToken
] );

router.post( '/fcm/send', [
  fcmControllerObj.sendNotification
] );

router.post( '/fcm/send-to-topic', [
  fcmControllerObj.sendNotificationToTopic
] );

router.get('/articles/BySlug/:slug', [
  articleControllerObj.getBySlug
]);

router.get('/articles/ByTag/:tag', [
  articleControllerObj.getByTag
]);

router.get('/latest-jobs', [
  articleControllerObj.getLatestJobs
]);

router.get('/upcoming-jobs', [
  articleControllerObj.getUpcomingJobs
]);

router.get('/jobs-closing-soon', [
  articleControllerObj.getUpcomingJobs
]);

/**
 * auth middleware starts
 */
// router.use( AuthControllerObj.verifyToken );
/**
 * auth middleware ends
 */


router.use( '/users', userRouter );
router.use('/contact-us', contactUsRouter);

router.use('/articles/:articleId/comments', commentsRouter);
router.use('/articles', articleRouter);

router.use('/departments/:departmentId/categories', CategoryRouter);
router.use('/departments', DepartmentRouter);

module.exports = router;