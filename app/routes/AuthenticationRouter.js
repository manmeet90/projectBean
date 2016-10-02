"use strict";
var express = require("express");
var user_1 = require("../models/user");
var bcrypt = require("bcrypt-nodejs");
var utils_1 = require("../utils/utils");
var SessionController_1 = require("../controllers/SessionController");
var SALT_ROUNDS = process.env.BCRYPT_SALT || 17;
exports.AuthenticationRouter = express.Router();
exports.AuthenticationRouter.post("/login", function (req, res) {
    var _error = false, _errMessage = [];
    if (!req.body.username) {
        _error = true;
        _errMessage.push({ message: "username parameter missing" });
    }
    if (!req.body.password) {
        _error = true;
        _errMessage.push({ message: "password parameter missing" });
    }
    if (_error) {
        res.status(500);
        res.json(utils_1.utils.sendBadRequestResponse(_errMessage));
        return;
    }
    user_1.User.findOne({
        employeeId: req.body.username,
    }).exec()
        .then(function (userInfo) {
        if (userInfo) {
            if (bcrypt.compareSync(req.body.password, userInfo.password)) {
                // create new session or update existing user session
                var _newSessionId_1 = utils_1.utils.UUID();
                var sessionController_1 = new SessionController_1.SessionController(req.body.username, _newSessionId_1);
                sessionController_1.findSessionByUserName()
                    .then(function (user) {
                    if (user) {
                        sessionController_1.updateUserSession()
                            .then(function () {
                            var loginResponse = Object.assign({}, { sessionId: _newSessionId_1 }, utils_1.utils.cleanObject(userInfo, ["password"]));
                            res.json(loginResponse);
                        }, function (_err) {
                            res.json(utils_1.utils.sendBadRequestResponse(_err));
                        });
                    }
                    else {
                        sessionController_1.createNewSession()
                            .then(function () {
                            var loginResponse = Object.assign({}, { sessionId: _newSessionId_1 }, utils_1.utils.cleanObject(userInfo, ["password"]));
                            res.json(loginResponse);
                        }, function (_err) {
                            res.json(utils_1.utils.sendBadRequestResponse(_err));
                        });
                    }
                }, function (err) {
                    res.json(utils_1.utils.sendBadRequestResponse(err));
                });
            }
            else {
                res.status(500);
                res.json({ message: "Invalid Credentials" });
            }
        }
        else {
            res.status(500);
            res.json({ message: "User doesn't exist" });
        }
    }, function (err) {
        res.status(500);
        res.json(utils_1.utils.sendBadRequestResponse(err));
    });
});
exports.AuthenticationRouter.post("/fpassword", function (req, res) {
    var _error = false, _errMessage = [];
    if (!req.body.emailId) {
        _error = true;
        _errMessage.push({ message: "emailId parameter missing" });
    }
    if (_error) {
        res.status(500);
        res.json(utils_1.utils.sendBadRequestResponse(_errMessage));
        return;
    }
    user_1.User.findOne({ emailId: req.body.emailId })
        .exec()
        .then(function (_user) {
        if (_user) {
        }
        else {
            res.status(500);
            res.json({ message: "user with email id " + req.body.emailId + " not found." });
        }
    }, function (err) {
        res.status(500);
        res.json(utils_1.utils.sendBadRequestResponse(err));
    });
});
exports.AuthenticationRouter.delete("/logout", function (req, res) {
    if (req.session && req.session.sessionID) {
        var sessionController = new SessionController_1.SessionController(req.session.userID, req.session.sessionID);
        sessionController.findSessionBySessionId()
            .then(function (sessionDetails) {
            if (!sessionDetails) {
                res.status(500);
                res.json({ message: "No active session found" });
            }
            else if (sessionDetails && sessionDetails.username !== req.session.userID) {
                res.status(401);
                res.json({ message: "Unauthorized access" });
            }
            else {
                sessionDetails.isActive = false;
                sessionDetails.save(function (_err) {
                    if (_err) {
                        res.status(500);
                        res.json(utils_1.utils.sendBadRequestResponse(_err));
                    }
                    else {
                        res.json({ message: "user logged out successfully." });
                    }
                });
            }
        }, function (err) {
            res.status(500);
            res.json(utils_1.utils.sendBadRequestResponse(err));
        });
    }
    else {
        res.status(401);
        res.json({ message: "Unauthorized access" });
    }
});
exports.AuthenticationRouter.post("/register", function (req, res) {
    var _error = false, _errMessage = [];
    var emailRegex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
    if (!req.body.username) {
        _error = true;
        _errMessage.push({ message: "username parameter missing" });
    }
    if (!req.body.password) {
        _error = true;
        _errMessage.push({ message: "password parameter missing" });
    }
    if (!req.body.email) {
        _error = true;
        _errMessage.push({ message: "emailId parameter missing" });
    }
    else if (req.body.email && !emailRegex.test(req.body.email)) {
        _error = true;
        _errMessage.push({ message: "emailId paramter value is invalid" });
    }
    if (_error) {
        res.status(500);
        res.json(utils_1.utils.sendBadRequestResponse(_errMessage));
        return;
    }
    var salt = bcrypt.genSaltSync(SALT_ROUNDS);
    var hash = bcrypt.hashSync(req.body.password, salt);
    var _newUser = new user_1.User({
        employeeId: req.body.username,
        password: hash,
        emailId: req.body.email,
    });
    if (req.body.jobTitle) {
        _newUser.jobTitle = req.body.jobTitle;
    }
    if (req.body.contactNumber) {
        _newUser.contactNumber = req.body.contactNumber;
    }
    user_1.User.findOne({ employeeId: _newUser.employeeId })
        .exec()
        .then(function (_user) {
        if (_user) {
            res.json({ message: "username " + _newUser.employeeId + " already exists." });
        }
        else {
            _newUser.save(function (err, userInfo) {
                if (err) {
                    res.status(500);
                    res.json(utils_1.utils.sendBadRequestResponse(err));
                }
                else {
                    // generate new session key for user
                    var _newSessionId_2 = utils_1.utils.UUID();
                    var sessionController = new SessionController_1.SessionController(userInfo.employeeId, _newSessionId_2);
                    sessionController.createNewSession()
                        .then(function () {
                        var registerResponse = Object.assign({}, { sessionId: _newSessionId_2 }, utils_1.utils.cleanObject(userInfo, ["password"]));
                        res.json(registerResponse);
                    }, function (_err) {
                        res.status(500);
                        res.json(utils_1.utils.sendBadRequestResponse(_err));
                    });
                }
            });
        }
    }, function (__err) {
        res.status(500);
        res.json(utils_1.utils.sendBadRequestResponse(__err));
    });
});
//# sourceMappingURL=AuthenticationRouter.js.map