const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const STATUSES = ['OPEN', 'CLOSE', 'DELETED'];
const dated = new Date();

const comments = new Schema({
    parent_id: { type: ObjectId, default: null },
    article_id: { type: ObjectId, default: null },
    comment: { type: String, default: null },
    status: { type: String, enum: STATUSES, default: 'OPEN' },
    
    deletedAt: { type: Date, default: null },
    createdAt: { type: Date, default: dated },
    updatedAt: { type: Date, default: dated },
});

const meta = new Schema({
    name: { type: String, default: null },
    name: { type: String, default: null },
    content: { type: String, default: null },
    status: { type: String, enum: STATUSES, default: 'OPEN' },
    
    deletedAt: { type: Date, default: null },
    createdAt: { type: Date, default: dated },
    updatedAt: { type: Date, default: dated },
});

const ArticleSchema = new Schema({
    
    user_id: { type: ObjectId, default: null },
    title: { type: String, default: null },
    slug: { type: String, unique: true },

    short_description: { type: String, default: null },
    description: { type: String, default: null },

    meta: [],
	comments: [comments],
	tags: [],

	status: { type: String, enum: STATUSES, default: 'OPEN' },

    deletedAt: { type: Date, default: null },
    createdAt: { type: Date, default: dated },
    updatedAt: { type: Date, default: dated },
});

module.exports = mongoose.model('Article', ArticleSchema);