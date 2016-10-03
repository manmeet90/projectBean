var express = require("express");
var project_1 = require("../models/project");
var utils_1 = require("../utils/utils");
exports.SearchRouter = express.Router();
exports.SearchRouter.get("/", function (req, res) {
    var searchTerm = "";
    if (req.query.q) {
        searchTerm = req.query.q;
    }
    if (searchTerm) {
        project_1.Project.find({ projectName: new RegExp(searchTerm, "i") })
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
            if (err) {
                res.status(500);
                res.json(utils_1.utils.sendBadRequestResponse(err));
            }
        });
    }
    else {
        res.json([]);
    }
});
//# sourceMappingURL=SearchRouter.js.map