import { Component, OnInit } from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Resource} from "../../models/Resource";
import {ProjectService} from "../../services/ProjectService"; 
import {Location} from "@angular/common";


@Component({
    moduleId: module.id,
    selector: "add-resource-form",
    templateUrl: "resource.component.html",
    providers:[ProjectService]
})
export class AddResourceComponent implements OnInit {
    projectId: string;
    lbl_description_field: string = "Description";

    enableUploadBtn : boolean = false;
    resource = {
        description : "",
        resourceFile : null
    };

    constructor(private location: Location, private route: ActivatedRoute, private projectService: ProjectService) {

     }

    ngOnInit() { 
        this.route.parent.params.subscribe(params => {
            this.projectId = params["projectId"];
        });
    }

    upload(){
        console.log(this.resource);
        this.projectService.addResourceToProject(this.projectId, this.resource.resourceFile, this.resource.description)
        .then(response => {
            alert("Resource uploaded successfully");
            this.location.back();
        }, err => {
            console.log(err);
        });
    }

    onFileChange(event: Event){
        let files = event.srcElement["files"];
        if(files && files[0]){
            this.resource.resourceFile = files[0];
            this.enableUploadBtn = true;
        }
    }
}