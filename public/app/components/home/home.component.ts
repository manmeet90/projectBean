import { Component, OnInit } from "@angular/core";
import {ProjectService} from "../../services/ProjectService"; 
import {Project} from "../../models/Project";
import {Router} from "@angular/router";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/debounceTime";
import {FormControl, FormGroup, FormBuilder} from "@angular/forms";
import {SearchType, SearchService} from "../../services/SearchService";

@Component({
    moduleId: module.id,
    selector: "home",
    templateUrl: "./home.component.html",
    providers: [ProjectService, SearchService],
    styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
    
    recentProjects : Project[];
    searchProjectForm : FormGroup;
    autoCompleteResults : Project[] = [];

    constructor(fb : FormBuilder, private router: Router, private projectService: ProjectService, private searchService : SearchService) {
        this.searchProjectForm = fb.group({
            searchTerm : ""
        });
     }

    ngOnInit() { 
        this.projectService.getAllProjects(true)
        .then(response =>  {
            this.recentProjects = response;
        }, err => {
            console.log(err);
        });

        this.searchProjectForm.controls["searchTerm"].valueChanges
        .debounceTime(500)
        .distinctUntilChanged()
        .subscribe(value => {
            this.searchProjectBySearchTerm(value);
        });
    }

    searchProjectBySearchTerm(searchTerm : string){
        if(searchTerm){
            this.searchService.search(searchTerm, SearchType.PROJECT_SEARCH)
            .then( response => {
                this.autoCompleteResults = response.map( (project: Project) => {
                    return {projectId : project.projectId, projectName : project.projectName, id: project["id"]};
                });
            }, err => {
                console.log(err);
            });
        }
    }

    goToProject(){
        if(this.searchProjectForm.controls["searchTerm"].value){
            let projectId = this.searchProjectForm.controls["searchTerm"].value.split(":")[1];
            let _projects = this.autoCompleteResults.filter(v => {return v.projectId === projectId;});
            if(_projects && _projects[0]){
                this.router.navigateByUrl(`/project/${_projects[0].projectId}`);
            }
        }
    }

}