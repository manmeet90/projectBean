import { Component, OnInit } from '@angular/core';
import {ProjectService} from "../../services/ProjectService"; 
import {Project} from "../../models/Project";

@Component({
    moduleId: module.id,
    selector: 'home',
    templateUrl: './home.component.html',
    providers: [ProjectService],
    styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
    
    projects : Project[];

    constructor(private projectService: ProjectService) { }

    ngOnInit() { 
        this.projectService.getAllProjects(true)
        .then(response =>  {
            this.projects = response;
        }, err => {
            console.log(err);
        });
    }


}