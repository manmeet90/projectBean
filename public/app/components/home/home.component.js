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
var ProjectService_1 = require("../../services/ProjectService");
var router_1 = require("@angular/router");
require("rxjs/add/operator/distinctUntilChanged");
require("rxjs/add/operator/debounceTime");
var forms_1 = require("@angular/forms");
var SearchService_1 = require("../../services/SearchService");
var HomeComponent = (function () {
    function HomeComponent(fb, router, projectService, searchService) {
        this.router = router;
        this.projectService = projectService;
        this.searchService = searchService;
        this.autoCompleteResults = [];
        this.searchProjectForm = fb.group({
            searchTerm: ""
        });
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.projectService.getAllProjects(true)
            .then(function (response) {
            _this.recentProjects = response;
        }, function (err) {
            console.log(err);
        });
        this.searchProjectForm.controls["searchTerm"].valueChanges
            .debounceTime(500)
            .distinctUntilChanged()
            .subscribe(function (value) {
            _this.searchProjectBySearchTerm(value);
        });
    };
    HomeComponent.prototype.searchProjectBySearchTerm = function (searchTerm) {
        var _this = this;
        if (searchTerm) {
            this.searchService.search(searchTerm, SearchService_1.SearchType.PROJECT_SEARCH)
                .then(function (response) {
                _this.autoCompleteResults = response.map(function (project) {
                    return { projectId: project.projectId, projectName: project.projectName, id: project["id"] };
                });
            }, function (err) {
                console.log(err);
            });
        }
    };
    HomeComponent.prototype.goToProject = function () {
        if (this.searchProjectForm.controls["searchTerm"].value) {
            var projectId_1 = this.searchProjectForm.controls["searchTerm"].value.split(":")[1];
            var _projects = this.autoCompleteResults.filter(function (v) { return v.projectId === projectId_1; });
            if (_projects && _projects[0]) {
                this.router.navigateByUrl("/project/" + _projects[0].projectId);
            }
        }
    };
    HomeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "home",
            templateUrl: "./home.component.html",
            providers: [ProjectService_1.ProjectService, SearchService_1.SearchService],
            styleUrls: ["./home.component.css"]
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, router_1.Router, ProjectService_1.ProjectService, SearchService_1.SearchService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map