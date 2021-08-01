const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const STATUSES = ['OPEN', 'CLOSE', 'DELETED'];
const dated = new Date();

const CommentSchema = new Schema({
    parent_id: { type: ObjectId, default: null },
    article_id: { type: ObjectId, default: null },
	comment: { type: String, default: null },
	status: { type: String, enum: STATUSES, default: 'OPEN' },

    deletedAt: { type: Date, default: null },
    createdAt: { type: Date, default: dated },
    updatedAt: { type: Date, default: dated },
});

module.exports = mongoose.model('Comment', CommentSchema);