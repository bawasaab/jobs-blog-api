const express = require('express');
const router = express.Router();

const UsersController = require('../controllers').UserController;
const UserControllerObj = new UsersController();

var userImagePath = require('../config/config').USER_IMAGE_UPLOAD_PATH;
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
router.get('/byEmail/:email', [
    UserControllerObj.getByEmail
]);

router.get('/byPhone/:phone', [
    UserControllerObj.getByPhone
]);

router.get('/:userId/idExists', [
    UserControllerObj.isIdExists
]);

router.get('/emailExists/:email', [
    UserControllerObj.isEmailExists
]);

router.get('/phoneExists/:phone', [
    UserControllerObj.isPhoneExists
]);

router.post('/:userId/image', upload.single('image_file'), [
  UserControllerObj.changeImage
]);

router.delete('/:userId/image/:profilePic', [
    UserControllerObj.deleteImage
]);

router.patch('/:userId', [
  UserControllerObj.update
]);

router.delete('/:userId', [
  UserControllerObj.delete
]);

router.get('/:userId', [
  UserControllerObj.getById
]);

router.post('/', [
  UserControllerObj.insert
]);

router.get('/', [
  UserControllerObj.getAll
]);
/**
 * USER ROUTING ENDS
 */

module.exports = router;