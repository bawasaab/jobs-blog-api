const articleModel = require('../models').ArticleModel;
const { ObjectId } = require('mongodb');

module.exports = class ArticleService {

    constructor() {}

    async getAll() {
        try {

            let result = await articleModel.find( { status: { $ne: 'DELETED' } } );
            return result;
        } catch(ex) {            
            throw ex;
        }
    }

    async getAllByUser( userId ) {
        try {

            let result = await articleModel.find( { user_id: userId, status: { $ne: 'DELETED' } } );
            return result;
        } catch(ex) {            
            throw ex;
        }
    }

    async getById( in_id ) {
        try {

            let id = ObjectId( in_id );
            let result = await articleModel.findOne( { _id: id, status: { $ne: 'DELETED' } } );    
            return result;
        } catch(ex) {
            
            throw ex;
        }
    }

    async insert( in_data ) {
        try {

            let result = await articleModel.create( in_data );
            return result;
        } catch(ex) {
            throw ex;
        }
    }

    async update( in_data, in_id ) {
        try {
            console.log('inside update service');
            let id = ObjectId( in_id );
            let result = await articleModel.updateOne({ _id: id }, in_data, { multi: false });
            return result;
        } catch(ex) {
            throw ex;
        }
    }

    async delete( in_data, id ) {
        try {
            
            let id = ObjectId( id );
            let result = await articleModel.updateOne({ _id: id }, in_data, { multi: false } );
            return result;
        } catch(ex) {
            throw ex;
        }
    }

    async isIdExists( user_id ) {
        try {

            let result = await articleModel.countDocuments( { _id: user_id } );
            let isExists = result > 0 ? true : false;
            return isExists;
        } catch(ex) {
            throw ex;
        }
    }

    async insertImage(in_articleId, in_data) {
        try {

            let articleId = in_articleId;
            let result = await articleModel.findOneAndUpdate(
                {
                    _id: articleId
                },
                {
                    $push: {
                        images: in_data
                    }
                },
                {
                    new: true
                }
            );
            return result;
        } catch (ex) {
            throw ex;
        }
    }

    async deleteImage(in_articleId, in_imageId) {
        try {
            
            let imageId = ObjectId(in_imageId);
            let articleId = ObjectId(in_articleId);
            let result = await ProductModel.findOneAndUpdate(
                {
                    _id: articleId
                },
                {
                    $pull: {
                        images: {
                            _id: imageId
                        }
                    }
                },
                {
                    new: true
                }
            );
            return result;
        } catch (ex) {
            throw ex;
        }
    }
}