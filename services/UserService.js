const UserModel = require('../models').UserModel;
const { ObjectId } = require('mongodb');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
var {userImageBasePath, JWT_SECRET} = require('../config/config');

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

    async checkSocialUserExists(dataObj) {
        try {
            let result = await UserModel.countDocuments({token: dataObj.token, social_flag: dataObj.social_flag});
            return result > 0 ? true : false;
        } catch (ex) {
            throw ex;
        }
    }

    async getUserByFeededData(data) {
        try {
            let result = await UserModel.findOne(data);
            return result;
        } catch (ex) {
            throw ex;
        }
    }

    async createJwtToken(userData) {
        try {
            let tokenParamObj = {id: userData._id, email: userData.email, contact_number: userData.contact_number, role: userData.role, status: userData.status};
            let result = await jwt.sign({tokenParamObj}, JWT_SECRET, {expiresIn: 60 * 60});
            return result;
        } catch (ex) {
            throw ex;
        }
    }

    validateStatus(userObj) {
        try {
            if (['PENDING', 'BLOCK', 'DELETED'].includes(userObj.status)) {
                throw 'Your account status is ' + userObj.status.toLowerCase() + '. Please contact administrator.';
            }
            return true;
        } catch (ex) {
            throw ex;
        }
    }
}