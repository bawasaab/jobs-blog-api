const FCM = require('fcm-node');
const FcmModel = require('../models').FcmModel;
const FCM_SERVER_KEY = require('../config/config').FCM_SERVER_KEY;

// const deviceToken = 'er30AquXTq-R9dy025pDXB:APA91bE8Y6NBc7jCdEvYFdFmNq3rKbam5X2uqm2ka_q461gL8i80y0T9bDheou9-82YryJnwnCPT64pRJeWIeKrb1y2GFsWnTN2J-Y2y9uQBeuhgmcphkaR4SoOUYH3d4cEM2eIq1uw0';

let $this;
module.exports = class FcmService {

    fcm;
    
    constructor() {
        $this = this;
        this.fcm = new FCM( FCM_SERVER_KEY );
    }

    async getByDeviceToken( device_token ) {

        try {
            return await FcmModel.findOne( { device_token: device_token, status: { $ne: 'DELETED' } } );

        } catch( ex ) {
            throw ex;
        }
    }

    async isDeviceTokenExists( device_token ) {
        try {

            let result = await FcmModel.countDocuments( { device_token: device_token } );
            let isExists = result > 0 ? true : false;
            return isExists;
        } catch(ex) {
            throw ex;
        }
    }

    async saveDeviceToken( in_data ) {

        try {

            let isExists = await this.isDeviceTokenExists( in_data.device_token );
            let result;

            if( isExists ) {
                result = await FcmModel.updateOne({ device_token: in_data.device_token }, in_data, { multi: false });

            } else {
                result = await FcmModel.create( in_data );
                
            }
            return result;
        } catch (ex) {
            throw ex;
        }
    }

    customSendFCM( message ) {

        return new Promise(function(resolve, reject) {

            $this.fcm.send(message, function(err, response) {
                if (err) {
                    console.log("Something has gone wrong!"+err);
                    reject(err);
                } else {
                    console.log("Successfully sent with response: ", response);
                    // return response;
                    resolve(response);
                }
            });
        });
    }

    async sendNotification( deviceToken, in_notification ) {

        try {

            // click_action is a link to the page to be open when user clicks on it
            let message = {
                "notification":{
                    "title": in_notification.notification.title,
                    "body": in_notification.notification.body,
                    "sound":"default",
                    "click_action":"home",
                    "icon":"fcm_push_icon"
                },
                "data":{
                    "landing_page":"second",
                    "price":"$3,000.00"
                },
                "to":in_notification.to,
                "priority":"high",
                "restricted_package_name":""
            };

            let result = await this.customSendFCM( message );
            return result;

        } catch (ex) {
            throw ex;
        }
    }

    async sendNotificationToTopic( topic, in_notification, cb ) {

        try {

            let message = {
                "notification":{
                    "title": in_notification.notification.title,
                    "body": in_notification.notification.body,
                    "sound":"default",
                    "click_action":"home",
                    "icon":"fcm_push_icon"
                },
                "data":{
                    "landing_page":"second",
                    "price":"$3,000.00"
                },
                "to": '/topics/'+ topic,
                "priority":"high",
                "restricted_package_name":""
            };

            let result = await this.customSendFCM( message );
            return result;

        } catch (ex) {
            throw ex;
        }
    }
}