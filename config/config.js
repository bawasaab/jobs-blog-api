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
// const mongodbUrl = `mongodb://127.0.0.1:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false`;

const basePath = process.env.BASE_URL;

module.exports = {
    mongodbUrl: mongodbUrl,

    MONGODB_CONNECTION_STRING: process.env.MONGODB_CONNECTION_STRING,

    API_BASE_URL: process.env.API_BASE_URL,

    WEB_BASE_URL: process.env.WEB_BASE_URL,
    
    // BASE_URL: process.env.BASE_URL,
    JWT_SECRET: process.env.JWT_SECRET_KEY,

    PORT: process.env.PORT,

    API_USER_IMAGE_UPLOAD_PATH: process.env.API_USER_IMAGE_UPLOAD_PATH,
    API_USER_IMAGE_BASE_PATH: process.env.BASE_URL + process.env.API_USER_IMAGE_BASE_PATH,
    
    API_DEPARTMENT_IMAGE_UPLOAD_PATH: process.env.API_DEPARTMENT_IMAGE_UPLOAD_PATH,
    API_DEPARTMENT_IMAGE_PATH: process.env.BASE_URL + process.env.API_DEPARTMENT_IMAGE_PATH,

    API_ARTICLE_IMAGE_UPLOAD_PATH: process.env.API_ARTICLE_IMAGE_UPLOAD_PATH,
    API_ARTICLE_IMAGE_PATH: process.env.API_ARTICLE_IMAGE_PATH,

    WEB_ROOT_IMAGE_UPLOAD_PATH: process.env.WEB_ROOT_IMAGE_UPLOAD_PATH,
    WEB_ROOT_IMAGE_PATH: process.env.WEB_ROOT_IMAGE_PATH,

    MAIL_HOST: process.env.MAIL_HOST,
    MAIL_PORT: process.env.MAIL_PORT,
    MAIL_USERNAME: process.env.MAIL_USERNAME,
    MAIL_PASSWORD: process.env.MAIL_PASSWORD,
    MAIL_FROM: process.env.MAIL_FROM,
    
    VIEW_PATH: path.join(__dirname, '../views'),
    
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    
    NEWSLETTER_LINK_EXPIRY_DAYS: process.env.NEWSLETTER_LINK_EXPIRY_DAYS, // DAYS
    
    FCM_SERVER_KEY: process.env.FCM_SERVER_KEY
};