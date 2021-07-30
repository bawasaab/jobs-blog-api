const Validator = require('validatorjs');
const { ObjectId } = require('mongodb');
const fs = require('fs');
const path = require('path');

const ResponseService = require('../services').ResponseService;
const responseServiceObj = new ResponseService();

const UserService = require('../services').UserService;
const UserServiceObj = new UserService();

var userImagePath = require('../config/config').userImageBasePath;
var userImageActualPath = require('../config/config').userImageActualPath;

module.exports = class UserController {

    constructor() {}

    insert( req, res, next ) {

        try {

            let in_data = req.body;
            let rules = {
                first_name: 'required',
                email: 'required|email',
                password: 'required|min:6',
                phone: 'required|numeric|min:10',
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

            let in_id = req.params.id;
            let id = ObjectId( in_id );
            let in_data = req.body;
            let rules = {
                first_name: 'required',
                email: 'required|email',
                password: 'required|min:6',
                phone: 'required|numeric|min:10',
                role: 'required|in:ADMIN,SUB_ADMIN,CUSTOMER',
                status: 'required|in:PENDING,ACTIVE,BLOCK,DELETED',
            };
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
            let id = req.params.id;
            let is_valid = ObjectId.isValid(id);
            if( !is_valid ) {
                throw 'User id not well formed.'
            }
            id = ObjectId( req.params.id );
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
            let id = req.params.id;
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
            UserServiceObj.getUserByEmail( email )
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
                phone: 'required|numeric|min:10',
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
            let id = req.params.id;
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
            let id = req.params.id;
            let profilePic = req.body.profilePic;
            let is_valid = ObjectId.isValid(id);
            if( !is_valid ) {
                throw 'User id not well formed.'
            }
            id = ObjectId( id );
            profilePic = `${userImageActualPath}/${profilePic}`;
            console.log('profilePic', profilePic);

            let in_data = {
                profilePic : '',
                updatedAt : new Date()
            };

            fs.stat( profilePic, function(exists) { 
                if (exists) {
                    console.log('image exists');

                    fs.unlink( profilePic, async (err) => {
                        if (err) {
                            return await responseServiceObj.sendException( res, {
                                msg : err.toString()
                            } );
                        }
        
                        let result = await UserServiceObj.update( in_data, id );
                        return await responseServiceObj.sendResponse( res, {
                            msg : 'Profile pic deleted successfully',
                            data : {
                                user: await UserServiceObj.getById( id )
                            }
                        } );
                    });
                } else {
                    return responseServiceObj.sendException( res, {
                        msg : 'Image not exists'
                    } );
                }
            }); 
        } catch(ex) {
    
            return responseServiceObj.sendException( res, {
                msg : ex.toString()
            } );
        }
    }

    isIdExists( req, res, next ) {
        try {
            let id = req.params.id;
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
            let id = req.params.id ? req.params.id : false;
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
            let id = req.params.id ? req.params.id : false;
            let in_data = req.params;
            let rules = {
                phone: 'required|numeric|min:10',
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