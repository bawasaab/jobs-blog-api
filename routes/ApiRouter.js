var express = require('express');
var router = express.Router();

const authRouter = require('./api/AuthRouter');
const userRouter = require('./api/UsersRouter');
const contactUsRouter = require('./api/ContactUsRouter');
const commentsRouter = require('./api/CommentsRouter');
const articleRouter = require('./api/ArticleRouter');
const DepartmentRouter = require('./api/DepartmentRouter');
const CategoryRouter = require('./api/CategoryRouter');

const AuthController = require('../controllers').AuthController;
const AuthControllerObj = new AuthController();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use( '/auth', authRouter );

/**
 * auth middleware starts
 */
router.use( AuthControllerObj.verifyToken );
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