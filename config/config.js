const dbUsername = `deepak`;
const dbPassword = `rAlYCkd3p6uJOFbK`;
const dbName = `supagrab`;
const mongodbUrl = `mongodb+srv://${dbUsername}:${dbPassword}@cartcluster.ozjjy.mongodb.net/${dbName}`;
const basePath = 'http://localhost:3000/';
module.exports = {
    mongodbUrl: mongodbUrl,
    basePath: basePath,

    userImageUploadPath: 'public/images/uploads/users',
    userImageBasePath: basePath + 'images/uploads/users',

    JWT_SECRET: 'secretKey'
}