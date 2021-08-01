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
}