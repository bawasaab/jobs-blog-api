const express = require('express');
const router = express.Router({
    mergeParams: true
});

const ValidateIdsMiddlewares = require('../middlewares').ValidateIdsMiddlewares;
const validateIdsMiddlewaresObj = new ValidateIdsMiddlewares();

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
    
    let id = req.params.commentId;
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

router.use( validateIdsMiddlewaresObj.articleId );

router.get('/:commentId/idExists', [
    validateIdsMiddlewaresObj.commentId,
    CommentControllerObj.isIdExists
]);

router.patch('/:commentId', [
    validateIdsMiddlewaresObj.commentId,
    CommentControllerObj.update
]);

router.delete('/:commentId', [
    validateIdsMiddlewaresObj.commentId,
    CommentControllerObj.delete
]);

router.get('/:commentId', [
    validateIdsMiddlewaresObj.commentId,
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