const FCM = require('fcm-node');
const FcmModel = require('../models').FcmModel;

const deviceToken = 'er30AquXTq-R9dy025pDXB:APA91bE8Y6NBc7jCdEvYFdFmNq3rKbam5X2uqm2ka_q461gL8i80y0T9bDheou9-82YryJnwnCPT64pRJeWIeKrb1y2GFsWnTN2J-Y2y9uQBeuhgmcphkaR4SoOUYH3d4cEM2eIq1uw0';
const serverKey = 'AAAA9ncB5_0:APA91bHlLj35FoIEGYEYPOQM9l6p57zIAw4ZOb-nxg7WuR8O-tWRj8_2N_VS7xYYU_e783FnsIv-smE7nl7-FVRYgmFmt_-c9bWRFHUfGhIdKWOy8s8NjwLl0epdhqS9OBmOkDzhincz';

module.exports = class FcmService {

    fcm;
    
    constructor() {
        this.fcm = new FCM(serverKey);
    }

    async saveDeviceToken( in_data ) {

        try {

            let result = await FcmModel.create( in_data );
            return result;
        } catch (ex) {
            throw ex;
        }
    }

    async sendNotification() {

        try {

            let message = {
                to: deviceToken,
                notification: {
                    title: 'NotifcatioTestAPP',
                    body: 'Message from node js app',
                },
        
                data: { //you can send only notification or only data(or include both)
                    title: 'ok cdfsdsdfsd',
                    body: '{"name" : "okg ooggle ogrlrl","product_id" : "123","final_price" : "0.00035"}'
                }
            };
            
            this.fcm.send(message, function(err, response) {
                if (err) {
                    console.log("Something has gone wrong!"+err);
                    console.log("Respponse:! "+response);
                    throw err;
                } else {
                    // showToast("Successfully sent with response");
                    console.log("Successfully sent with response: ", response);
                    return response;
                }    
            });
        } catch (ex) {
            throw ex;
        }
    }
}