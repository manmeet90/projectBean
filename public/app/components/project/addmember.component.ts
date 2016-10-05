import { Component, OnInit } from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/debounceTime";
import {FormControl, FormGroup, FormBuilder} from "@angular/forms";
import {SearchType, SearchService} from "../../services/SearchService";
import {ProjectService} from "../../services/ProjectService"; 
import {User} from "../../models/User";

@Component({
    moduleId: module.id,
    selector: "add-project-member",
    templateUrl: "addmember.component.html",
    providers : [SearchService, ProjectService]
})
export class AddProjectMemberComponent implements OnInit {
    
    projectId : string;
    addProjectMemberForm : FormGroup;
    autoCompleteResults : User[] = [];       
    selectedUsers : User[] = [];                 
    
    constructor(fb : FormBuilder,private router: Router, private route: ActivatedRoute, private searchService: SearchService, private projectService: ProjectService) {
        this.addProjectMemberForm = fb.group({
            searchTerm : ""
        });
     }

    ngOnInit() { 
        this.addProjectMemberForm.controls["searchTerm"].valueChanges
        .debounceTime(500)
        .distinctUntilChanged()
        .subscribe(value => {
            this.searchUserBySearchTerm(value);
        });

        this.route.parent.params.subscribe(params => {
            this.projectId = params["projectId"];
        });
    }

    searchUserBySearchTerm(searchTerm : string){
        if(searchTerm){
            this.searchService.search(searchTerm, SearchType.USER_SEARCH)
            .then( response => {
                this.autoCompleteResults = response.map( (user: User) => {
                    return {employeeId : user.employeeId, empName : user.empName, id: user["id"]};
                });
            }, err => {
                console.log(err);
            });
        }
    }

    addUserToList(){
        if(this.addProjectMemberForm.controls["searchTerm"].value){
            let empId = this.addProjectMemberForm.controls["searchTerm"].value.split(":")[1];
            let _users = this.autoCompleteResults.filter(v => {return v.employeeId === empId;});
            if(_users && _users[0]){
                let userAlreadyAdded = this.selectedUsers.findIndex(v => {return v.employeeId === _users[0].employeeId;});
                if(userAlreadyAdded === -1){
                    this.selectedUsers.push(_users[0]);
                }
            }
        }
    }

    removeUserFromSelectedList(empId: string){
        if(empId){
            let _idx = this.selectedUsers.findIndex(v => {return v.employeeId === empId;});
            if(_idx !== -1){
                this.selectedUsers.splice(_idx, 1);
            }
        }
    }

    addusersToProject(){
        if(this.selectedUsers && this.selectedUsers.length>0){
            let usersToAdd = this.selectedUsers.map(v => v["id"]);
            this.projectService.addmembersToProject(this.projectId, usersToAdd)
            .then(response => {
                alert("members added successfully to project");
                this.router.navigateByUrl(`/project/${this.projectId}`);
            }, err => {
                if(err.message){
                    alert(err.message);                  
                }
            });
        }
    }
}