const express = require('express');
const router = express.Router();

const CommentController = require('../controllers').CommentController;
const CommentControllerObj = new CommentController();

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
router.get('/byArticle/:articleId', [
    CommentControllerObj.getByArticle
]);

router.get('/:id/idExists', [
    CommentControllerObj.isIdExists
]);

router.patch('/:id', [
  CommentControllerObj.update
]);

router.delete('/:id', [
  CommentControllerObj.delete
]);

router.get('/:id', [
  CommentControllerObj.getById
]);

router.post('/', [
  CommentControllerObj.insert
]);

router.get('/', [
  CommentControllerObj.getAll
]);
/**
 * USER ROUTING ENDS
 */

module.exports = router;