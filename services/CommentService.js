// const CommentModel = require('../models').CommentModel;
const articleModel = require('../models').ArticleModel;
const { ObjectId } = require('mongodb');

module.exports = class CommentService {

    constructor() {}

    async getAll( in_data ) {
        try {

            let result = await articleModel.find( { 
                _id: ObjectId(in_data.article_id), 
                status: { $ne: 'DELETED' } 
            });
            return result;
        } catch(ex) {            
            throw ex;
        }
    }

    async getById( in_data ) {
        try {

            let result = await articleModel.findOne( {
                _id: ObjectId(in_data.article_id),
                'comments._id': ObjectId(in_data.comment_id),
                'comments.article_id': ObjectId(in_data.article_id),
                'comments.status': { $ne: 'DELETED' } 
            });    
            return result;
        } catch(ex) {
            
            throw ex;
        }
    }

    async insert( in_data ) {
        try {

            in_data._id = new ObjectId();
            in_data.deletedAt = null;
            in_data.createdAt = new Date();
            in_data.updatedAt = null;
            let result = await articleModel.findOneAndUpdate(
                {
                    _id: ObjectId(in_data.article_id)
                }, 
                {
                    $push: {
                        comments: in_data
                    }
                }, 
                {
                    new : true
                }
            );
            return result;
        } catch(ex) {
            throw ex;
        }
    }

    async update( in_data, in_id ) {
        try {
            
            in_data.updatedAt = new Date();
            let id = ObjectId( in_id );
            let result = await articleModel.findOneAndUpdate(
                {
                    _id: ObjectId(in_data.article_id),
                    'comments._id': ObjectId(in_id)
                }, 
                {
                    $set: {
                        'comments.$.comment': in_data.comment,
                        'comments.$.status': in_data.status,
                        'comments.$.updatedAt': in_data.updatedAt
                    }
                }, 
                {
                    new : true
                }
            );
            return result;
        } catch(ex) {
            throw ex;
        }
    }

    async delete( in_data, comment_id ) {
        try {
            
            let result = await articleModel.updateOne({
                _id: ObjectId(in_data.article_id),
                'comments._id': ObjectId(in_data.comment_id),
                'comments.article_id': ObjectId(in_data.article_id),
            },
            in_data, 
            { 
                multi: false 
            });
            return result;
        } catch(ex) {
            throw ex;
        }
    }

    async isIdExists( in_data ) {
        try {

            let result = await articleModel.countDocuments({
                _id: ObjectId(in_data.article_id),
                'comments._id': ObjectId(in_data.comment_id),
                'comments.article_id': ObjectId(in_data.article_id),
            });
            let isExists = result > 0 ? true : false;
            return isExists;
        } catch(ex) {
            throw ex;
        }
    }
}