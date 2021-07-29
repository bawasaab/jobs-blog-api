const Validator = require('validatorjs');
const { ObjectId } = require('mongodb');

const ResponseService = require('../services').ResponseService;
const responseServiceObj = new ResponseService();

const UserService = require('../services').UserService;
const UserServiceObj = new UserService();

var userImagePath = require('../config/config').userImageBasePath;

module.exports = class UserController {

    constructor() {}

    insert( req, res, next ) {

        try {

            let in_data = req.body;
            let rules = {
                first_name: 'required',
                email: 'required|email',
                password: 'required|min:6',
                phone: 'required|min:10',
                role: 'required|in:ADMIN,SUB_ADMIN,CUSTOMER',
            };
            let validation = new Validator(in_data, rules);
            if( validation.fails() ) {

                return responseServiceObj.sendException( res, {
                    msg : responseServiceObj.getFirstError( validation )
                } );
            }
            
            UserServiceObj.insert( in_data )
            .then( async () => {
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
                phone: 'required|min:10',
                role: 'required|in:ADMIN,SUB_ADMIN,CUSTOMER'
            };
            let validation = new Validator(in_data, rules);
            if( validation.fails() ) {

                return responseServiceObj.sendException( res, {
                    msg : responseServiceObj.getFirstError( validation )
                } );
            }
                        
            UserServiceObj.update( in_data, id )
            .then( (result) => {
                return await responseServiceObj.sendResponse( res, {
                    msg : 'Record updated successfully',
                    data : {
                        user: await UserServiceObj.getUserById( id ),
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
            let id = ObjectId( req.params.id );
            let in_data = {
                status: 'DELETED'
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
            UserServiceObj.getUserById( id )
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
    
            return await responseServiceObj.sendException( res, {
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
    
            return await responseServiceObj.sendException( res, {
                msg : ex.toString()
            } );
        }
    }

    getByPhone( req, res, next ) {
        try {
            let in_data = req.params;
            let phone = req.params.phone;
            let rules = {
                phone: 'required|min:10'
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
    
            return await responseServiceObj.sendException( res, {
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
            .then( (result) => {
                return await responseServiceObj.sendResponse( res, {
                    msg : 'Profile pic uploaded successfully',
                    data : {
                        user: await UserServiceObj.getUserById( id ),
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
            let is_valid = ObjectId.isValid(id);
            if( !is_valid ) {
                throw 'User id not well formed.'
            }
            id = ObjectId( id );

            UserServiceObj.update( in_data, id )
            .then( (result) => {
                return await responseServiceObj.sendResponse( res, {
                    msg : 'Profile pic uploaded successfully',
                    data : {
                        user: await UserServiceObj.getUserById( id ),
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

    isIdExists( req, res, next ) {}

    isEmailExists( req, res, next ) {}

    isPhoneExists( req, res, next ) {}
}