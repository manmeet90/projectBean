var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var ProjectService_1 = require("../../services/ProjectService");
var HomeComponent = (function () {
    function HomeComponent(projectService) {
        this.projectService = projectService;
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.projectService.getAllProjects(true)
            .then(function (response) {
            _this.projects = response;
        }, function (err) {
            console.log(err);
        });
    };
    HomeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "home",
            templateUrl: "./home.component.html",
            providers: [ProjectService_1.ProjectService],
            styleUrls: ["./home.component.css"]
        }), 
        __metadata('design:paramtypes', [ProjectService_1.ProjectService])
    ], HomeComponent);
    return HomeComponent;
})();
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map