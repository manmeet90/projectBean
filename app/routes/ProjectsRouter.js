"use strict";
var express = require("express");
var project_1 = require("../models/project");
var resources_1 = require("../models/resources");
var utils_1 = require("../utils/utils");
exports.ProjectsRouter = express.Router();
exports.ProjectsRouter.get("/", function (req, res) {
    project_1.Project.find({})
        .populate("projectManager")
        .populate("members")
        .exec()
        .then(function (projects) {
        var response = [];
        if (projects && projects.length > 0) {
            for (var _i = 0, projects_1 = projects; _i < projects_1.length; _i++) {
                var project = projects_1[_i];
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
        .populate("projectManager")
        .populate("members")
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
    resources_1.Resource.find({
        projectId: req.params.projectId
    })
        .populate("lastUpdatedBy", "empName", "employeeId", "emailId")
        .exec()
        .then(function (resources) {
        var response = [];
        if (resources && resources.length > 0) {
            for (var _i = 0, resources_2 = resources; _i < resources_2.length; _i++) {
                var resource = resources_2[_i];
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
});
exports.ProjectsRouter.get("/:projectId/resources/:resourceId", function (req, res) {
    resources_1.Resource.find({
        projectId: req.params.projectId,
        _id: req.params.resourceId
    })
        .populate("lastUpdatedBy", "empName", "employeeId", "emailId")
        .exec()
        .then(function (resource) {
        var response = {};
        if (resource) {
            response = Object.assign({}, utils_1.utils.cleanObject(resource));
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
exports.ProjectsRouter.post("/:projectId/resources", function (req, res) {
});
exports.ProjectsRouter.delete("/:projectId/resources/:resourceId", function (req, res) {
});
exports.ProjectsRouter.delete("/:projectId", function (req, res) {
});
//# sourceMappingURL=ProjectsRouter.js.map