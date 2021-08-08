const express = require('express');
const router = express.Router({
    mergeParams: true
});

const ValidateIdsMiddlewares = require('../middlewares').ValidateIdsMiddlewares;
const validateIdsMiddlewaresObj = new ValidateIdsMiddlewares();

const ArticleController = require('../controllers').ArticleController;
const articleControllerObj = new ArticleController();

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
    
    let id = req.params.articleId;
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

//  router.post('/:articleId/image', [
//     validateIdsMiddlewaresObj.articleId,
//     articleControllerObj.changeImage
// ]);

// router.delete('/:articleId/image/:profilePic', [
//     validateIdsMiddlewaresObj.userId,
//     articleControllerObj.deleteImage
// ]);

router.get('/ByUser/:userId', [
    validateIdsMiddlewaresObj.userId,
    articleControllerObj.getAllByUser
]);

router.get('/:articleId/idExists', [
    validateIdsMiddlewaresObj.articleId,
    articleControllerObj.isIdExists
]);

router.patch('/:articleId', [
    validateIdsMiddlewaresObj.articleId,
    articleControllerObj.update
]);

router.delete('/:articleId', [
    validateIdsMiddlewaresObj.articleId,
    articleControllerObj.delete
]);

router.get('/:articleId', [
    validateIdsMiddlewaresObj.articleId,
    articleControllerObj.getById
]);

router.post('/', [
    articleControllerObj.insert
]);

router.get('/', [
    articleControllerObj.getAll
]);
/**
 * USER ROUTING ENDS
 */

module.exports = router;