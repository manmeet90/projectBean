import * as express from "express";
import {Project} from "../models/project";
import {Resource} from "../models/resources";
import {utils} from "../utils/utils";

export const ProjectsRouter = express.Router();

ProjectsRouter.get("/", (req, res) =>{
    Project.find({})
    .populate("projectManager")
    .populate("members")
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
    Project.find({projectId: req.params.projectId})
    .populate("projectManager")
    .populate("members")
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
    Resource.find({
        projectId : req.params.projectId
    })
    .populate("lastUpdatedBy", "empName", "employeeId","emailId")
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
});

ProjectsRouter.get("/:projectId/resources/:resourceId", (req, res) =>{
    Resource.find({
        projectId : req.params.projectId,
        _id :  req.params.resourceId
    })
    .populate("lastUpdatedBy", "empName", "employeeId", "emailId")
    .exec()
    .then(resource =>{
        let response = {};
        if(resource){
            response = Object.assign({}, utils.cleanObject(resource));
            res.json(response);
        }else{
            res.json(response);
        }
    }, err =>{
        res.status(500);
        res.json(utils.sendBadRequestResponse(err));
    });
});

ProjectsRouter.post("/:projectId/resources", (req, res) =>{

});

ProjectsRouter.delete("/:projectId/resources/:resourceId", (req, res) =>{

});

ProjectsRouter.delete("/:projectId", (req, res) =>{

});