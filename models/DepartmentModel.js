const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const STATUSES = ['OPEN', 'CLOSE', 'DELETED'];
const dated = new Date();

const CategorySchema = new Schema({
    _id: {type: ObjectId, default: null},
    department_id: {type: ObjectId, default: null},
    category_title: {type: String, default: null},
    category_slug: {type: String, default: null},
    category_image: {type: String, default: null},
    category_status: {type: String, enum: STATUSES, default: 'OPEN'},
    created_at: {type: Date, default: dated},
    updated_at: {type: Date, default: dated},
    deleted_at: {type: Date, default: null}
});

const DepartmentSchema = new Schema({
    department_title: {type: String, default: null},
    department_slug: {type: String, default: null},
    categories: [CategorySchema],
    department_image: {type: String, default: null},
    department_status: {type: String, enum: STATUSES, default: 'OPEN'},
    created_at: {type: Date, default: dated},
    updated_at: {type: Date, default: dated},
    deleted_at: {type: Date, default: null}
});

module.exports = mongoose.model('Department', DepartmentSchema);