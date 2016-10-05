"use strict";
var express = require("express");
var project_1 = require("../models/project");
var user_1 = require("../models/user");
var utils_1 = require("../utils/utils");
var SearchType;
(function (SearchType) {
    SearchType[SearchType["USER_SEARCH"] = 0] = "USER_SEARCH";
    SearchType[SearchType["PROJECT_SEARCH"] = 1] = "PROJECT_SEARCH";
})(SearchType || (SearchType = {}));
exports.SearchRouter = express.Router();
exports.SearchRouter.get("/", function (req, res) {
    var searchTerm = "", searchType;
    if (req.query.user) {
        searchTerm = req.query.user;
        searchType = SearchType.USER_SEARCH;
    }
    else if (req.query.project) {
        searchTerm = req.query.project;
        searchType = SearchType.PROJECT_SEARCH;
    }
    if (searchTerm && searchType === SearchType.PROJECT_SEARCH) {
        project_1.Project.find({ projectName: new RegExp(searchTerm, "i") })
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
            if (err) {
                res.status(500);
                res.json(utils_1.utils.sendBadRequestResponse(err));
            }
        });
    }
    else if (searchTerm && searchType === SearchType.USER_SEARCH) {
        user_1.User.find({
            empName: new RegExp(searchTerm, "i")
        }).exec()
            .then(function (users) {
            var response = [];
            if (users && users.length > 0) {
                for (var _i = 0, users_1 = users; _i < users_1.length; _i++) {
                    var user = users_1[_i];
                    response.push(Object.assign({}, utils_1.utils.cleanObject(user, ["password"])));
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
        res.json([]);
    }
});
//# sourceMappingURL=SearchRouter.js.map