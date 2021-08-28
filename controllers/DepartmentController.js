const fs = require('fs');
const Validator = require('validatorjs');
const {ObjectId} = require('mongodb');

const ResponseService = require('../services').ResponseService;
const responseServiceObj = new ResponseService();

const DepartmentService = require('../services').DepartmentService;
const DepartmentServiceObj = new DepartmentService();

let DEPARTMENT_IMAGE_PATH = require('../config/config').DEPARTMENT_IMAGE_PATH;
let DEPARTMENT_IMAGE_UPLOAD_PATH = require('../config/config').DEPARTMENT_IMAGE_UPLOAD_PATH;

module.exports = class DepartmentController {

    constructor() {
        
    }

    get(req, res, next) {
        try {
            let searchTxt = req.query.searchTxt;
            DepartmentServiceObj
                    .get(searchTxt)
                    .then(async (result) => {
                        return await responseServiceObj.sendResponse(res, {
                            msg: 'Departments Fetched Successfully',
                            data: {departments: result}
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

    getById(req, res, next) {
        try {
            let id = ObjectId(req.params.departmentId);
            DepartmentServiceObj.getById(id)
                    .then(async (result) => {
                        return await responseServiceObj.sendResponse(res, {
                            msg: 'Department Fetched Successfully',
                            data: {department: result}
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
            let title = req.params.title;
            let id = (req.params.departmentId) ? ObjectId(req.params.departmentId) : null;
            DepartmentServiceObj.exists(title, id)
                    .then(async (result) => {
                        if (result) {
                            return await responseServiceObj.sendResponse(res, {
                                data: {msg: 'Department Already Exists', department: true}
                            });
                        } else {
                            return await responseServiceObj.sendResponse(res, {
                                data: {msg: 'Department Available', department: false}
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

    insert(req, res, next) {
        try {
            console.log('inside depat insert');
            let in_data = req.body;
            let rules = {title: 'required'};
            let validation = new Validator(in_data, rules);
            if (validation.fails()) {
                return responseServiceObj.sendException(res, {
                    msg: responseServiceObj.getFirstError(validation)
                });
            }
            DepartmentServiceObj.exists(in_data.title)
                    .then((result) => {
                        if (result) {
                            throw 'Title Already exists';
                        }
                    })
                    .then(async(result) => {
                        let department = await DepartmentServiceObj.insert(in_data);
                        return await responseServiceObj.sendResponse(res, {
                            msg: 'Department Inserted Successfully',
                            data: {department: department}
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

    update(req, res, next) {
        try {
            let in_data = req.body;
            let id = ObjectId(req.params.departmentId);
            let rules = {id: id};
            in_data.title ? rules.title = 'required' : '';
            in_data.status ? rules.status = 'required' : '';
            let validation = new Validator(in_data, rules);
            if (validation.fails()) {
                return responseServiceObj.sendException(res, {
                    msg: responseServiceObj.getFirstError(validation)
                });
            }
            DepartmentServiceObj.exists(in_data.title, id)
                    .then((result) => {
                        if (result) {
                            throw 'Title Already exists';
                        }
                    })
                    .then(async(result) => {
                        let department = await DepartmentServiceObj.update(in_data, id);
                        return await responseServiceObj.sendResponse(res, {
                            msg: 'Department Updated Successfully',
                            data: {department: await DepartmentServiceObj.getById(id)}
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

    delete(req, res, next) {
        try {
            let id = ObjectId(req.params.departmentId);
            DepartmentServiceObj.isIdExists(id)
                    .then(async (isExists) => {
                        if (!isExists) {
                            throw 'Invalid Id Provided';
                        }
                        return true;
                    })
                    .then(async (inResult) => {
                        let in_data = {
                            status: 'DELETED',
                            deleted_at: new Date()
                        };
                        let result = await DepartmentServiceObj.update(in_data, id);
                        return await responseServiceObj.sendResponse(res, {
                            msg: 'Department Deleted Successfully'
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

    uploadImage(req, res, next) {
        try {
            let id = ObjectId(req.params.departmentId);
            DepartmentServiceObj.isIdExists(id)
                    .then(async (isExists) => {
                        if (!isExists) {
                            throw 'Invalid department id.'
                        }
                    })
                    .then(async (isExists) => {
                        let imageDetails = req.params.imageDetails;
                        let result = await DepartmentServiceObj.update({image: imageDetails.fullFileName, updated_at: new Date()}, id);
                        return await responseServiceObj.sendResponse(res, {
                            msg: 'Department image uploaded successfully',
                            data: {
                                department: await DepartmentServiceObj.getById(id),
                                department_image_path: DEPARTMENT_IMAGE_PATH
                            }
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

    deleteImage(req, res, next) {
        try {
            let id = ObjectId(req.params.departmentId);
            let image_name = req.params.image;
            DepartmentServiceObj.isIdExists(id)
                    .then(async (isExists) => {
                        if (!isExists) {
                            throw 'Invalid department id';
                        }
                        return true;
                    })
                    .then(async(inResult) => {
                        let file = DEPARTMENT_IMAGE_UPLOAD_PATH + '/' + image_name;
                        if (!fs.existsSync(file)) {
                            throw 'File not exists.';
                        }
                        fs.unlinkSync(file);
                    })
                    .then(async (inResult) => {
                        let result = await DepartmentServiceObj.update({image: null}, id);
                        return await responseServiceObj.sendResponse(res, {
                            msg: 'Image deleted successfully',
                            data: {
                                department: await DepartmentServiceObj.getById(id),
                                department_image_path: DEPARTMENT_IMAGE_PATH
                            }
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

};