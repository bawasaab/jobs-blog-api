const UserModel = require('../models').UserModel;
const { ObjectId } = require('mongodb');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
var {userImageBasePath, JWT_SECRET} = require('../config/config');

module.exports = class TokenService {

    constructor() {}

    getUserId( req ) {

        if( 
            req.hasOwnProperty('authData') && 
            req.authData.hasOwnProperty('userData') && 
            req.authData.userData.hasOwnProperty('id')
        ) {
            return req.authData.userData.id;

        } else {
            throw 'Session not set.';
        }
    }

    getUser( req ) {

        if( 
            req.hasOwnProperty('authData') && 
            req.authData.hasOwnProperty('userData')
        ) {
            return req.authData.userData;

        } else {
            throw 'Session not set.';
        }
    }

    getAuthor( req ) {
        
        if( 
            req.hasOwnProperty('authData') && 
            req.authData.hasOwnProperty('userData')
        ) {
            let author_details = req.authData.userData;
            return {
                first_name: author_details.first_name,
                last_name: author_details.last_name,
                profilePic: author_details.profilePic,
                email: author_details.email,
                gender: author_details.gender
            }
        } else {
            throw 'Session not set.';
        }
    }
}