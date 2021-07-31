require('dotenv').config();
const path = require('path');
const appRoot = require('app-root-path');

// const dbUsername = `your-mongoDB-user-name`;
// const dbPassword = `your-mongoDB-password`;
// const dbName = `your-mongoDB-database-name`;
// const cluster = `cluster0.mvpaj.mongodb.net`;

const dbUsername = `deepak`;
const dbPassword = `P@$$w0rd7254`;
const dbName = `blog`;
const cluster = `cluster0.mvpaj.mongodb.net`;

// mongodb+srv://deepak:<password>@cluster0.mvpaj.mongodb.net/test
const mongodbUrl = `mongodb+srv://${dbUsername}:${dbPassword}@${cluster}/${dbName}`;

const basePath = 'http://localhost:3000/';
// console.log('process.env', process.env);
module.exports = {
    mongodbUrl: mongodbUrl,

    MONGODB_CONNECTION_STRING: process.env.MONGODB_URL,

    BASE_URL: process.env.BASE_URL,

    USER_IMAGE_UPLOAD_PATH: process.env.USER_IMAGE_UPLOAD_PATH,
    USER_IMAGE_BASE_PATH: process.env.BASE_URL + process.env.USER_IMAGE_BASE_PATH,
    
    DEPARTMENT_IMAGE_UPLOAD_PATH: process.env.DEPARTMENT_IMAGE_UPLOAD_PATH,
    DEPARTMENT_IMAGE_PATH: process.env.BASE_URL + process.env.DEPARTMENT_IMAGE_PATH,
    
    JWT_SECRET: process.env.JWT_SECRET_KEY,
    
    VIEW_PATH: path.join(__dirname, '../views'),
    
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    
    NEWSLETTER_LINK_EXPIRY_DAYS: process.env.NEWSLETTER_LINK_EXPIRY_DAYS // DAYS
};