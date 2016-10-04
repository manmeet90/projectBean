var router_1 = require('@angular/router');
var login_component_1 = require("../components/login/login.component");
var register_component_1 = require("../components/register/register.component");
var home_component_1 = require("../components/home/home.component");
var project_detail_component_1 = require("../components/project/project.detail.component");
var resource_component_1 = require("../components/project/resource.component");
var appRoutes = [
    {
        path: 'login',
        component: login_component_1.LoginComponent
    },
    {
        path: "register",
        component: register_component_1.RegisterComponent
    },
    {
        path: "home",
        component: home_component_1.HomeComponent
    },
    {
        path: "project/:projectId",
        component: project_detail_component_1.ProjectDetailComponent,
        children: [
            {
                path: "",
                component: null
            },
            {
                path: "addresource",
                component: resource_component_1.AddResourceComponent
            }
        ]
    },
    {
        path: "**",
        redirectTo: "login"
    }
];
exports.appRouter = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routes.js.map