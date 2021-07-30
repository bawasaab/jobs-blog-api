const path = require('path');
const appRoot = require('app-root-path');

const dbUsername = `deepak`;
const dbPassword = `P@$$w0rd7254`;
const dbName = `blog`;
const cluster = `cluster0.mvpaj.mongodb.net`;

// mongodb+srv://deepak:<password>@cluster0.mvpaj.mongodb.net/test
const mongodbUrl = `mongodb+srv://${dbUsername}:${dbPassword}@${cluster}/${dbName}`;

const basePath = 'http://localhost:3000/';
module.exports = {
    mongodbUrl: mongodbUrl,
    basePath: basePath,

    userImageUploadPath: 'public/images/uploads/users',
    userImageBasePath: basePath + 'images/uploads/users',
    userImageActualPath: path.join( appRoot.path, 'public/images/uploads/users' ),

    JWT_SECRET: 'secretKey'
}