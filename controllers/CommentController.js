 Validator = require('validatorjs');
const { ObjectId } = require('mongodb');
const fs = require('fs');
const path = require('path');

const ResponseService = require('../services').ResponseService;
const responseServiceObj = new ResponseService();

const CommentService = require('../services').CommentService;
const CommentServiceObj = new CommentService();

const TokenService = require('../services').TokenService;
const TokenServiceObj = new TokenService();

module.exports = class CommentController {

    constructor() {}

    insert( req, res, next ) {

        try {

            let user_id = TokenServiceObj.getUserId( req );
            let in_data = req.body;
            let rules = {
                // parent_id: 'required',
                article_id: 'required',
                comment: 'required'
            };
            in_data.user_id = user_id;
            let validation = new Validator(in_data, rules);
            if( validation.fails() ) {

                return responseServiceObj.sendException( res, {
                    msg : responseServiceObj.getFirstError( validation )
                } );
            }
            console.log('in_data', in_data);
            CommentServiceObj.insert( in_data )
            .then( async (result) => {
                return await responseServiceObj.sendResponse( res, {
                    msg : 'Record inserted successfully',
                    data : {
                        comment: result
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

            let user_id = TokenServiceObj.getUserId( req );
            let in_id = req.params.id;
            let is_valid = ObjectId.isValid(in_id);
            if( !is_valid ) {
                throw 'Comment id not well formed.'
            }
            in_id = ObjectId( in_id );
            let in_data = req.body;
            let rules = {
                // parent_id: 'required',
                article_id: 'required',
                comment: 'required',
                status: 'required|in:OPEN,CLOSE'
            };
            let validation = new Validator(in_data, rules);
            if( validation.fails() ) {

                return responseServiceObj.sendException( res, {
                    msg : responseServiceObj.getFirstError( validation )
                } );
            }
                        
            CommentServiceObj.update( in_data, in_id )
            .then( async (result) => {
                return await responseServiceObj.sendResponse( res, {
                    msg : 'Record updated successfully',
                    data : {
                        comment: await CommentServiceObj.getById( in_id )
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
                throw 'Comment id not well formed.'
            }
            id = ObjectId( req.params.id );
            let in_data = {
                status: 'DELETED',
                deletedAt: new Date()
            };
            CommentServiceObj.update( in_data, id )
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
                throw 'Comment id not well formed.'
            }
            id = ObjectId( id );
            CommentServiceObj.getById( id )
            .then( async (result) => {
                return await responseServiceObj.sendResponse( res, {
                    msg : 'Record found',
                    data : {
                        comment: result
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

            CommentServiceObj.getAll()
            .then( async (result) => {
                return await responseServiceObj.sendResponse( res, {
                    msg : 'Record found',
                    data : {
                        comment: result
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

    getByArticle( req, res, next ) {

        try {

            let in_articleId = req.params.articleId;
            let is_valid = ObjectId.isValid(in_articleId);
            if( !is_valid ) {
                throw 'Article id not well formed.'
            }
            in_articleId = ObjectId( in_articleId );
            CommentServiceObj.getByArticleId( in_articleId )
            .then( async (result) => {
                return await responseServiceObj.sendResponse( res, {
                    msg : 'Record found',
                    data : {
                        comment: result
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

    isIdExists( req, res, next ) {
        try {
            let id = req.params.id;
            let is_valid = ObjectId.isValid(id);
            if( !is_valid ) {
                throw 'User id not well formed.'
            }
            id = ObjectId( id );
            CommentServiceObj.isIdExists( id )
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