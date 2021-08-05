const express = require('express');
const router = express.Router();

const ArticleController = require('../controllers').ArticleController;
const articleControllerObj = new ArticleController();

const commentsRouter = require('./CommentsRouter');

/**
 * IMAGE UPLOAD STARTS
 */
const path = require('path');
const multer  = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, userImagePath)
  },
  filename: function (req, file, cb) {
    
    let id = req.params.id;
    let originalname = file.originalname;
    let newFileName = id;
    let extention = path.extname(originalname);
    let fullFileName = newFileName + extention;
    let fullFileNameWithPath = userImagePath +'/'+ fullFileName;
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

router.get('/user/:userId', [
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