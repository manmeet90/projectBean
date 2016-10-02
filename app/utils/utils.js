"use strict";
var usersession_1 = require("../models/usersession");
exports.utils = {
    sendBadRequestResponse: function (err) {
        var response = {
            code: 500,
            messages: []
        };
        if (err && !Array.isArray(err) && err.message) {
            response.messages.push({ message: err.message || "Something went Wrong.Try Later" });
        }
        else if (err && Array.isArray(err)) {
            for (var _i = 0, err_1 = err; _i < err_1.length; _i++) {
                var _error = err_1[_i];
                response.messages.push({ message: _error.message });
            }
        }
        else {
            response.messages.push({ message: "Something went Wrong.Try Later" });
        }
        return response;
    },
    UUID: function () {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    },
    generateRandomPassword: function () {
        var s = "";
        while (s.length < 6 && 9 > 0) {
            var r = Math.random();
            s += (r < 0.1 ? Math.floor(r * 100) : String.fromCharCode(Math.floor(r * 26) + (r > 0.5 ? 97 : 65)));
        }
        return s;
    },
    cleanObject: function (_obj, paramsArray) {
        if (_obj) {
            var obj = _obj.toJSON();
            if (obj["__v"]) {
                delete obj["__v"];
            }
            if (obj._id) {
                obj.id = obj._id;
                delete obj._id;
            }
            if (paramsArray && paramsArray.length > 0) {
                for (var _i = 0, paramsArray_1 = paramsArray; _i < paramsArray_1.length; _i++) {
                    var _key = paramsArray_1[_i];
                    if (obj[_key]) {
                        delete obj[_key];
                    }
                }
            }
            return obj;
        }
        return {};
    },
    checkForValidSessionMiddleware: function (req, res, next) {
        var ROUTES_IGNORE = ["/auth/login", "/auth/fpassword", "/auth/register"];
        var sessionIdInRequest = req.get('X-Session-Key');
        var _flag = false;
        if (req.method == "OPTIONS") {
            next();
        }
        else if (sessionIdInRequest) {
            usersession_1.UserSession.findOne({ sessionId: sessionIdInRequest }).exec()
                .then(function (session) {
                if (session && session.username) {
                    if (session.isActive == true) {
                        req.session = {
                            sessionID: sessionIdInRequest,
                            userID: session.username
                        };
                        next();
                    }
                    else {
                        res.status(500);
                        res.json({ message: "Session Expired" });
                    }
                }
                else {
                    ROUTES_IGNORE.forEach(function (urlpattern) {
                        var _pattern = urlpattern.replace(/\//g, "\\/");
                        var regex = new RegExp(_pattern);
                        if (regex.test(req.path)) {
                            _flag = true;
                        }
                    });
                    if (_flag == false) {
                        res.status(401);
                        res.json({ message: "Unauthorized access" });
                    }
                    else {
                        next();
                    }
                }
            }, function (err) {
                if (err == 422) {
                    res.status(401);
                    res.json({ message: "Unauthorized access" });
                }
                else {
                    res.status(500);
                    res.json(this.sendBadRequestResponse(err));
                }
            });
        }
        else {
            ROUTES_IGNORE.forEach(function (urlpattern) {
                var _pattern = urlpattern.replace(/\//g, "\\/");
                var regex = new RegExp(_pattern);
                if (regex.test(req.path)) {
                    _flag = true;
                }
            });
            if (_flag == false) {
                res.status(401);
                res.json({ message: "Unauthorized access" });
            }
            else {
                next();
            }
        }
    }
};
//# sourceMappingURL=utils.js.map