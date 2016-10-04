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
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var app_component_1 = require("./components/app/app.component");
var login_component_1 = require("./components/login/login.component");
var register_component_1 = require("./components/register/register.component");
var home_component_1 = require("./components/home/home.component");
var project_detail_component_1 = require("./components/project/project.detail.component");
var resource_component_1 = require("./components/project/resource.component");
var app_routes_1 = require("./routes/app.routes");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, http_1.HttpModule, forms_1.FormsModule, forms_1.ReactiveFormsModule, app_routes_1.appRouter],
            declarations: [app_component_1.AppComponent, login_component_1.LoginComponent, register_component_1.RegisterComponent, home_component_1.HomeComponent, project_detail_component_1.ProjectDetailComponent, resource_component_1.AddResourceComponent],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
})();
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map