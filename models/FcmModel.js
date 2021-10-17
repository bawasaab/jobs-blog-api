const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const DEVICE_TYPE = ['WEB', 'IPHONE', 'ANDROID'];
const dated = new Date();

const FcmSchema = new Schema({

    fcm_device_type: { type: String, enum: DEVICE_TYPE, default: 'WEB' },
    fcm_token: { type: String, default: null },

    device_info: { type: Object, default: null },
    
    deletedAt: { type: Date, default: null },
    createdAt: { type: Date, default: dated },
    updatedAt: { type: Date, default: dated },
});

module.exports = mongoose.model('Fcm', FcmSchema);