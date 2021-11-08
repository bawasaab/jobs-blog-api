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

            // let user_id = TokenServiceObj.getUserId( req );
            let user_id = '6129359c73255433d6544126';
            let in_data = req.body;
            let rules = {
                title: 'required',
                slug: 'required',
                short_description: 'required',
                scheduled_for: 'required|date'
                // description: 'required'
            };
            let validation = new Validator(in_data, rules);
            if( validation.fails() ) {

                return responseServiceObj.sendException( res, {
                    msg : responseServiceObj.getFirstError( validation )
                } );
            }
            
            // in_data.user_id = user_id;
            in_data.user_id = '6129359c73255433d6544126';
            // in_data.author_details = TokenServiceObj.getAuthor(req);
            in_data.author_details = {
                last_name: "Tyagi",
                profilePic: null,
                email: "deepak4bawa@yopmail.com",
                gender: "MALE",
                first_name: "Abhishek"
            };
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

            // let user_id = TokenServiceObj.getUserId( req );
            let user_id = '6129359c73255433d6544126';
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
            req.body.externalLinks ? rules.externalLinks = 'required' : '';

            let validation = new Validator(in_data, rules);
            if( validation.fails() ) {

                return responseServiceObj.sendException( res, {
                    msg : responseServiceObj.getFirstError( validation )
                } );
            }
            
            if( req.body.externalLinks ) {
                let arr = [];
                req.body.externalLinks.forEach(element => {
                    let obj = {
                        article_id: in_id,
                        link: element.link,
                        text: element.text
                    };

                    arr.push(obj);
                });
                in_data.externalLinks = arr;
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

    getBySlug( req, res, next ) {
        try {
            let in_data = req.params;
            let rules = {
                slug: 'required'
            };
            let validation = new Validator(in_data, rules);
            if( validation.fails() ) {

                return responseServiceObj.sendException( res, {
                    msg : responseServiceObj.getFirstError( validation )
                } );
            }

            let slug = in_data.slug;
            articleServiceObj.getBySlug( slug )
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

    getByTag( req, res, next ) {
        try {
            let in_data = req.params;
            let rules = {
                tag: 'required'
            };
            let validation = new Validator(in_data, rules);
            if( validation.fails() ) {

                return responseServiceObj.sendException( res, {
                    msg : responseServiceObj.getFirstError( validation )
                } );
            }

            let tag = in_data.tag;
            articleServiceObj.search( tag )
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

    getLatestJobs( req, res, next ) {

        try {

            articleServiceObj.getLatestJobs()
            .then( async (result) => {
                return await responseServiceObj.sendResponse( res, {
                    msg : 'Record found',
                    data : {
                        article: result,
                    },
                    cnt: await articleServiceObj.getLatestJobsCnt()
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

    getUpcomingJobs( req, res, next ) {

        try {

            articleServiceObj.getUpcomingJobs()
            .then( async (result) => {
                return await responseServiceObj.sendResponse( res, {
                    msg : 'Record found',
                    data : {
                        article: result,
                    },
                    cnt: await articleServiceObj.getUpcomingJobsCnt()
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

    getJobsClosingSoon( req, res, next ) {

        try {

            articleServiceObj.getJobsClosingSoon()
            .then( async (result) => {
                return await responseServiceObj.sendResponse( res, {
                    msg : 'Record found',
                    data : {
                        article: result,
                    },
                    cnt: await articleServiceObj.getJobsClosingSoonCnt()
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
}