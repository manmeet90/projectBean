import { ModuleWithProviders }  from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import {LoginComponent} from "../components/login/login.component";
import {RegisterComponent} from "../components/register/register.component";
import {HomeComponent} from "../components/home/home.component";
import {ProjectDetailComponent} from "../components/project/project.detail.component";
import {ForgotPasswordComponent} from "../components/forgotpassword/forgotpassword.component";

const appRoutes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path : "register",
    component : RegisterComponent
  },
  {
    path : "forgotpassword",
    component : ForgotPasswordComponent
  },
  {
    path: "home",
    component : HomeComponent
  },
  {
    path : "project/:projectId",
    component : ProjectDetailComponent,
    loadChildren : "app/projectdetail.module.js" 
  },
  {
      path : "**",
      redirectTo : "login"
  }
];

export const appRouter: ModuleWithProviders = RouterModule.forRoot(appRoutes);
