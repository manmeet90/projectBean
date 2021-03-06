import * as express from "express";
import {User} from "../models/user";
const bcrypt = require("bcrypt-nodejs");
import {utils} from "../utils/utils";
import {SessionController} from "../controllers/SessionController";
import {ILoginResponse, IUser} from "../utils/interfaces";
const postmark = require("postmark");

const SALT_ROUNDS = process.env.BCRYPT_SALT || 3;
export const AuthenticationRouter = express.Router();

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
            if(bcrypt.compareSync(req.body.password, userInfo["password"])){
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

AuthenticationRouter.post("/forgotpassword", (req, res) => {
    let _error = false, _errMessage = [];
    if(!req.body.email){
        _error = true;
        _errMessage.push({message : "emailId parameter missing"});
    }
    if(_error){
        res.status(500);
        res.json(utils.sendBadRequestResponse(_errMessage));
        return;
    }

    User.findOne({emailId : req.body.email})
    .exec()
    .then((_user : IUser) =>{
        if(_user){
            // send new Password to user mail.
            let _newPassword : string = utils.generateRandomPassword();
            let salt = bcrypt.genSaltSync(SALT_ROUNDS);
            let hash = bcrypt.hashSync(_newPassword, salt);
            _user.password = hash;
            _user.save((err) => {
                if(err){
                    res.status(500);
                    res.json(utils.sendBadRequestResponse(err));
                }else{

                }
            });
            const client = new postmark.Client(process.env.POSTMARK_API_KEY);
            
            client.sendEmail({
                "From": "manmeet.gupta@mobisoftinfotech.com", 
                "To": "manmeet.gupta@mobisoftinfotech.com", 
                "Subject": "New password for Project Bean", 
                "TextBody": `Hi ${_user.empName},\n
                Your new password is ${_newPassword}\n\n
                Regards\n
                ProjectBean Team`
            }, function(error, success) {
                if(error) {
                    console.error("Unable to send via postmark: " + error.message);
                    res.status(500);
                    res.json(utils.sendBadRequestResponse(error));
                }
                res.json({message: "Sent to postmark for delivery"});
            });

            
            
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
            }else if(sessionDetails && sessionDetails["username"] !== req.session.userID){
                res.status(401);
                res.json({message: "Unauthorized access"});
            }else{
                sessionDetails["isActive"] = false;
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

AuthenticationRouter.post("/profile", (req, res) =>{
    let _error = false, _errMessage = [];
    let isUpdateAction = req.query.update || false;

    const emailRegex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
    if(!req.body.username){
        _error = true;
        _errMessage.push({message : "username parameter missing"});
    }
    if(!req.body.password && !isUpdateAction){
        _error = true;
        _errMessage.push({message : "password parameter missing"});
    }
    if(!req.body.email && !isUpdateAction){
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

    let _newUser : IUser = new User({
        employeeId : req.body.username,
        empName : req.body.empName,
        emailId : req.body.email
    });
    if(!isUpdateAction){
        let salt = bcrypt.genSaltSync(SALT_ROUNDS);
        let hash = bcrypt.hashSync(req.body.password, salt);
        _newUser["password"] = hash;
    }
    if(req.body.jobTitle){
        _newUser["jobTitle"] = req.body.jobTitle;
    }
    if(req.body.contactNumber){
        _newUser["contactNumber"] = req.body.contactNumber;
    }
    User.findOne({employeeId: _newUser["employeeId"]})
    .exec()
    .then((_user) =>{
        if(_user && !isUpdateAction){
            res.json({message:`username ${_newUser["employeeId"]} already exists.`});
        }else{
            if(isUpdateAction){
                _user["empName"] =  _newUser["empName"];
                _user.jobTitle = _newUser.jobTitle;
                _user.contactNumber = _newUser.contactNumber;

                _user.save((err, userInfo) =>{
                    if(err){
                        res.status(500);
                        res.json(utils.sendBadRequestResponse(err));
                    }else{
                        let registerResponse : ILoginResponse = Object.assign({}, utils.cleanObject(userInfo,["password"]));
                        res.json(registerResponse);
                    }
                });
            }else{
                _newUser.save((err, userInfo: IUser) => {
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
                            res.status(201);
                            res.json(registerResponse);
                        }, (_err) =>{
                            res.status(500);
                            res.json(utils.sendBadRequestResponse(_err));        
                        });
                    }
                });
            }
        }
    }, (__err) =>{
        res.status(500);
        res.json(utils.sendBadRequestResponse(__err));
    });
    
});
