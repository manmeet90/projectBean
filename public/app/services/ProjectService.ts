import { Injectable } from "@angular/core";
import { Headers, Http } from "@angular/http";
import {constants} from "../constants";
import {Project} from "../models/Project";
import {Resource} from "../models/Resource";

import "rxjs/add/operator/toPromise";

@Injectable()
export class ProjectService {

    constructor(private http: Http) { }

    getAllProjects(getRecentProjectsOnly){
        let serviceUrl = `${constants.baseURL}projects${getRecentProjectsOnly?"/recent":"" }`;
        let headers = new Headers({
            "Content-Type": "application/json",
            "X-Session-Key": sessionStorage.getItem("sessionId")
        });
        return this.http.get(serviceUrl, {headers: headers})
        .toPromise()
        .then(response => {
            return response.json();
        })
        .catch(err => {
            return Promise.reject(err.json());
        });
    }

    getProjectDetailsByProjectId(projectId: string){
        let serviceUrl = `${constants.baseURL}projects/${projectId}`;
        let headers = new Headers({
            "Content-Type": "application/json",
            "X-Session-Key": sessionStorage.getItem("sessionId")
        });
        return this.http.get(serviceUrl, {headers: headers})
        .toPromise()
        .then(response => {
            return response.json();
        })
        .catch(err => {
            return Promise.reject(err.json());
        });
    }

    getProjectResourcesByProjectId(projectId: string){
        let serviceUrl = `${constants.baseURL}projects/${projectId}/resources`;
        let headers = new Headers({
            "Content-Type": "application/json",
            "X-Session-Key": sessionStorage.getItem("sessionId")
        });
        return this.http.get(serviceUrl, {headers: headers})
        .toPromise()
        .then(response => {
            return response.json();
        })
        .catch(err => {
            return Promise.reject(err.json());
        });
    }

    addResourceToProject(projectId: string, file: File, description?: string){
        let serviceUrl = `${constants.baseURL}projects/${projectId}/resources`;
        let headers = new Headers({
            "X-Session-Key": sessionStorage.getItem("sessionId")
        });
        let formData = new FormData();
        formData.append("description",description);
        formData.append("resourceFile", file);
        return this.http.post(serviceUrl, formData ,{headers: headers})
        .toPromise()
        .then(response => {
            return response.json();
        })
        .catch(err => {
            return Promise.reject(err.json());
        });
    }

    getResourceDetails(projectId: string, resourceId: string){
        let serviceUrl = `${constants.baseURL}projects/${projectId}/resources/${resourceId}`;
        let headers = new Headers({
            "Content-Type": "application/json",
            "X-Session-Key": sessionStorage.getItem("sessionId")
        });
        return this.http.get(serviceUrl, {headers: headers})
        .toPromise()
        .then(response => {
            return response.json();
        })
        .catch(err => {
            return Promise.reject(err.json());
        });
    }
}