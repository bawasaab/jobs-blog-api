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

const AuthController = require('../controllers').AuthController;
const AuthControllerObj = new AuthController();

var { basePath } = require('../config/config').WEB_ROOT_IMAGE_PATH;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('api/index', { base_path: basePath });
});

router.use( '/auth', authRouter );
router.use( '/open', OpenRouter );

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