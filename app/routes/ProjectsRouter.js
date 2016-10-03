var express = require("express");
var project_1 = require("../models/project");
var resources_1 = require("../models/resources");
var user_1 = require("../models/user");
var utils_1 = require("../utils/utils");
var ResourceController_1 = require("../controllers/ResourceController");
var multer = require("multer");
var fs = require("fs");
var AWS = require("aws-sdk");
AWS.config.loadFromPath("./config/awsConfig.json");
exports.ProjectsRouter = express.Router();
exports.ProjectsRouter.get("/", function (req, res) {
    project_1.Project.find({})
        .populate({ path: "projectManager", select: "_id emailId employeeId empName" })
        .populate({ path: "members", select: "_id emailId employeeId empName" })
        .exec()
        .then(function (projects) {
        var response = [];
        if (projects && projects.length > 0) {
            for (var _i = 0; _i < projects.length; _i++) {
                var project = projects[_i];
                response.push(Object.assign({}, utils_1.utils.cleanObject(project)));
            }
            res.json(response);
        }
        else {
            res.json(response);
        }
    }, function (err) {
        res.status(500);
        res.json(utils_1.utils.sendBadRequestResponse(err));
    });
});
exports.ProjectsRouter.get("/:projectId", function (req, res) {
    project_1.Project.find({ projectId: req.params.projectId })
        .populate({ path: "projectManager", select: "_id emailId employeeId empName" })
        .populate({ path: "members", select: "_id emailId employeeId empName" })
        .exec()
        .then(function (project) {
        var response = {};
        if (project) {
            response = Object.assign({}, utils_1.utils.cleanObject(project));
            res.json(response);
        }
        else {
            res.json(response);
        }
    }, function (err) {
        res.status(500);
        res.json(utils_1.utils.sendBadRequestResponse(err));
    });
});
exports.ProjectsRouter.get("/:projectId/resources", function (req, res) {
    project_1.Project.findOne({
        projectId: req.params.projectId
    }).exec()
        .then(function (project) {
        if (project) {
            resources_1.Resource.find({
                projectId: project.id
            })
                .populate({ path: "lastUpdatedBy", select: "empName employeeId emailId" })
                .exec()
                .then(function (resources) {
                var response = [];
                if (resources && resources.length > 0) {
                    for (var _i = 0; _i < resources.length; _i++) {
                        var resource = resources[_i];
                        response.push(Object.assign({}, utils_1.utils.cleanObject(resource)));
                    }
                    res.json(response);
                }
                else {
                    res.json(response);
                }
            }, function (err) {
                res.status(500);
                res.json(utils_1.utils.sendBadRequestResponse(err));
            });
        }
        else {
            res.status(500);
            res.json({ message: "No project with project Id ${req.params.projectId} found." });
        }
    }, function (err) {
        res.status(500);
        res.json(utils_1.utils.sendBadRequestResponse(err));
    });
});
exports.ProjectsRouter.get("/:projectId/resources/:resourceId", function (req, res) {
    project_1.Project.findOne({
        projectId: req.params.projectId
    }).exec()
        .then(function (project) {
        if (project) {
            resources_1.Resource.findOne({
                projectId: project.id,
                _id: req.params.resourceId
            })
                .populate({ path: "lastUpdatedBy", select: "empName employeeId emailId" })
                .exec()
                .then(function (resource) {
                var response = {};
                if (resource) {
                    var s3bucket = new AWS.S3({ params: { Bucket: "node1test" } });
                    var params = {
                        Key: resource.resourceName,
                    };
                    s3bucket.getSignedUrl("getObject", { Bucket: "node1test", Key: params.Key }, function (err, url) {
                        resource.resourceUrl = url;
                        response = Object.assign({}, utils_1.utils.cleanObject(resource));
                        res.json(response);
                    });
                }
                else {
                    response = { message: "No Resource with ID " + req.params.resourceId + " found under project " + req.params.projectId };
                    res.json(response);
                }
            }, function (err) {
                res.status(500);
                res.json(utils_1.utils.sendBadRequestResponse(err));
            });
        }
        else {
            res.status(500);
            res.json({ message: "No project with project Id " + req.params.projectId + " found." });
        }
    }, function (err) {
        res.status(500);
        res.json(utils_1.utils.sendBadRequestResponse(err));
    });
});
exports.ProjectsRouter.post("/", function (req, res) {
    var _error = false, _errMessage = [];
    if (!req.body.projectName) {
        _error = true;
        _errMessage.push({ message: "projectName parameter missing" });
    }
    if (!req.body.projectManager) {
        _error = true;
        _errMessage.push({ message: "projectManager parameter missing" });
    }
    if (req.body.members && !Array.isArray(req.body.members)) {
        _error = true;
        _errMessage.push({ message: "members parameter should be an array" });
    }
    if (_error) {
        res.status(500);
        res.json(utils_1.utils.sendBadRequestResponse(_errMessage));
        return;
    }
    if (req.body.members && req.body.members.length > 0) {
        user_1.User.find({
            _id: { $in: req.body.members }
        }).exec()
            .then(function () {
            _saveProject(req, res, false);
        }, function (err) {
            res.status(500);
            res.json(utils_1.utils.sendBadRequestResponse(err));
        });
    }
    else {
        _saveProject(req, res, false);
    }
});
exports.ProjectsRouter.put("/", function (req, res) {
    var _error = false, _errMessage = [];
    if (!req.body.projectName) {
        _error = true;
        _errMessage.push({ message: "projectName parameter missing" });
    }
    if (!req.body.projectManager) {
        _error = true;
        _errMessage.push({ message: "projectManager parameter missing" });
    }
    if (req.body.members && !Array.isArray(req.body.members)) {
        _error = true;
        _errMessage.push({ message: "members parameter should be an array" });
    }
    if (_error) {
        res.status(500);
        res.json(utils_1.utils.sendBadRequestResponse(_errMessage));
        return;
    }
    if (req.body.members && req.body.members.length > 0) {
        user_1.User.find({
            _id: { $in: req.body.members }
        }).exec()
            .then(function () {
            _saveProject(req, res, true);
        }, function (err) {
            res.status(500);
            res.json(utils_1.utils.sendBadRequestResponse(err));
        });
    }
    else {
        _saveProject(req, res, true);
    }
});
exports.ProjectsRouter.post("/:projectId/resources", multer({ dest: "./uploads/" }).any(), function (req, res) {
    var file = req.files[0];
    fs.readFile(file.path, function (err, data) {
        if (err) {
            res.status(500);
            res.json(utils_1.utils.sendBadRequestResponse(err));
        }
        var s3bucket = new AWS.S3({ params: { Bucket: "node1test" } });
        var params = {
            Key: file.originalname,
            Body: data
        };
        s3bucket.upload(params, function (_err, data) {
            // Whether there is an error or not, delete the temp file
            fs.unlink(file.path, function (error) {
                if (error) {
                    console.error(error);
                }
                console.log("Temp File Delete");
            });
            if (_err) {
                res.status(500);
                res.json(utils_1.utils.sendBadRequestResponse(_err));
            }
            else {
                user_1.User.findOne({
                    employeeId: req.session ? req.session.userID : "57f11008b9c2bfdc2cb30a6d"
                }).exec(function (userDetails) {
                    var userId = null;
                    if (userDetails) {
                        userId = userDetails.id;
                    }
                    project_1.Project.findOne({
                        projectId: req.params.projectId
                    }).exec()
                        .then(function (project) {
                        if (project) {
                            var resourceController = new ResourceController_1.ResourceController(params.Key, file.mimetype, project.id, userId, "", req.body.description);
                            resourceController.saveFile()
                                .then(function (fileDetails) {
                                var response = utils_1.utils.cleanObject(fileDetails);
                                res.json(response);
                            }, function (err) {
                                res.status(500);
                                res.json(utils_1.utils.sendBadRequestResponse(err));
                                s3bucket.deleteObject({ Key: file.originalname }, function (err) {
                                    if (err) {
                                        console.log(err);
                                    }
                                    else {
                                        console.log("file " + file.originalname + " deleted from s3 bucket.");
                                    }
                                });
                            });
                        }
                        else {
                            res.status(500);
                            res.json({ message: "No project with project Id ${req.params.projectId} found." });
                        }
                    }, function (err) {
                        res.status(500);
                        res.json(utils_1.utils.sendBadRequestResponse(err));
                    });
                }, function (___err) {
                    res.status(500);
                    res.json(utils_1.utils.sendBadRequestResponse(___err));
                });
            }
        });
    });
});
exports.ProjectsRouter.delete("/:projectId/resources/:resourceId", function (req, res) {
    project_1.Project.findOne({
        projectId: req.params.projectId
    }).exec()
        .then(function (project) {
        if (project) {
            resources_1.Resource.findOne({
                projectId: project.id,
                _id: req.params.resourceId
            })
                .exec()
                .then(function (resource) {
                var response = {};
                if (resource) {
                    var s3bucket = new AWS.S3({ params: { Bucket: "node1test" } });
                    var params = {
                        Key: resource.resourceName,
                    };
                    s3bucket.deleteObject(params, function (err) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            resources_1.Resource.findByIdAndRemove(req.params.resourceId).exec()
                                .then(function () {
                                res.json({ message: "resource " + resource.resourceName + " deleted successfully." });
                            }, function (err) {
                                res.status(500);
                                res.json(utils_1.utils.sendBadRequestResponse(err));
                            });
                        }
                    });
                }
                else {
                    response = { message: "No Resource with ID " + req.params.resourceId + " found under project " + req.params.projectId };
                    res.json(response);
                }
            }, function (err) {
                res.status(500);
                res.json(utils_1.utils.sendBadRequestResponse(err));
            });
        }
        else {
            res.status(500);
            res.json({ message: "No project with project Id ${req.params.projectId} found." });
        }
    }, function (err) {
        res.status(500);
        res.json(utils_1.utils.sendBadRequestResponse(err));
    });
});
exports.ProjectsRouter.delete("/:projectId", function (req, res) {
    var projectId = req.params.projectId;
    project_1.Project.findOneAndRemove({ projectId: projectId })
        .exec(function () {
        resources_1.Resource.find({ projectId: projectId })
            .exec(function (resources) {
            if (resources && resources.length > 0) {
                for (var _i = 0; _i < resources.length; _i++) {
                    var resource = resources[_i];
                    resource.remove(function (err) {
                        if (!err) {
                            var s3bucket = new AWS.S3({ params: { Bucket: "node1test" } });
                            var params = {
                                Key: resource.resourceName,
                            };
                            s3bucket.deleteObject(params, function (err) {
                                if (err) {
                                    console.log(err);
                                }
                            });
                        }
                    });
                }
            }
        }, function (err) {
            res.status(500);
            res.json(utils_1.utils.sendBadRequestResponse(err));
        });
        res.json({ mesaage: "project " + projectId + " deleted successfully" });
    }, function (err) {
        res.status(500);
        res.json(utils_1.utils.sendBadRequestResponse(err));
    });
});
function _saveProject(req, res, isUpdateOperation) {
    var projectId = utils_1.utils.UUID();
    var newProject = new project_1.Project({
        projectId: projectId,
        projectName: req.body.projectName,
        projectManager: req.body.projectManager,
        members: req.body.members && req.body.members.length > 0 ? req.body.members : []
    });
    newProject.save(function (err, project) {
        if (err) {
            res.status(500);
            res.json(utils_1.utils.sendBadRequestResponse(err));
        }
        else {
            var response = null;
            response = Object.assign({}, { message: isUpdateOperation ? "project updated successfully" : "project created successfully" }, utils_1.utils.cleanObject(project));
            var statusCode = isUpdateOperation ? 200 : 201;
            res.status(statusCode);
            res.json(response);
        }
    });
}
//# sourceMappingURL=ProjectsRouter.js.map