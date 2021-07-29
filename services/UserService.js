const UserModel = require('../models').UserModel;
const { ObjectId } = require('mongodb');
const bcrypt = require("bcrypt");

module.exports = class UserService {

    constructor() {}

    async getAll() {
        try {

            let result = await UserModel.find( { status: { $ne: 'DELETED' } } );
            return result;
        } catch(ex) {            
            throw ex;
        }
    }

    async getById( in_id ) {
        try {

            let id = ObjectId( in_id );
            let result = await UserModel.findOne( { _id: id, status: { $ne: 'DELETED' } } );    
            return result;
        } catch(ex) {
            
            throw ex;
        }
    }

    async getByEmail( email ) {
        try {

            let result = await UserModel.findOne( { email: email, status: { $ne: 'DELETED' } } );    
            return result;
        } catch(ex) {
            
            throw ex;
        }
    }

    async getByPhone( phone ) {
        try {

            let result = await UserModel.findOne( { phone: phone, status: { $ne: 'DELETED' } } );
            return result;
        } catch(ex) {
            
            throw ex;
        }
    }

    async insert( in_data ) {
        try {

            // generate salt to hash password
            const salt = await bcrypt.genSalt(10);
            // now we set user password to hashed password
            in_data.password = await bcrypt.hash(in_data.password, salt);
            let result = await UserModel.create( in_data );
            return result;
        } catch(ex) {
            throw ex;
        }
    }

    async update( in_data, in_id ) {
        try {
            
            let id = ObjectId( in_id );
            let result = await UserModel.updateOne({ _id: id }, in_data, { multi: false });
            return result;
        } catch(ex) {
            throw ex;
        }
    }

    async delete( in_data, id ) {
        try {
            
            let id = ObjectId( id );
            let result = await UserModel.updateOne({ _id: id }, in_data, { multi: false } );
            return result;
        } catch(ex) {
            throw ex;
        }
    }

    async updateUserProfilePic( in_data, in_id ) {
        try {
            let id = ObjectId( in_id );
            let result = await UserModel.updateOne({ _id: id }, in_data, { multi: false } );
            return result;
        } catch(ex) {
            throw ex;
        }
    }

    async isIdExists( user_id ) {
        try {

            let result = await UserModel.countDocuments( { _id: user_id } );
            let isExists = result > 0 ? true : false;
            return isExists;
        } catch(ex) {
            throw ex;
        }
    }
    
    async isEmailExists( in_email, user_id = false ) {
        try {
            if( user_id ) {

                let result = await UserModel.countDocuments( {
                    email: in_email,
                    _id: { $ne: user_id }
                } );
                let isExists = result > 0 ? true : false;
                return isExists;
            } else {

                let result = await UserModel.countDocuments( { email: in_email } );
                let isExists = result > 0 ? true : false;
                return isExists;
            }
        } catch(ex) {
            throw ex;
        }
    }

    async isPhoneExists( in_contact_no, user_id = false ) {
        try {

            if( user_id ) {

                let result = await UserModel.countDocuments( { 
                    contact_number: in_contact_no,
                    _id: { $ne: user_id }
                } );
                let isExists = result > 0 ? true : false;
                return isExists;
            } else {

                let result = await UserModel.countDocuments( { contact_number: in_contact_no } );
                let isExists = result > 0 ? true : false;
                return isExists;
            }
        } catch(ex) {
            throw ex;
        }
    }
}