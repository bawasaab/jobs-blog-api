const express = require('express');
const router = express.Router();

const ArticleController = require('../controllers').ArticleController;
const articleControllerObj = new ArticleController();

<<<<<<< Updated upstream
const commentsRouter = require('./CommentsRouter');
=======
var articleImagePath = require('../config/config').ARTICLE_IMAGE_UPLOAD_PATH;
>>>>>>> Stashed changes

/**
 * IMAGE UPLOAD STARTS
 */
const path = require('path');
const multer  = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, articleImagePath)
  },
  filename: function (req, file, cb) {
    
    let id = req.params.id;
    let originalname = file.originalname;
    let newFileName = id;
    let extention = path.extname(originalname);
    let fullFileName = newFileName + extention;
    let fullFileNameWithPath = articleImagePath +'/'+ fullFileName;
    req.params.imageDetails = {
      fileOriginalname : originalname,
      newFileName : newFileName,
      fileExtention : extention,
      fullFileName : fullFileName,
      fullFileNameWithPath : fullFileNameWithPath
    };
    cb(null , fullFileName );
  }
});

const upload = multer({
  storage: storage,
  limits : {fileSize : 1000000} // (1000000 bytes = 1MB)
});
/**
 * IMAGE UPLOAD ENDS
 */

/**
 * USER ROUTING STARTS
 */

<<<<<<< Updated upstream
router.get('/user/:userId', [
=======
 router.post('/:articleId/image', upload.single('image_file'), [
    // validateIdsMiddlewaresObj.articleId,
    articleControllerObj.changeImage
]);

// router.delete('/:articleId/image/:profilePic', [
//     validateIdsMiddlewaresObj.userId,
//     articleControllerObj.deleteImage
// ]);

router.get('/ByUser/:userId', [
    validateIdsMiddlewaresObj.userId,
>>>>>>> Stashed changes
    articleControllerObj.getAllByUser
]);

router.get('/:articleId/idExists', [
    articleControllerObj.isIdExists
]);

router.patch('/:articleId', upload.single('image_file'), [
  articleControllerObj.update
]);

router.delete('/:articleId', [
  articleControllerObj.delete
]);

router.get('/:articleId', [
  articleControllerObj.getById
]);

router.post('/', upload.single('image_file'), [
  articleControllerObj.insert
]);

router.get('/', [
  articleControllerObj.getAll
]);
/**
 * USER ROUTING ENDS
 */

module.exports = router;