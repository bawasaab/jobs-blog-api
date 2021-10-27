const ResponseService = require('../services').ResponseService;
const responseServiceObj = new ResponseService();

const FcmService = require('../services').FcmService;
const FcmServiceObj = new FcmService();

const Validator = require('validatorjs');

module.exports = class FcmController {

    constructor() {}

    saveDeviceToken( req, res, next ) {

        try {

            let in_data = req.body;
            FcmServiceObj.saveDeviceToken( in_data )
            .then( async ( result ) => {

                // send welcome notification
                let deviceToken = in_data.fcm_token;
                let in_notification = {
                    to: deviceToken,
                    notification: {
                        title: 'Welcome To Jobsnplacements.com',
                        body: 'Thanks for choosing Jobsnplacements.com',
                    }
                };
                
                await FcmServiceObj.sendNotification( deviceToken, in_notification );

                return await responseServiceObj.sendResponse(res, {
                    msg: 'Token Saved',
                    data: {
                        result: await FcmServiceObj.getByDeviceToken( in_data.device_token )
                    }
                });
            } )
            .catch( async (ex) => {
                
                return responseServiceObj.sendException( res, {
                    msg : ex.toString()
                } );
            } );

        } catch( ex ) {

            return responseServiceObj.sendException( res, {
                msg : ex.toString()
            } );
        }
    }

    sendNotification( req, res, next ) {

        try {

            let in_data = req.body;
            let rules = {
                fcm_token: 'required',
                title: 'required',
                body: 'required',
            };
            let validation = new Validator(in_data, rules);
            if (validation.fails()) {
                return responseServiceObj.sendException(res, {
                    msg: responseServiceObj.getFirstError(validation)
                });
            }

            let deviceToken = in_data.fcm_token;
            let in_notification = {
                to: deviceToken,
                notification: {
                    title: in_data.title,
                    body: in_data.body,
                }
            };

            FcmServiceObj.sendNotification( in_data.fcm_token, in_notification)
            .then( async (result) => {

                return await responseServiceObj.sendResponse(res, {
                    msg: 'Notification Status',
                    data: {
                        result: result
                    }
                });
            } )
            .catch( (ex) => {
                return responseServiceObj.sendException( res, {
                    msg : ex.toString()
                } );    
            } );

        } catch( ex ) {

            return responseServiceObj.sendException( res, {
                msg : ex.toString()
            } );
        }
    }

    sendNotificationToTopic( req, res, next ) {

        try {

            let in_data = req.body;
            let rules = {
                fcm_topic: 'required',
                title: 'required',
                body: 'required',
            };
            let validation = new Validator(in_data, rules);
            if (validation.fails()) {
                return responseServiceObj.sendException(res, {
                    msg: responseServiceObj.getFirstError(validation)
                });
            }

            let topic = in_data.fcm_topic;
            let in_notification = {
                topic: topic,
                notification: {
                    title: in_data.title,
                    body: in_data.body,
                }
            };

            FcmServiceObj.sendNotificationToTopic( topic, in_notification)
            .then( async (result) => {

                return await responseServiceObj.sendResponse(res, {
                    msg: 'Notification Status',
                    data: {
                        result: result
                    }
                });
            } )
            .catch( (ex) => {
                return responseServiceObj.sendException( res, {
                    msg : ex.toString()
                } );    
            } );

        } catch( ex ) {

            return responseServiceObj.sendException( res, {
                msg : ex.toString()
            } );
        }
    }
}