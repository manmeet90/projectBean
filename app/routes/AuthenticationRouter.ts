import * as express from "express";
import {User} from "../models/user";
const bcrypt = require("bcrypt-nodejs");
import {utils} from "../utils/utils";
import {SessionController} from "../controllers/SessionController";

const SALT_ROUNDS = 17;
export const AuthenticationRouter = express.Router();

interface ILoginResponse {
    sessionId : string;
}


AuthenticationRouter.post("/login", (req, res) => {
    let _error = false, _errMessage = [];
    if(!req.body.username){
        _error = true;
        _errMessage.push({message : "username parameter missing"});
    }
    if(!req.body.password){
        _error = true;
        _errMessage.push({message : "password parameter missing"});
    }
    if(_error){
        res.status(500);
        res.json(utils.sendBadRequestResponse(_errMessage));
        return;
    }

    User.findOne({
        employeeId : req.body.username,
    }).exec()
    .then((userInfo) => {
        if(userInfo){
            if(bcrypt.compareSync(req.body.password, userInfo.password)){
                 // create new session or update existing user session
                let _newSessionId = utils.UUID();
                let sessionController = new SessionController(req.body.username, _newSessionId);
                sessionController.findSessionByUserName()
                .then((user) =>{
                    if(user){
                        sessionController.updateUserSession()
                        .then(()=>{
                            let loginResponse : ILoginResponse = Object.assign({}, {sessionId : _newSessionId}, utils.cleanObject(userInfo,["password"]));
                            res.json(loginResponse);
                        }, (_err) =>{
                            res.json(utils.sendBadRequestResponse(_err));        
                        });
                    }else{
                        sessionController.createNewSession()
                        .then(()=>{
                            let loginResponse : ILoginResponse = Object.assign({}, {sessionId : _newSessionId}, utils.cleanObject(userInfo,["password"]));
                            res.json(loginResponse);
                        }, (_err) =>{
                            res.json(utils.sendBadRequestResponse(_err));        
                        });
                    }
                }, (err) =>{
                    res.json(utils.sendBadRequestResponse(err));
                });
            }else{
                res.status(500);
                res.json({message: "Invalid Credentials"});
            }
        }else{
            res.status(500);
            res.json({message: "User doesn't exist"});
        }
    }, (err) =>{
        res.status(500);
        res.json(utils.sendBadRequestResponse(err));
    });
});

AuthenticationRouter.post("/fpassword", (req, res) => {
    let _error = false, _errMessage = [];
    if(!req.body.emailId){
        _error = true;
        _errMessage.push({message : "emailId parameter missing"});
    }
    if(_error){
        res.status(500);
        res.json(utils.sendBadRequestResponse(_errMessage));
        return;
    }

    User.findOne({emailId : req.body.emailId})
    .exec()
    .then((_user) =>{
        if(_user){
            // send new Password to user mail.
            // utils.generateRandomPassword()
            
        }else{
            res.status(500);
            res.json({message: `user with email id ${req.body.emailId} not found.`});
        }
    }, (err) =>{
        res.status(500);
        res.json(utils.sendBadRequestResponse(err));
    });
});

AuthenticationRouter.delete("/logout", (req, res) =>{
    if(req.session && req.session.sessionID){
        let sessionController = new SessionController(req.session.userID, req.session.sessionID);
        sessionController.findSessionBySessionId()
        .then((sessionDetails) =>{
            if(!sessionDetails){
                res.status(500);
                res.json({message : "No active session found"});
            }else if(sessionDetails && sessionDetails.username !== req.session.userID){
                res.status(401);
                res.json({message: "Unauthorized access"});
            }else{
                sessionDetails.isActive = false;
                sessionDetails.save((_err) =>{
                    if(_err){
                        res.status(500);
                        res.json(utils.sendBadRequestResponse(_err));
                    }else{
                        res.json({message:"user logged out successfully."});
                    }
                });
            }
        }, (err) =>{
            res.status(500);
            res.json(utils.sendBadRequestResponse(err));
        });
    }else{
        res.status(401);
        res.json({message: "Unauthorized access"});
    }
});

AuthenticationRouter.post("/register", (req, res) =>{
    let _error = false, _errMessage = [];
    const emailRegex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
    if(!req.body.username){
        _error = true;
        _errMessage.push({message : "username parameter missing"});
    }
    if(!req.body.password){
        _error = true;
        _errMessage.push({message : "password parameter missing"});
    }
    if(!req.body.email){
        _error = true;
        _errMessage.push({message : "emailId parameter missing"});
    }else if(req.body.email && !emailRegex.test(req.body.email)){
        _error = true;
        _errMessage.push({message : "emailId paramter value is invalid"});
    }
    
    if(_error){
        res.status(500);
        res.json(utils.sendBadRequestResponse(_errMessage));
        return;
    }
    let salt = bcrypt.genSaltSync(SALT_ROUNDS);
    let hash = bcrypt.hashSync(req.body.password, salt);

    let _newUser : User = new User({
        employeeId : req.body.username,
        password : hash,
        emailId : req.body.email,
    });
    if(req.body.jobTitle){
        _newUser.jobTitle = req.body.jobTitle;
         
    }
    if(req.body.contactNumber){
        _newUser.contactNumber = req.body.contactNumber;
    }
    User.findOne({employeeId: _newUser.employeeId})
    .exec()
    .then((_user) =>{
        if(_user){
            res.json({message:`username ${_newUser.employeeId} already exists.`});
        }else{
            _newUser.save((err, userInfo) => {
                if(err){
                    res.status(500);
                    res.json(utils.sendBadRequestResponse(err));
                }else{
                    // generate new session key for user
                    let _newSessionId = utils.UUID();
                    let sessionController = new SessionController(userInfo.employeeId, _newSessionId);
                    sessionController.createNewSession()
                    .then(()=>{
                        let registerResponse : ILoginResponse = Object.assign({}, {sessionId : _newSessionId}, utils.cleanObject(userInfo,["password"]));
                        res.json(registerResponse);
                    }, (_err) =>{
                        res.status(500);
                        res.json(utils.sendBadRequestResponse(_err));        
                    });
                }
            });
        }
    }, (__err) =>{
        res.status(500);
        res.json(utils.sendBadRequestResponse(__err));
    });
    
});


