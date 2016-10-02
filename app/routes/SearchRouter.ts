import * as express from "express";
import {Project} from "../models/project";
import {utils} from "../utils/utils";

export const SearchRouter = express.Router();

SearchRouter.get("/", (req, res) =>{
    let searchTerm = "";
    if(req.query.q){
        searchTerm = req.query.q; 
    }

    if(searchTerm){
        Project.find({projectName : new RegExp(searchTerm,"i")})
        .exec()
        .then((projects) =>{
            let response = [];
            if(projects && projects.length>0){
                for(let project of projects){
                    response.push(Object.assign({}, utils.cleanObject(project)));
                }
                res.json(response);
            }else{
                res.json(response);
            }
        }, (err) =>{
            if(err){
                res.status(500);
                res.json(utils.sendBadRequestResponse(err));
            }
        });
    }else{
        res.json([]);
    }
});