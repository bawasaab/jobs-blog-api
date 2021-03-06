const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const STATUSES = ['OPEN', 'CLOSE', 'DELETED'];
const GENDER = ['MALE', 'FEMALE'];
const dated = new Date();

const externalLinks = new Schema({
    article_id: { type: ObjectId, default: null },
    link: { type: String, default: null },
    text: { type: String, default: null }
});

const comments = new Schema({
    parent_id: { type: ObjectId, default: null },
    article_id: { type: ObjectId, default: null },
    name: { type: String, default: null },
    email: { type: String, default: null },
    website: { type: String, default: null },
    comment: { type: String, default: null },
    status: { type: String, enum: STATUSES, default: 'OPEN' },
    
    deletedAt: { type: Date, default: null },
    createdAt: { type: Date, default: dated },
    updatedAt: { type: Date, default: dated },
});

const meta = new Schema({
    article_id: { type: ObjectId, default: null },
    name: { type: String, default: null },
    content: { type: String, default: null },
    status: { type: String, enum: STATUSES, default: 'OPEN' },
    
    deletedAt: { type: Date, default: null },
    createdAt: { type: Date, default: dated },
    updatedAt: { type: Date, default: dated },
});

const ArticleSchema = new Schema({
    
    user_id: { type: ObjectId, default: null },
    department_id: { type: ObjectId, default: null },
    category_id: { type: ObjectId, default: null },

    title: { type: String, default: null },
    slug: { type: String, unique: true },

    short_description: { type: String, default: null },
    description: { type: String, default: null },

    author_details: {
        first_name: { type: String },
        last_name: { type: String, default: null },
        profilePic: { type: String, default: null },        
        email: { type: String, default: null },
        gender: { type: String, enum: GENDER, default: 'MALE' }
    },

    scheduled_for: { type: Date, default: null },
    opened_on: { type: Date, default: null },
    closed_on: { type: Date, default: null },

    meta: [meta],
	comments: [comments],
	tags: [],

    externalLinks: [externalLinks],

	status: { type: String, enum: STATUSES, default: 'OPEN' },

    deletedAt: { type: Date, default: null },
    createdAt: { type: Date, default: dated },
    updatedAt: { type: Date, default: dated },
});

module.exports = mongoose.model('Article', ArticleSchema);