 Validator = require('validatorjs');
const { ObjectId } = require('mongodb');
const fs = require('fs');
const path = require('path');

const ResponseService = require('../services').ResponseService;
const responseServiceObj = new ResponseService();

const ArticleService = require('../services').ArticleService;
const articleServiceObj = new ArticleService();

const TokenService = require('../services').TokenService;
const TokenServiceObj = new TokenService();

module.exports = class ArticleController {

    constructor() {}

    insert( req, res, next ) {

        try {

            let user_id = TokenServiceObj.getUserId( req );
            console.log('after user_id');
            console.log('user_id', user_id);
            let in_data = req.body;
            let rules = {
                title: 'required',
                slug: 'required',
                short_description: 'required',
                // description: 'required'
            };
            let validation = new Validator(in_data, rules);
            if( validation.fails() ) {

                return responseServiceObj.sendException( res, {
                    msg : responseServiceObj.getFirstError( validation )
                } );
            }
            
            in_data.user_id = user_id;
            in_data.author_details = TokenServiceObj.getAuthor(req);
            console.log('in_data', in_data);
            articleServiceObj.insert( in_data )
            .then( async (result) => {
                return await responseServiceObj.sendResponse( res, {
                    msg : 'Record inserted successfully',
                    data : {
                        article: result
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
            let in_id = req.params.articleId;
            let is_valid = ObjectId.isValid(in_id);
            if( !is_valid ) {
                throw 'Article id not well formed.'
            }
            in_id = ObjectId( in_id );
            let in_data = req.body;
            let rules = {};
            req.body.title ? rules.title = 'required' : '';
            req.body.slug ? rules.slug = 'required' : '';
            req.body.short_description ? rules.short_description = 'required' : '';
            req.body.description ? rules.description = 'required' : '';
            req.body.meta ? rules.meta = 'required' : '';
            req.body.tags ? rules.tags = 'required' : '';

            let validation = new Validator(in_data, rules);
            if( validation.fails() ) {

                return responseServiceObj.sendException( res, {
                    msg : responseServiceObj.getFirstError( validation )
                } );
            }
            
            in_data.user_id = user_id;
            articleServiceObj.update( in_data, in_id )
            .then( async (result) => {
                return await responseServiceObj.sendResponse( res, {
                    msg : 'Record updated successfully',
                    data : {
                        article: await articleServiceObj.getById( in_id )
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
            let id = req.params.articleId;
            let is_valid = ObjectId.isValid(id);
            if( !is_valid ) {
                throw 'Article id not well formed.'
            }
            id = ObjectId( req.params.articleId );
            let in_data = {
                status: 'DELETED',
                deletedAt: new Date()
            };
            articleServiceObj.update( in_data, id )
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
            let id = req.params.articleId;
            let is_valid = ObjectId.isValid(id);
            if( !is_valid ) {
                throw 'Article id not well formed.'
            }
            id = ObjectId( id );
            articleServiceObj.getById( id )
            .then( async (result) => {
                return await responseServiceObj.sendResponse( res, {
                    msg : 'Record found',
                    data : {
                        article: result
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

            articleServiceObj.getAll()
            .then( async (result) => {
                return await responseServiceObj.sendResponse( res, {
                    msg : 'Record found',
                    data : {
                        article: result
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

    getAllByUser( req, res, next ) {

        try {

            let userId = req.params.userId;
            let is_valid = ObjectId.isValid(userId);
            if( !is_valid ) {
                throw 'User id not well formed.'
            }
            userId = ObjectId( userId );

            articleServiceObj.getAllByUser(userId)
            .then( async (result) => {
                return await responseServiceObj.sendResponse( res, {
                    msg : 'Record found',
                    data : {
                        article: result
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
            let id = req.params.articleId;
            let is_valid = ObjectId.isValid(id);
            if( !is_valid ) {
                throw 'Article id not well formed.'
            }
            id = ObjectId( id );
            articleServiceObj.isIdExists( id )
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

    isSlugExists( req, res, next ) {
        try {
            let slug = req.params.articleSlug;
            let articleId = req.params?.articleId ? req.params.articleId : false;

            if( articleId ) {

                let is_valid = ObjectId.isValid(articleId);
                if( !is_valid ) {
                    throw 'Article id not well formed.'
                }
                articleId = ObjectId( articleId );
            }

            let rules = {
                slug: 'required'
            };
            let in_data = {
                slug: slug
            };
            let validation = new Validator(in_data, rules);
            if( validation.fails() ) {

                return responseServiceObj.sendException( res, {
                    msg : responseServiceObj.getFirstError( validation )
                } );
            }

            articleServiceObj.isSlugExists( slug, articleId )
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