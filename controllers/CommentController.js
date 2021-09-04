Validator = require('validatorjs');
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

            let in_data = req.body;
            let rules = {
                // parent_id: 'required',
                // article_id: 'required',
                name: 'required|min:3',
                email: 'required|email',
                comment: 'required'
            };
            let validation = new Validator(in_data, rules);
            if( validation.fails() ) {

                return responseServiceObj.sendException( res, {
                    msg : responseServiceObj.getFirstError( validation )
                } );
            }

            if( TokenServiceObj.isSessionSet(req) ) {

                in_data.user_id = TokenServiceObj.getUserId( req );
            } else {
                in_data.user_id = null;
            }
            in_data.article_id = req.params.articleId;
            CommentServiceObj.insert( in_data )
            .then( async (result) => {
                return await responseServiceObj.sendResponse( res, {
                    msg : 'Comment saved successfully',
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

            let in_id = req.params.commentId;
            let in_data = req.body;
            let rules = {
                comment: 'required',
                status: 'required|in:OPEN,CLOSE'
            };
            let validation = new Validator(in_data, rules);
            if( validation.fails() ) {

                return responseServiceObj.sendException( res, {
                    msg : responseServiceObj.getFirstError( validation )
                } );
            }

            in_data.article_id = req.params.articleId;
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
            let id = req.params.commentId;
            let in_data = {
                article_id: req.params.articleId,
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
            let id = req.params.commentId;
            let article_id = req.params.articleId;
            let in_data = {
                comment_id: id,
                article_id: article_id
            };
            CommentServiceObj.getById( in_data )
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

            let article_id = req.params.articleId;
            CommentServiceObj.getAll( in_data )
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
            let comment_id = req.params.commentId;
            let article_id = req.params.articleId;
            let in_data = {
                comment_id: comment_id,
                article_id: article_id
            };
            CommentServiceObj.isIdExists( in_data )
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