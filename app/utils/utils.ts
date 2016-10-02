import {UserSession} from "../models/usersession";
import {IErrorObject, IResponse} from "./interfaces";


export const utils = {
    sendBadRequestResponse : (err: IErrorObject | Array<IErrorObject>) => {
        let response: IResponse = {
            code : 500,
            messages: []
        };
        if(err && !Array.isArray(err) && err.message){
            response.messages.push({message : err.message || "Something went Wrong.Try Later"});
        }else if(err && Array.isArray(err)){
            for(let _error of err){
                response.messages.push({message : _error.message});
            }
        }else{
            response.messages.push({message : "Something went Wrong.Try Later"});
        }

        return response;
    },

    UUID: function() {
        let d = new Date().getTime();
        
        let uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
            let r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c==="x" ? r : (r&0x3|0x8)).toString(16);
        });
        return uuid;
    },

    generateRandomPassword : function(){
        let s = "";
        while(s.length<6 && 9>0){
            let r = Math.random();
            s+= (r<0.1?Math.floor(r*100):String.fromCharCode(Math.floor(r*26) + (r>0.5?97:65)));
        }
        return s;
        
    },

    cleanObject: (_obj: any, paramsArray?: [string])=>{
        if(_obj){
            let obj = _obj.toJSON();
            if(obj["__v"]){
                delete obj["__v"];
            }
            if(obj._id){
                obj.id = obj._id;
                delete obj._id;
            }

            if(paramsArray && paramsArray.length>0){
                for(let _key of paramsArray){
                    if(obj[_key]){
                        delete obj[_key];
                    }
                }
            }
            return obj;
        }
        return {};
    },

    checkForValidSessionMiddleware: function (req, res, next){
        let ROUTES_IGNORE = ["/auth/login", "/auth/fpassword","/auth/register"];
        let sessionIdInRequest = req.get("X-Session-Key");
        
        let _flag = false;
        if(req.method === "OPTIONS"){
            next();
        }else if(sessionIdInRequest){
            
            UserSession.findOne({sessionId:sessionIdInRequest}).exec()
            .then(function(session){
                if(session && session.username){
                    if(session.isActive === true){
                        req.session = {
                            sessionID : sessionIdInRequest,
                            userID : session.username
                        };
                        next();
                    }else{
                        res.status(500);
                        res.json({message: "Session Expired"});
                    }
                }else{
                    ROUTES_IGNORE.forEach((urlpattern) =>{
                        let _pattern = urlpattern.replace(/\//g,"\\/");
                        let regex = new RegExp(_pattern);
                        if(regex.test(req.path)){
                            _flag = true;
                        }
                    });

                    if(_flag === false){
                        res.status(401);
                        res.json({message: "Unauthorized access"});
                    }else{
                        next();
                    }
                }
            }, function(err){
                if(err === 422){
                    res.status(401);
                    res.json({message: "Unauthorized access"});
                }else{
                    res.status(500);
                    res.json(this.sendBadRequestResponse(err));    
                }
            });
        }else{
            ROUTES_IGNORE.forEach((urlpattern) =>{
                let _pattern = urlpattern.replace(/\//g,"\\/");
                let regex = new RegExp(_pattern);
                if(regex.test(req.path)){
                    _flag = true;
                }
            });

            if(_flag === false){
                res.status(401);
                res.json({message: "Unauthorized access"});
            }else{
                next();
            }
        }
    }
};