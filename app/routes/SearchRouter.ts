import * as express from "express";
import {Project} from "../models/project";
import {User} from "../models/user";
import {utils} from "../utils/utils";
import {IUser} from "../utils/interfaces";

enum SearchType{
    USER_SEARCH,
    PROJECT_SEARCH
}

export const SearchRouter = express.Router();

SearchRouter.get("/", (req, res) =>{
    let searchTerm = "", searchType: SearchType;
    if(req.query.user){
        searchTerm = req.query.user;
        searchType = SearchType.USER_SEARCH;
    }else if(req.query.project){
        searchTerm = req.query.project;
        searchType = SearchType.PROJECT_SEARCH;
    }

    if(searchTerm && searchType === SearchType.PROJECT_SEARCH){
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
    }else if(searchTerm && searchType === SearchType.USER_SEARCH){
        User.find({
            empName : new RegExp(searchTerm,"i")
        }).exec()
        .then( (users: IUser[]) => {
            let response = [];
            if(users && users.length>0){
                for(let user of users){
                    response.push(Object.assign({}, utils.cleanObject(user, ["password"])));
                }
                res.json(response);
            }else{
                res.json(response);
            }
        }, err => {
            res.status(500);
            res.json(utils.sendBadRequestResponse(err));
        });
        
    }else{
        res.json([]);
    }
});