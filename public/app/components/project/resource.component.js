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
var ProjectService_1 = require("../../services/ProjectService");
var common_1 = require("@angular/common");
var AddResourceComponent = (function () {
    function AddResourceComponent(location, route, projectService) {
        this.location = location;
        this.route = route;
        this.projectService = projectService;
        this.lbl_description_field = "Description";
        this.enableUploadBtn = false;
        this.resource = {
            description: "",
            resourceFile: null
        };
    }
    AddResourceComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.parent.params.subscribe(function (params) {
            _this.projectId = params["projectId"];
        });
    };
    AddResourceComponent.prototype.upload = function () {
        var _this = this;
        console.log(this.resource);
        this.projectService.addResourceToProject(this.projectId, this.resource.resourceFile, this.resource.description)
            .then(function (response) {
            alert("Resource uploaded successfully");
            _this.location.back();
        }, function (err) {
            console.log(err);
        });
    };
    AddResourceComponent.prototype.onFileChange = function (event) {
        var files = event.srcElement["files"];
        if (files && files[0]) {
            this.resource.resourceFile = files[0];
            this.enableUploadBtn = true;
        }
    };
    AddResourceComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "add-resource-form",
            templateUrl: "resource.component.html"
        }), 
        __metadata('design:paramtypes', [common_1.Location, router_1.ActivatedRoute, ProjectService_1.ProjectService])
    ], AddResourceComponent);
    return AddResourceComponent;
}());
exports.AddResourceComponent = AddResourceComponent;
//# sourceMappingURL=resource.component.js.map