const express = require('express');
const router = express.Router({
    mergeParams: true
});

const ValidateIdsMiddlewares = require('../middlewares').ValidateIdsMiddlewares;
const validateIdsMiddlewaresObj = new ValidateIdsMiddlewares();

const CategoryController = new require('../controllers').CategoryController;
const CategoryControllerObj = new CategoryController();

let CATEGORY_IMAGE_UPLOAD_PATH = require('../config/config').CATEGORY_IMAGE_UPLOAD_PATH;
/**
 * IMAGE UPLOAD STARTS
 */
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, CATEGORY_IMAGE_UPLOAD_PATH)
    },
    filename: function (req, file, cb) {
        let id = req.params.categoryId;
        let originalname = file.originalname;
        let newFileName = id;
        let extention = path.extname(originalname);
        let fullFileName = newFileName + extention;
        let fullFileNameWithPath = CATEGORY_IMAGE_UPLOAD_PATH + '/' + fullFileName;
        req.params.imageDetails = {
            fileOriginalname: originalname,
            newFileName: newFileName,
            fileExtention: extention,
            fullFileName: fullFileName,
            fullFileNameWithPath: fullFileNameWithPath
        };
        cb(null, fullFileName);
    }
});

router.use( validateIdsMiddlewaresObj.departmentId );

const upload = multer({storage: storage, limits: {fileSize: 1000000 * 10}});
let cpUpload = upload.fields([{name: 'image', maxCount: 1}]);

router.get('/exists/:title/:categoryId?', [
    CategoryControllerObj.exists
]);

router.get('/', [
    CategoryControllerObj.get
]);

router.post('/', [
    CategoryControllerObj.insert
]);

router.get('/:categoryId', [
    validateIdsMiddlewaresObj.categoryId,
    CategoryControllerObj.getById
]);

router.patch('/:categoryId', [
    validateIdsMiddlewaresObj.categoryId,
    CategoryControllerObj.update
]);

router.delete('/:categoryId', [
    validateIdsMiddlewaresObj.categoryId,
    CategoryControllerObj.delete
]);

//router.delete(':departmentId/categories/:categoryId/delete-image/:image', [CategoryControllerObj.deleteImage]);
//router.post(':departmentId/categories/:categoryId/image', cpUpload, [CategoryControllerObj.uploadImage]);

module.exports = router;