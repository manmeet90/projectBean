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
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var resource_component_1 = require("./components/project/resource.component");
var addmember_component_1 = require("./components/project/addmember.component");
var ProjectDetailRoutes = [
    {
        path: "",
        component: null
    },
    {
        path: "addresource",
        component: resource_component_1.AddResourceComponent
    },
    {
        path: "addmember",
        component: addmember_component_1.AddProjectMemberComponent
    }
];
var ProjectDetailModule = (function () {
    function ProjectDetailModule() {
    }
    ProjectDetailModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(ProjectDetailRoutes), common_1.CommonModule, http_1.HttpModule, forms_1.FormsModule, forms_1.ReactiveFormsModule],
            declarations: [resource_component_1.AddResourceComponent, addmember_component_1.AddProjectMemberComponent],
        }), 
        __metadata('design:paramtypes', [])
    ], ProjectDetailModule);
    return ProjectDetailModule;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ProjectDetailModule;
//# sourceMappingURL=projectdetail.module.js.map