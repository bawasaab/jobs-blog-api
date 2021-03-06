const DepartmentModel = require('../models').DepartmentModel;
const {ObjectId} = require('mongodb');

module.exports = class DepartmentService {

    constructor() {
        this.attributes = ['_id', 'department_title', 'department_slug', 'department_image', 'categories', 'department_status', 'created_at', 'updated_at', 'deleted_at'];
    }

    async get(searchTxt) {
        try {
            if (!searchTxt) {
                let result = await DepartmentModel.find(
                        {department_status: {$ne: 'DELETED'}},
                        this.attributes,
                        {sort: {created_at: -1}});
                return result;
            } else {
                let result = await DepartmentModel.find(
                        {$and: [{$or: [{title: new RegExp(searchTxt, 'i')}, {slug: new RegExp(searchTxt, 'i')}], department_status: {$ne: 'DELETED'}}]},
                        this.attributes,
                        {sort: {created_at: -1}
                        });
                return result;
            }
        } catch (ex) {
            throw ex;
        }
    }

    async insert(in_data) {
        try {
            in_data.department_title = in_data.department_title.toLowerCase();
            let result = await DepartmentModel.create(in_data);
            return result;
        } catch (ex) {
            throw ex;
        }
    }

    async exists(department_title, id = false) {
        try {
            let condition = (id) ? {department_title: department_title.toLowerCase(), _id: {$ne: id}, department_status: {$ne: 'DELETED'}} : {department_title: department_title.toLowerCase(), department_status: {$ne: 'DELETED'}};
            let result = await DepartmentModel.countDocuments(condition);
            let isExists = result > 0 ? true : false;
            return isExists;
        } catch (ex) {
            throw ex;
    }
    }

    async getById(in_id) {
        try {
            let id = ObjectId(in_id);
            let result = await DepartmentModel.findOne({_id: id, department_status: {$ne: 'DELETED'}});
            return result;
        } catch (ex) {
            throw ex;
        }
    }

    async update(in_data, in_id) {
        try {
            let id = ObjectId(in_id);
            let result = await DepartmentModel.updateOne({_id: id}, in_data);
            return result;
        } catch (ex) {
            throw ex;
        }
    }

    async isIdExists(id) {
        try {
            let result = await DepartmentModel.countDocuments({_id: id});
            let isExists = result > 0 ? true : false;
            return isExists;
        } catch (ex) {
            throw ex;
        }
    }
};