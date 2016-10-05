import * as express from "express";
import {Project} from "../models/project";
import {Resource} from "../models/resources";
import {User} from "../models/user";
import {utils} from "../utils/utils";
import {ResourceController} from "../controllers/ResourceController";
// import * as multer from "multer";
let multer = require("multer");
import * as fs from "fs";
import {IResourceModel} from "../utils/interfaces";
let AWS = require("aws-sdk");
AWS.config.loadFromPath("./config/awsConfig.json");


export const ProjectsRouter = express.Router();

ProjectsRouter.get("/", (req, res) =>{
    Project.find({})
    .populate({path: "projectManager", select : "_id emailId employeeId empName"})
    .populate({path: "members", select : "_id emailId employeeId empName"})
    .exec()
    .then(projects =>{
        let response = [];
        if(projects && projects.length>0){
            for(let project of projects){
                response.push(Object.assign({}, utils.cleanObject(project)));
            }
            res.json(response);
        }else{
            res.json(response);
        }
    }, err =>{
        res.status(500);
        res.json(utils.sendBadRequestResponse(err));
    });
});

ProjectsRouter.get("/recent", (req, res) =>{
    Project.find({})
    .sort({updatedAt:1})
    .limit(10)
    .populate({path: "projectManager", select : "_id emailId employeeId empName"})
    .populate({path: "members", select : "_id emailId employeeId empName"})
    .exec()
    .then(projects =>{
        let response = [];
        if(projects && projects.length>0){
            for(let project of projects){
                response.push(Object.assign({}, utils.cleanObject(project)));
            }
            res.json(response);
        }else{
            res.json(response);
        }
    }, err =>{
        res.status(500);
        res.json(utils.sendBadRequestResponse(err));
    });
});

ProjectsRouter.get("/:projectId", (req, res) =>{
    Project.findOne({projectId: req.params.projectId})
    .populate({path: "projectManager", select : "_id emailId employeeId empName"})
    .populate({path: "members", select : "_id emailId employeeId empName"})
    .exec()
    .then(project =>{
        let response = {};
        if(project){
            response = Object.assign({}, utils.cleanObject(project));
            res.json(response);
        }else{
            res.json(response);
        }
    }, err =>{
        res.status(500);
        res.json(utils.sendBadRequestResponse(err));
    });
});

ProjectsRouter.get("/:projectId/resources", (req, res) =>{
    Project.findOne({
        projectId : req.params.projectId
    }).exec()
    .then((project) => {
        if(project){
            Resource.find({
                projectId : project.id
            })
            .populate({ path: "lastUpdatedBy", select : "empName employeeId emailId"})
            .exec()
            .then(resources =>{
                let response = [];
                if(resources && resources.length>0){
                    for(let resource of resources){
                        response.push(Object.assign({}, utils.cleanObject(resource)));
                    }
                    res.json(response);
                }else{
                    res.json(response);
                }
            }, err =>{
                res.status(500);
                res.json(utils.sendBadRequestResponse(err));
            });
        }else{
            res.status(500);
            res.json({message: "No project with project Id ${req.params.projectId} found."});
        }
    }, (err) =>{
        res.status(500);
        res.json(utils.sendBadRequestResponse(err));
    });
    
});

ProjectsRouter.get("/:projectId/resources/:resourceId", (req, res) =>{
    Project.findOne({
        projectId : req.params.projectId
    }).exec()
    .then((project) => {
        if(project){
            Resource.findOne({
                projectId : project.id,
                _id :  req.params.resourceId
            })
            .populate({path:"lastUpdatedBy", select: "empName employeeId emailId"} )
            .exec()
            .then(resource =>{
                let response = {};
                if(resource){
                    let s3bucket = new AWS.S3({ params: {Bucket: "node1test"} });
                    let params = {
                        Key: resource.resourceName, // file.name doesn"t exist as a property
                    };
                    s3bucket.getSignedUrl("getObject", {Bucket: "node1test", Key: params.Key}, (err, url) =>{
                        resource.resourceUrl = url;
                        response = Object.assign({}, utils.cleanObject(resource));
                        res.json(response);
                    });
                }else{
                    response = {message : `No Resource with ID ${req.params.resourceId} found under project ${req.params.projectId}`};
                    res.json(response);
                }
            }, err =>{
                res.status(500);
                res.json(utils.sendBadRequestResponse(err));
            });
        }else{
            res.status(500);
            res.json({message: `No project with project Id ${req.params.projectId} found.`});
        }
    }, (err) =>{
        res.status(500);
        res.json(utils.sendBadRequestResponse(err));
    });
    
});

ProjectsRouter.post("/", (req, res) =>{
    let _error = false, _errMessage = [];
    if(!req.body.projectName){
        _error = true;
        _errMessage.push({message : "projectName parameter missing"});
    }
    if(!req.body.projectManager){
        _error = true;
        _errMessage.push({message : "projectManager parameter missing"});
    }
    if(req.body.members && !Array.isArray(req.body.members)){
        _error = true;
        _errMessage.push({message : "members parameter should be an array"});
    }   
    if(_error){
        res.status(500);
        res.json(utils.sendBadRequestResponse(_errMessage));
        return;
    }
    if(req.body.projectManager && req.body.members && !req.body.members.includes(req.body.projectManager)){
        req.body.members.push(req.body.projectManager);
    }
    if(req.body.members && req.body.members.length>0){
        User.find({
            _id : {$in: req.body.members}
        }).exec()
        .then(() => {
            _saveProject(req, res, false);
        }, (err) =>{
            res.status(500);
            res.json(utils.sendBadRequestResponse(err));
        });
    }else{
        _saveProject(req, res, false);
    }
    
});

ProjectsRouter.put("/", (req, res) => {
    let _error = false, _errMessage = [];
    if(!req.body.projectId){
        _error = true;
        _errMessage.push({message : "projectId parameter missing"});
    }
    
    if(req.body.members && !Array.isArray(req.body.members)){
        _error = true;
        _errMessage.push({message : "members parameter should be an array"});
    }   
    if(_error){
        res.status(500);
        res.json(utils.sendBadRequestResponse(_errMessage));
        return;
    }
    if(req.body.projectManager){
        if(req.body.members && req.body.members.indexOf(req.body.projectManager)===-1){
            req.body.members.push(req.body.projectManager);
        }else if(!req.body.members){
            req.body.members = [];
            req.body.members.push(req.body.projectManager);
        }
    }

    if(req.body.members && req.body.members.length>0){
        User.find({
            _id : {$in: req.body.members}
        }).exec()
        .then(() => {
            _saveProject(req, res, true);
        }, (err) =>{
            res.status(500);
            res.json(utils.sendBadRequestResponse(err));
        });
    }else{
        _saveProject(req, res, true);
    }
});

ProjectsRouter.post("/:projectId/resources", multer({ dest: "./uploads/"}).any(), (req, res) =>{
    let file = req.files[0];
    fs.readFile(file.path, function (err, data) {
        if (err) {
            res.status(500);
            res.json(utils.sendBadRequestResponse(err));  
        }
        
        let s3bucket = new AWS.S3({ params: {Bucket: "node1test"} });
        let params = {
            Key: file.originalname, // file.name doesn"t exist as a property
            Body: data
        };
        s3bucket.upload(params, function (_err, data) {
            // Whether there is an error or not, delete the temp file
            fs.unlink(file.path, function (error) {
                if (error) {
                    console.error(error);
                }
                console.log("Temp File Delete");
            });

            if (_err) {
                res.status(500);
                res.json(utils.sendBadRequestResponse(_err)); 
            } else {
                User.findOne({
                    employeeId: req.session ? req.session.userID : "57f11008b9c2bfdc2cb30a6d"
                }).exec((userDetails) =>{
                    let userId = null;
                    if(userDetails){
                        userId = userDetails.id;
                    }
                    Project.findOne({
                        projectId :  req.params.projectId
                    }).exec()
                    .then((project) =>{
                        if(project){
                            let resourceController = new ResourceController(params.Key, file.mimetype, project.id, userId, "", req.body.description);
                            resourceController.saveFile()
                            .then((fileDetails) =>{
                                let response = utils.cleanObject(fileDetails);
                                res.json(response);
                            }, (err) =>{
                                res.status(500);
                                res.json(utils.sendBadRequestResponse(err));
                                s3bucket.deleteObject({Key : file.originalname}, (err) =>{
                                    if(err){
                                        console.log(err);
                                    }else{
                                        console.log(`file ${file.originalname} deleted from s3 bucket.`);
                                    }
                                }); 
                            });
                        }else{
                            res.status(500);
                            res.json({message: "No project with project Id ${req.params.projectId} found."});
                        }
                    }, (err) =>{
                        res.status(500);
                        res.json(utils.sendBadRequestResponse(err));
                    }); 
                }, (___err) =>{
                    res.status(500);
                    res.json(utils.sendBadRequestResponse(___err));
                });
            }
        });
    });
});

ProjectsRouter.delete("/:projectId/resources/:resourceId", (req, res) => {
    Project.findOne({
        projectId : req.params.projectId
    }).exec()
    .then((project) => {
        if(project){
            Resource.findOne({
                projectId : project.id,
                _id :  req.params.resourceId
            })
            .exec()
            .then(resource =>{
                let response = {};
                if(resource){
                    let s3bucket = new AWS.S3({ params: {Bucket: "node1test"} });
                    let params = {
                        Key: resource.resourceName, // file.name doesn"t exist as a property
                    };
                    s3bucket.deleteObject(params, (err) =>{
                        if(err){
                            console.log(err);
                        }else{
                            Resource.findByIdAndRemove(req.params.resourceId).exec()
                            .then(() =>{
                                res.json({message: `resource ${resource.resourceName} deleted successfully.`});
                            }, (err) => {
                                res.status(500);
                                res.json(utils.sendBadRequestResponse(err));
                            });
                        }
                    });
                }else{
                    response = {message : `No Resource with ID ${req.params.resourceId} found under project ${req.params.projectId}`};
                    res.json(response);
                }
            }, err =>{
                res.status(500);
                res.json(utils.sendBadRequestResponse(err));
            });
        }else{
            res.status(500);
            res.json({message: "No project with project Id ${req.params.projectId} found."});
        }
    }, (err) =>{
        res.status(500);
        res.json(utils.sendBadRequestResponse(err));
    });
    
});

ProjectsRouter.delete("/:projectId", (req, res) =>{
    let projectId = req.params.projectId;
    Project.findOneAndRemove({projectId: projectId})
    .exec(() => {
        Resource.find({projectId: projectId})
        .exec((resources) => {
            if(resources && resources.length>0){
                for(let resource of resources){
                    resource.remove((err) =>{
                        if(!err){
                            let s3bucket = new AWS.S3({ params: {Bucket: "node1test"} });
                            let params = {
                                Key: resource.resourceName, // file.name doesn"t exist as a property
                            };
                            s3bucket.deleteObject(params, (err) =>{
                                if(err){
                                    console.log(err);
                                }
                            });
                        }
                    });
                }
            }
        }, (err) =>{
            res.status(500);
            res.json(utils.sendBadRequestResponse(err));    
        });
        res.json({mesaage: `project ${projectId} deleted successfully`});
    }, (err) =>{
        res.status(500);
        res.json(utils.sendBadRequestResponse(err));
    });
});

function _saveProject(req, res, isUpdateOperation){
    if(isUpdateOperation){
        Project.findOne({projectId: req.body.projectId})
        .exec()
        .then(project => {
            if(project){
                if(req.body.projectName){
                    project["projectName"] = req.body.projectName;
                }
                if(req.body.projectManager){
                    project["projectManager"] = req.body.projectManager;
                }
                if(req.body.members){
                    req.body.members.forEach(userId => {
                        if(project["members"] && project["members"].indexOf(userId)===-1){
                            project["members"].push(userId);
                        }else if(!project["members"]){
                            project["members"] = [];
                            project["members"].push(userId);
                        }
                    });
                } 
                
                project.save((err, projectInfo) => {
                    if(err){
                        res.status(500);
                        res.json(utils.sendBadRequestResponse(err));
                    }else{
                        let response = null;
                        response = Object.assign({}, utils.cleanObject(projectInfo));
                        let statusCode = 200;
                        res.status(statusCode);
                        res.json(response);
                    }
                });
            }else{
                res.status(500);
                res.json({message: `Project with ${req.body.projectId} not found.`});
            }
        }, err => {
            res.status(500);
            res.json(utils.sendBadRequestResponse(err));
        });
    }else{
        let projectId = utils.UUID();
        let newProject = new Project({
            projectId : projectId,
            projectName : req.body.projectName,
            projectManager : req.body.projectManager,
            members : req.body.members && req.body.members.length>0 ? req.body.members : []
        });

        newProject.save((err, project) => {
            if(err){
                res.status(500);
                res.json(utils.sendBadRequestResponse(err));
            }else{
                let response = null;
                response = Object.assign({}, utils.cleanObject(project));
                let statusCode = 201;
                res.status(statusCode);
                res.json(response);
            }
        });
    }
    
}