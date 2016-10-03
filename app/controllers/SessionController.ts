/// <reference path="../../typings/index.d.ts" />

import {UserSession} from "../models/usersession";

export class SessionController {

    constructor(private userId: string, private sessionId?: string) {
        
    }

    findSessionByUserName(username?: string) {
        let _username = username ? username: this.userId;
        return UserSession.findOne({username : _username})
        .exec();
    }

    findSessionBySessionId(sessionId?: string) {
        let _sessionId = sessionId ? sessionId: this.sessionId;
        return UserSession.findOne({sessionId : _sessionId})
        .exec();
    }

    createNewSession() {
        let _newSession = new UserSession({
            username : this.userId,
            sessionId : this.sessionId
        });

        return _newSession.save();
    }

    updateUserSession() {
        return new Promise((resolve, reject) => {
            UserSession.findOne({username : this.userId})
            .exec()
            .then((userInfo) => {
                if(userInfo) {
                    userInfo.sessionId = this.sessionId;
                    userInfo.isActive = true;
                    userInfo.save((_err, _userInfo) => {
                        if(_err) {
                            reject(_err);
                        }else {
                            resolve(_userInfo);
                        }
                    });
                }
            }, (err) =>{
                reject(err);
            });
        });
    }
}