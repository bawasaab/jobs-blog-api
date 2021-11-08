const { ObjectId } = require('mongodb');
const ResponseService = require('../services').ResponseService;
const responseServiceObj = new ResponseService();

module.exports = class ValidateIdsMiddlewares {
    
    constructor() {}

    userId( req, res, next ) {

        try {

            let id = req.params.userId;
            let is_valid = ObjectId.isValid(id);
            if( !is_valid ) {
                throw 'User id not well formed.'
            } else {
                next();
            }
        } catch(ex) {

            return responseServiceObj.sendException( res, {
                msg : ex.toString()
            } );
        }
    }

    departmentId( req, res, next ) {

        try {

            let id = req.params.departmentId;
            let is_valid = ObjectId.isValid(id);
            if( !is_valid ) {
                throw 'Department id not well formed.'
            } else {
                next();
            }
        } catch(ex) {

            return responseServiceObj.sendException( res, {
                msg : ex.toString()
            } );
        }
    }

    categoryId( req, res, next ) {

        try {

            let id = req.params.categoryId;
            let is_valid = ObjectId.isValid(id);
            if( !is_valid ) {
                throw 'Category id not well formed.'
            } else {
                next();
            }
        } catch(ex) {

            return responseServiceObj.sendException( res, {
                msg : ex.toString()
            } );
        }
    }

    articleId( req, res, next ) {

        try {

            let id = req.params.articleId;
            let is_valid = ObjectId.isValid(id);
            if( !is_valid ) {
                throw 'Article id not well formed.'
            } else {
                next();
            }
        } catch(ex) {

            return responseServiceObj.sendException( res, {
                msg : ex.toString()
            } );
        }
    }

    commentId( req, res, next ) {

        try {

            let id = req.params.commentId;
            let is_valid = ObjectId.isValid(id);
            if( !is_valid ) {
                throw 'Comment id not well formed.'
            } else {
                next();
            }
        } catch(ex) {
            return responseServiceObj.sendException( res, {
                msg : ex.toString()
            } );
        }
    }
}