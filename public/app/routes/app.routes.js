"use strict";
var router_1 = require("@angular/router");
var login_component_1 = require("../components/login/login.component");
var register_component_1 = require("../components/register/register.component");
var home_component_1 = require("../components/home/home.component");
var project_detail_component_1 = require("../components/project/project.detail.component");
var forgotpassword_component_1 = require("../components/forgotpassword/forgotpassword.component");
var appRoutes = [
    {
        path: "login",
        component: login_component_1.LoginComponent
    },
    {
        path: "register",
        component: register_component_1.RegisterComponent
    },
    {
        path: "forgotpassword",
        component: forgotpassword_component_1.ForgotPasswordComponent
    },
    {
        path: "home",
        component: home_component_1.HomeComponent
    },
    {
        path: "project/:projectId",
        component: project_detail_component_1.ProjectDetailComponent,
        loadChildren: "app/projectdetail.module.js"
    },
    {
        path: "**",
        redirectTo: "login"
    }
];
exports.appRouter = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routes.js.map