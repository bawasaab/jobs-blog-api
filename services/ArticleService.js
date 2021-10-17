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

    async getLatestJobsCnt() {
        try {

            let cutoff = new Date();
            /**
             * last 31 days articles
             */
            cutoff.setDate(cutoff.getDate()-31);

            let result = await articleModel.count( { 
                status: { $ne: 'DELETED' },
                scheduled_for: {
                    $gte: cutoff
                }
            } );
            return result;
        } catch(ex) {            
            throw ex;
        }
    }

    async getLatestJobs() {
        try {

            let cutoff = new Date();
            /**
             * last 31 days articles
             */
            cutoff.setDate(cutoff.getDate()-31);

            let result = await articleModel.find( { 
                status: { $ne: 'DELETED' },
                scheduled_for: {
                    $gte: cutoff
                },
                // sort: {
                //     scheduled_for: 1
                // }
            } );
            return result;
        } catch(ex) {            
            throw ex;
        }
    }

    async getUpcomingJobsCnt() {
        try {

            let today = new Date();
            let result = await articleModel.count( { 
                status: { $ne: 'DELETED' },
                scheduled_for: {
                    $gt: today
                }
            } );
            return result;
        } catch(ex) {            
            throw ex;
        }
    }

    async getUpcomingJobs() {
        try {

            let today = new Date();
            let result = await articleModel.find( { 
                status: { $ne: 'DELETED' },
                scheduled_for: {
                    $gt: today
                }
            } );
            return result;
        } catch(ex) {            
            throw ex;
        }
    }

    async getJobsClosingSoonCnt() {
        try {
    
            let today = new Date();
            let result = await articleModel.count( { 
                status: { $ne: 'DELETED' },
                closed_on: {
                    $gt: today
                }
            } );
            return result;
        } catch(ex) {            
            throw ex;
        }
    }
    
    async getJobsClosingSoon() {
        try {
    
            let today = new Date();
            let result = await articleModel.find( { 
                status: { $ne: 'DELETED' },
                closed_on: {
                    $gt: today
                }
            } );
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

    async getBySlug( in_slug ) {
        try {

            let result = await articleModel.findOne( { slug: in_slug, status: 'OPEN' } );
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

    async isSlugExists( in_slug, articleId ) {
        try {

            let result;
            if( articleId ) {
                result = await articleModel.countDocuments( { slug: in_slug, _id: { $ne: articleId } } );
            } else {
                result = await articleModel.countDocuments( { slug: in_slug } );
            }
            let isExists = result > 0 ? true : false;
            return isExists;
        } catch(ex) {
            throw ex;
        }
    }

    async search( searchTxt ) {
        try {

            let result = [];
            result = await articleModel.find( { 
                $and: [{
                    $or: [
                        { 'title': new RegExp(searchTxt, 'i') },
                        { 'short_description': new RegExp(searchTxt, 'i') },
                        { 'tags': new RegExp(searchTxt, 'i') },
                    ],
                    'status': 'OPEN'
                }]
            } );

            if( result.length < 1 ) {

                result = await articleModel.find( { 
                    'status': 'OPEN'
                } );
            }

            return result;
        } catch(ex) {            
            throw ex;
        }
    }
}