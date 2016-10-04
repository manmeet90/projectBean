import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Project} from "../../models/Project";
import {Resource} from "../../models/Resource";
import {ProjectService} from "../../services/ProjectService"; 


@Component({
    moduleId: module.id,
    selector: 'project-detail',
    templateUrl: './project.detail.component.html',
    styleUrls: ['./project.detail.component.css'],
    providers: [ProjectService]
})
export class ProjectDetailComponent implements OnInit {
    projectId: string;
    projectDetails = {
        info : new Project(),
        resources : []
    };

    constructor(private route: ActivatedRoute, private projectService: ProjectService) { }

    ngOnInit() {
        $('.collapsible').collapsible({
            accordion : true // A setting that changes the collapsible behavior to expandable instead of the default accordion style
        });
        this.route.params.subscribe(params => {
            this.projectId = params["projectId"];
            this.getProjectDetails();
        });
    }

    getProjectDetails(){
        if(this.projectId){
            this.projectService.getProjectDetailsByProjectId(this.projectId)
            .then(response => {
                this.projectDetails.info = response;
                this.getProjectResources();
            }, err => {
                if(err.message){
                    alert(err.message);
                }
            });
        }
    }

    getProjectResources(){
        if(this.projectId){
            this.projectService.getProjectResourcesByProjectId(this.projectId)
            .then(response => {
                this.projectDetails.resources = response;
            }, err => {
                if(err.message){
                    console.log(err.message);
                }
            });
        }
    }

    downloadResource(resource){
        if(this.projectId && resource.id){
            this.projectService.getResourceDetails(this.projectId, resource.id)
            .then(response => {
                if(response.resourceUrl){
                    let elem = document.createElement("a");
                    elem.href=response.resourceUrl;
                    elem.download = response.resourceName;
                    elem.click();
                    // $(elem).trigger('click');
                }else{
                    alert("resource URI not found");
                }
            }, err => {
                if(err.message){
                    console.log(err.message);
                }
            });
        }
    }
}