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
var Project_1 = require("../../models/Project");
var ProjectService_1 = require("../../services/ProjectService");
var ProjectDetailComponent = (function () {
    function ProjectDetailComponent(route, projectService) {
        this.route = route;
        this.projectService = projectService;
        this.projectDetails = {
            info: new Project_1.Project(),
            resources: []
        };
    }
    ProjectDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        $(".collapsible").collapsible({
            accordion: true // A setting that changes the collapsible behavior to expandable instead of the default accordion style
        });
        this.route.params.subscribe(function (params) {
            _this.projectId = params["projectId"];
            _this.getProjectDetails();
        });
    };
    ProjectDetailComponent.prototype.getProjectDetails = function () {
        var _this = this;
        if (this.projectId) {
            this.projectService.getProjectDetailsByProjectId(this.projectId)
                .then(function (response) {
                _this.projectDetails.info = response;
                _this.getProjectResources();
            }, function (err) {
                if (err.message) {
                    alert(err.message);
                }
            });
        }
    };
    ProjectDetailComponent.prototype.getProjectResources = function () {
        var _this = this;
        if (this.projectId) {
            this.projectService.getProjectResourcesByProjectId(this.projectId)
                .then(function (response) {
                _this.projectDetails.resources = response;
            }, function (err) {
                if (err.message) {
                    console.log(err.message);
                }
            });
        }
    };
    ProjectDetailComponent.prototype.downloadResource = function (resource) {
        if (this.projectId && resource.id) {
            this.projectService.getResourceDetails(this.projectId, resource.id)
                .then(function (response) {
                if (response.resourceUrl) {
                    var elem = document.createElement("a");
                    elem.href = response.resourceUrl;
                    elem.download = response.resourceName;
                    elem.click();
                }
                else {
                    alert("resource URI not found");
                }
            }, function (err) {
                if (err.message) {
                    console.log(err.message);
                }
            });
        }
    };
    ProjectDetailComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "project-detail",
            templateUrl: "./project.detail.component.html",
            styleUrls: ["./project.detail.component.css"],
            providers: [ProjectService_1.ProjectService]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, ProjectService_1.ProjectService])
    ], ProjectDetailComponent);
    return ProjectDetailComponent;
}());
exports.ProjectDetailComponent = ProjectDetailComponent;
//# sourceMappingURL=project.detail.component.js.map