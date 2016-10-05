"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
require("rxjs/add/operator/distinctUntilChanged");
require("rxjs/add/operator/debounceTime");
var forms_1 = require("@angular/forms");
var SearchService_1 = require("../../services/SearchService");
var ProjectService_1 = require("../../services/ProjectService");
var AddProjectMemberComponent = (function () {
    function AddProjectMemberComponent(fb, router, route, searchService, projectService) {
        this.router = router;
        this.route = route;
        this.searchService = searchService;
        this.projectService = projectService;
        this.autoCompleteResults = [];
        this.selectedUsers = [];
        this.addProjectMemberForm = fb.group({
            searchTerm: ""
        });
    }
    AddProjectMemberComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.addProjectMemberForm.controls["searchTerm"].valueChanges
            .debounceTime(500)
            .distinctUntilChanged()
            .subscribe(function (value) {
            _this.searchUserBySearchTerm(value);
        });
        this.route.parent.params.subscribe(function (params) {
            _this.projectId = params["projectId"];
        });
    };
    AddProjectMemberComponent.prototype.searchUserBySearchTerm = function (searchTerm) {
        var _this = this;
        if (searchTerm) {
            this.searchService.search(searchTerm, SearchService_1.SearchType.USER_SEARCH)
                .then(function (response) {
                _this.autoCompleteResults = response.map(function (user) {
                    return { employeeId: user.employeeId, empName: user.empName, id: user["id"] };
                });
            }, function (err) {
                console.log(err);
            });
        }
    };
    AddProjectMemberComponent.prototype.addUserToList = function () {
        if (this.addProjectMemberForm.controls["searchTerm"].value) {
            var empId_1 = this.addProjectMemberForm.controls["searchTerm"].value.split(":")[1];
            var _users_1 = this.autoCompleteResults.filter(function (v) { return v.employeeId === empId_1; });
            if (_users_1 && _users_1[0]) {
                var userAlreadyAdded = this.selectedUsers.findIndex(function (v) { return v.employeeId === _users_1[0].employeeId; });
                if (userAlreadyAdded === -1) {
                    this.selectedUsers.push(_users_1[0]);
                }
            }
        }
    };
    AddProjectMemberComponent.prototype.removeUserFromSelectedList = function (empId) {
        if (empId) {
            var _idx = this.selectedUsers.findIndex(function (v) { return v.employeeId === empId; });
            if (_idx !== -1) {
                this.selectedUsers.splice(_idx, 1);
            }
        }
    };
    AddProjectMemberComponent.prototype.addusersToProject = function () {
        var _this = this;
        if (this.selectedUsers && this.selectedUsers.length > 0) {
            var usersToAdd = this.selectedUsers.map(function (v) { return v["id"]; });
            this.projectService.addmembersToProject(this.projectId, usersToAdd)
                .then(function (response) {
                alert("members added successfully to project");
                _this.router.navigateByUrl("/project/" + _this.projectId);
            }, function (err) {
                if (err.message) {
                    alert(err.message);
                }
            });
        }
    };
    AddProjectMemberComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "add-project-member",
            templateUrl: "addmember.component.html",
            providers: [SearchService_1.SearchService, ProjectService_1.ProjectService]
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, router_1.Router, router_1.ActivatedRoute, SearchService_1.SearchService, ProjectService_1.ProjectService])
    ], AddProjectMemberComponent);
    return AddProjectMemberComponent;
}());
exports.AddProjectMemberComponent = AddProjectMemberComponent;
//# sourceMappingURL=addmember.component.js.map