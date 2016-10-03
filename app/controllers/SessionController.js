/// <reference path="../../typings/index.d.ts" />
var usersession_1 = require("../models/usersession");
var SessionController = (function () {
    function SessionController(userId, sessionId) {
        this.userId = userId;
        this.sessionId = sessionId;
    }
    SessionController.prototype.findSessionByUserName = function (username) {
        var _username = username ? username : this.userId;
        return usersession_1.UserSession.findOne({ username: _username })
            .exec();
    };
    SessionController.prototype.findSessionBySessionId = function (sessionId) {
        var _sessionId = sessionId ? sessionId : this.sessionId;
        return usersession_1.UserSession.findOne({ sessionId: _sessionId })
            .exec();
    };
    SessionController.prototype.createNewSession = function () {
        var _newSession = new usersession_1.UserSession({
            username: this.userId,
            sessionId: this.sessionId
        });
        return _newSession.save();
    };
    SessionController.prototype.updateUserSession = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            usersession_1.UserSession.findOne({ username: _this.userId })
                .exec()
                .then(function (userInfo) {
                if (userInfo) {
                    userInfo.sessionId = _this.sessionId;
                    userInfo.isActive = true;
                    userInfo.save(function (_err, _userInfo) {
                        if (_err) {
                            reject(_err);
                        }
                        else {
                            resolve(_userInfo);
                        }
                    });
                }
            }, function (err) {
                reject(err);
            });
        });
    };
    return SessionController;
})();
exports.SessionController = SessionController;
//# sourceMappingURL=SessionController.js.map