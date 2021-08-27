const Validator = require('validatorjs');
const { ObjectId } = require('mongodb');
const fs = require('fs');
const path = require('path');

const ResponseService = require('../services').ResponseService;
const responseServiceObj = new ResponseService();

const UserService = require('../services').UserService;
const UserServiceObj = new UserService();

var USER_IMAGE_UPLOAD_PATH = require('../config/config').USER_IMAGE_UPLOAD_PATH;
var userImagePath = require('../config/config').USER_IMAGE_BASE_PATH;

module.exports = class UserController {

    constructor() {}

    insert( req, res, next ) {

        try {

            let in_data = req.body;
            let rules = {
                first_name: 'required',
                email: 'required|email',
                password: 'required|min:6',
                phone: 'required|numeric',
                role: 'required|in:ADMIN,SUB_ADMIN,CUSTOMER',
            };
            let validation = new Validator(in_data, rules);
            if( validation.fails() ) {

                return responseServiceObj.sendException( res, {
                    msg : responseServiceObj.getFirstError( validation )
                } );
            }
            
            UserServiceObj.insert( in_data )
            .then( async (result) => {
                return await responseServiceObj.sendResponse( res, {
                    msg : 'Record inserted successfully',
                    data : {
                        user: result,
                        userImagePath: userImagePath
                    }
                } );
            } )
            .catch( async (ex) => {
                return await responseServiceObj.sendException( res, {
                    msg : ex.toString()
                } );    
            } );
        } catch( ex ) {

            return responseServiceObj.sendException( res, {
                msg : ex.toString()
            } );
        }
    }

    update( req, res, next ) {

        try {

            let in_id = req.params.userId;
            let id = ObjectId( in_id );
            let in_data = req.body;
            let rules = {};

            in_data.hasOwnProperty('first_name') ? rules.first_name = 'required' : '';
            in_data.hasOwnProperty('email') ? rules.email = 'required|email' : '';
            in_data.hasOwnProperty('password') ? rules.password = 'required|min:6' : '';
            in_data.hasOwnProperty('phone') ? rules.phone = 'required|numeric' : '';
            in_data.hasOwnProperty('role') ? rules.role = 'required|in:ADMIN,BLOGGER,VISITOR' : '';
            in_data.hasOwnProperty('status') ? rules.status = 'required' : '';

            let validation = new Validator(in_data, rules);
            if( validation.fails() ) {

                return responseServiceObj.sendException( res, {
                    msg : responseServiceObj.getFirstError( validation )
                } );
            }

            UserServiceObj.update( in_data, id )
            .then( async (result) => {
                return await responseServiceObj.sendResponse( res, {
                    msg : 'Record updated successfully',
                    data : {
                        user: await UserServiceObj.getById( id ),
                        userImagePath: userImagePath
                    }
                } );
            } )
            .catch( async (ex) => {
                return await responseServiceObj.sendException( res, {
                    msg : ex.toString()
                } );    
            } );
            
        } catch( ex ) {

            return responseServiceObj.sendException( res, {
                msg : ex.toString()
            } );
        }
    }

    delete( req, res, next ) {
        try {
            let id = req.params.userId;
            let is_valid = ObjectId.isValid(id);
            if( !is_valid ) {
                throw 'User id not well formed.'
            }
            id = ObjectId( req.params.userId );
            let in_data = {
                status: 'DELETED',
                deletedAt: new Date()
            };
            UserServiceObj.update( in_data, id )
            .then( async (result) => {
                return await responseServiceObj.sendResponse( res, {
                    msg : 'Record deleted successfully'
                } );
            } )
            .catch( async (ex) => {
                return await responseServiceObj.sendException( res, {
                    msg : ex.toString()
                } );
            } );

        } catch(ex) {
            return responseServiceObj.sendException( res, {
                msg : ex.toString()
            } );
        }
    }

    getById( req, res, next ) {
        try {
            let id = req.params.userId;
            let is_valid = ObjectId.isValid(id);
            if( !is_valid ) {
                throw 'User id not well formed.'
            }
            id = ObjectId( id );
            UserServiceObj.getById( id )
            .then( async (result) => {
                return await responseServiceObj.sendResponse( res, {
                    msg : 'Record found',
                    data : {
                        user: result,
                        userImagePath: userImagePath
                    }
                } );
            } )
            .catch( async (ex) => {
                return await responseServiceObj.sendException( res, {
                    msg : ex.toString()
                } );
            } );

        } catch(ex) {
    
            return responseServiceObj.sendException( res, {
                msg : ex.toString()
            } );
        }
    }

    getByEmail( req, res, next ) {
        try {
            let in_data = req.params;
            let email = req.params.email;
            let rules = {
                email: 'required|email'
            };
            let validation = new Validator(in_data, rules);
            if( validation.fails() ) {

                return responseServiceObj.sendException( res, {
                    msg : responseServiceObj.getFirstError( validation )
                } );
            }
            UserServiceObj.getByEmail( email )
            .then( async (result) => {
                return await responseServiceObj.sendResponse( res, {
                    msg : 'Record found',
                    data : {
                        user: result,
                        userImagePath: userImagePath
                    }
                } );
            } )
            .catch( async (ex) => {
                return await responseServiceObj.sendException( res, {
                    msg : ex.toString()
                } );
            } );

        } catch(ex) {
    
            return responseServiceObj.sendException( res, {
                msg : ex.toString()
            } );
        }
    }

    getByPhone( req, res, next ) {
        try {
            let in_data = req.params;
            let phone = req.params.phone;
            let rules = {
                phone: 'required|numeric',
            };
            let validation = new Validator(in_data, rules);
            if( validation.fails() ) {

                return responseServiceObj.sendException( res, {
                    msg : responseServiceObj.getFirstError( validation )
                } );
            }
            UserServiceObj.getByPhone( phone )
            .then( async (result) => {
                return await responseServiceObj.sendResponse( res, {
                    msg : 'Record found',
                    data : {
                        user: result,
                        userImagePath: userImagePath
                    }
                } );
            } )
            .catch( async (ex) => {
                return await responseServiceObj.sendException( res, {
                    msg : ex.toString()
                } );
            } );

        } catch(ex) {
    
            return responseServiceObj.sendException( res, {
                msg : ex.toString()
            } );
        }
    }

    getAll( req, res, next ) {

        try {

            UserServiceObj.getAll()
            .then( async (result) => {
                return await responseServiceObj.sendResponse( res, {
                    msg : 'Record found',
                    data : {
                        user: result,
                        userImagePath: userImagePath
                    }
                } );
            } )
            .catch( async (ex) => {
                return await responseServiceObj.sendException( res, {
                    msg : ex.toString()
                } );
            } );
        } catch( ex ) {
            return responseServiceObj.sendException( res, {
                msg : ex.toString()
            } );
        }
    }

    changeImage( req, res, next ) {
        try {
            let id = req.params.userId;
            let is_valid = ObjectId.isValid(id);
            if( !is_valid ) {
                throw 'User id not well formed.'
            }
            id = ObjectId( id );

            let imageDetails = req.params.imageDetails;
            let in_data = {
                profilePic : imageDetails.fullFileName,
                updatedAt : new Date()
            };
            
            UserServiceObj.update( in_data, id )
            .then( async (result) => {
                return await responseServiceObj.sendResponse( res, {
                    msg : 'Profile pic uploaded successfully',
                    data : {
                        user: await UserServiceObj.getById( id ),
                        userImagePath: userImagePath
                    }
                } );
            } )
            .catch( async (ex) => {
                return await responseServiceObj.sendException( res, {
                    msg : ex.toString()
                } );
            } );

        } catch(ex) {
    
            return responseServiceObj.sendException( res, {
                msg : ex.toString()
            } );
        }
    }

    deleteImage( req, res, next ) {

        try {

            let id = ObjectId( req.params.userId );
            let path = req.params.profilePic;
            UserServiceObj.isIdExists( id )
            .then( async (isExists) => {
                if( !isExists ) {
                    throw 'Invalid user id.'
                }
                return true;
            } )
            .then( async( inResult ) => {

                let file = USER_IMAGE_UPLOAD_PATH +'/'+ path;
                if (!fs.existsSync(file)) {
                    throw 'File not exists.';
                }
                fs.unlinkSync( file );
            } )
            .then( async (inResult) => {
                let in_data = {
                    profilePic: null
                };
                let result = await UserServiceObj.update( in_data, id );
                return await responseServiceObj.sendResponse( res, {
                    msg : 'Image deleted successfully',
                    data: {
                        user: await UserServiceObj.getById(id),
                        userImagePath: userImagePath
                    }
                } );
            } )
            .catch( async (ex) => {
                return await responseServiceObj.sendException( res, {
                    msg : ex.toString()
                } );
            } );
        } catch(ex) {
            return responseServiceObj.sendException( res, {
                msg : ex.toString()
            } );
        }
    }

    isIdExists( req, res, next ) {
        try {
            let id = req.params.userId;
            let is_valid = ObjectId.isValid(id);
            if( !is_valid ) {
                throw 'User id not well formed.'
            }
            id = ObjectId( id );
            UserServiceObj.isIdExists( id )
            .then( async (result) => {
                return await responseServiceObj.sendResponse( res, {
                    msg : result ? 'Record found' : 'Not found',
                    data : {
                        exists: result
                    }
                } );
            } )
            .catch( async (ex) => {
                return await responseServiceObj.sendException( res, {
                    msg : ex.toString()
                } );
            } );

        } catch(ex) {
    
            return responseServiceObj.sendException( res, {
                msg : ex.toString()
            } );
        }
    }

    isEmailExists( req, res, next ) {
        try {
            let email = req.params.email;
            let id = req.params.userId ? req.params.userId : false;
            let in_data = req.params;
            let rules = {
                email: 'required|email'
            };
            let validation = new Validator(in_data, rules);
            if( validation.fails() ) {

                return responseServiceObj.sendException( res, {
                    msg : responseServiceObj.getFirstError( validation )
                } );
            }
            UserServiceObj.isEmailExists( email, id )
            .then( async (result) => {
                return await responseServiceObj.sendResponse( res, {
                    msg : result ? 'Record found' : 'Not found',
                    data : {
                        exists: result
                    }
                } );
            } )
            .catch( async (ex) => {
                return await responseServiceObj.sendException( res, {
                    msg : ex.toString()
                } );
            } );

        } catch(ex) {
    
            return responseServiceObj.sendException( res, {
                msg : ex.toString()
            } );
        }
    }

    isPhoneExists( req, res, next ) {
        try {
            let phone = req.params.phone;
            let id = req.params.userId ? req.params.userId : false;
            let in_data = req.params;
            let rules = {
                phone: 'required|numeric',
            };
            let validation = new Validator(in_data, rules);
            if( validation.fails() ) {

                return responseServiceObj.sendException( res, {
                    msg : responseServiceObj.getFirstError( validation )
                } );
            }
            UserServiceObj.isPhoneExists( phone, id )
            .then( async (result) => {
                return await responseServiceObj.sendResponse( res, {
                    msg : result ? 'Record found' : 'Not found',
                    data : {
                        exists: result
                    }
                } );
            } )
            .catch( async (ex) => {
                return await responseServiceObj.sendException( res, {
                    msg : ex.toString()
                } );
            } );

        } catch(ex) {
    
            return responseServiceObj.sendException( res, {
                msg : ex.toString()
            } );
        }
    }
}