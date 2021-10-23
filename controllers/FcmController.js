const ResponseService = require('../services').ResponseService;
const responseServiceObj = new ResponseService();

const FcmService = require('../services').FcmService;
const FcmServiceObj = new FcmService();

module.exports = class FcmController {

    constructor() {}

    saveDeviceToken( req, res, next ) {

        try {

            let in_data = req.body;
            FcmServiceObj.saveDeviceToken( in_data )
            .then( async ( result ) => {

                return await responseServiceObj.sendResponse(res, {
                    msg: 'Token Saved',
                    data: {
                        result: result
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

            FcmServiceObj.sendNotification()
            .then( async ( result ) => {

                return await responseServiceObj.sendResponse(res, {
                    msg: 'Notification Status',
                    data: {
                        result: result
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
}