const fs = require('fs');
const Validator = require('validatorjs');
const {ObjectId} = require('mongodb');

const ResponseService = require('../services').ResponseService;
const responseServiceObj = new ResponseService();

const CategoryService = require('../services').CategoryService;
const CategoryServiceObj = new CategoryService();

let CATEGORY_IMAGE_PATH = require('../config/config').CATEGORY_IMAGE_PATH;
let CATEGORY_IMAGE_UPLOAD_PATH = require('../config/config').CATEGORY_IMAGE_UPLOAD_PATH;

module.exports = class CategoryController {

    constructor() {

    }

    get(req, res, next) {
        try {
            let searchTxt = req.query.searchTxt;
            CategoryServiceObj.get(searchTxt, req.params.departmentId)
                    .then(async (result) => {
                        return await responseServiceObj.sendResponse(res, {
                            msg: 'Categories Fetched Successfully',
                            data: {categories: result}
                        });
                    })
                    .catch(async (ex) => {
                        return await responseServiceObj.sendException(res, {
                            msg: ex.toString()
                        });
                    });
        } catch (ex) {
            return responseServiceObj.sendException(res, {
                msg: ex.toString()
            });
        }
    }

    insert(req, res, next) {
        try {
            let data = req.body;
            let department_id = ObjectId(req.params.departmentId);
            let rules = {
                category_title: 'required',
                category_slug: 'required',
                category_status: 'required',
            };
            let validation = new Validator(data, rules);
            if (validation.fails()) {
                return responseServiceObj.sendException(res, {
                    msg: responseServiceObj.getFirstError(validation)
                });
            }
            CategoryServiceObj.exists(data, department_id)
                    .then((result) => {
                        if (result) {
                            throw 'Title Already exists';
                        }
                    })
                    .then(async(result) => {
                        let category = await CategoryServiceObj.insert(data, department_id);
                        return await responseServiceObj.sendResponse(res, {
                            msg: 'Category Inserted Successfully',
                            data: {category: category}
                        });
                    })
                    .catch(async (ex) => {
                        return await responseServiceObj.sendException(res, {msg: ex.toString()});
                    });
        } catch (ex) {
            return responseServiceObj.sendException(res, {
                msg: ex.toString()
            });
        }
    }

    getById(req, res, next) {
        try {
            let department_id = ObjectId(req.params.departmentId);
            let id = ObjectId(req.params.categoryId);
            CategoryServiceObj.getById(id, department_id)
                    .then(async (result) => {
                        return await responseServiceObj.sendResponse(res, {
                            msg: 'Category Fetched Successfully',
                            data: {category: result}
                        });
                    })
                    .catch(async (ex) => {
                        return await responseServiceObj.sendException(res, {
                            msg: ex.toString()
                        });
                    });
        } catch (ex) {
            return responseServiceObj.sendException(res, {
                msg: ex.toString()
            });
        }
    }

    exists(req, res, next) {
        try {
            let department_id = ObjectId(req.params.departmentId);
            let title = req.params.title;
            let id = (req.params.categoryId) ? ObjectId(req.params.categoryId) : null;
            CategoryServiceObj.exists({title: title}, department_id, id)
                    .then(async (result) => {
                        if (result) {
                            return await responseServiceObj.sendResponse(res, {
                                msg: 'Category Already Exists',
                                data: {category: true}
                            });
                        } else {
                            return await responseServiceObj.sendResponse(res, {
                                msg: 'Category Available',
                                data: {category: false}
                            });
                        }
                    }).catch(async (ex) => {
                return await responseServiceObj.sendException(res, {msg: ex.toString()});
            });
        } catch (ex) {
            return responseServiceObj.sendException(res, {
                msg: ex.toString()
            });
        }
    }

    delete(req, res, next) {
        try {
            let id = req.params.categoryId;
            let department_id = req.params.departmentId;
            CategoryServiceObj.isIdExists(department_id, id)
                    .then(async (isExists) => {
                        if (!isExists) {
                            throw 'Invalid Id Provided';
                        }
                    })
                    .then(async () => {
                        let result = await CategoryServiceObj.delete(department_id, id);
                        return await responseServiceObj.sendResponse(res, {
                            msg: 'Category Deleted Successfully'
                        });
                    })
                    .catch(async (ex) => {
                        return await responseServiceObj.sendException(res, {
                            msg: ex.toString()
                        });
                    });
        } catch (ex) {
            return responseServiceObj.sendException(res, {
                msg: ex.toString()
            });
        }
    }

    update(req, res, next) {
        try {
            let department_id = req.params.departmentId;
            let category_id = req.params.categoryId;
            let data = req.body;

            let rules = {};
            data.category_title ? rules.category_title = 'required' : '';
            data.category_slug ? rules.category_slug = 'required' : '';
            data.category_status ? rules.category_status = 'required' : '';
            
            let validation = new Validator(data, rules);
            if (validation.fails()) {
                return responseServiceObj.sendException(res, {
                    msg: responseServiceObj.getFirstError(validation)
                });
            }

            CategoryServiceObj.isIdExists(department_id, category_id)
                    .then(async (isExists) => {
                        if (!isExists) {
                            throw 'Invalid Id Provided';
                        }
                    })
                    .then(async(result) => {
                        let category = await CategoryServiceObj.update(department_id, category_id, data);
                        return await responseServiceObj.sendResponse(res, {
                            msg: 'Category Updated Successfully',
                            data: {category: await CategoryServiceObj.getById(category_id, department_id)}
                        });
                    })
                    .catch(async (ex) => {
                        return await responseServiceObj.sendException(res, {msg: ex.toString()});
                    });
        } catch (ex) {
            return responseServiceObj.sendException(res, {
                msg: ex.toString()
            });
        }
    }

};