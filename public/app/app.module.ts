import { NgModule }      from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule }    from "@angular/http";
import { AppComponent }   from "./components/app/app.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {HomeComponent} from "./components/home/home.component";
import {ForgotPasswordComponent} from "./components/forgotpassword/forgotpassword.component";
import {ProjectDetailComponent} from "./components/project/project.detail.component";


import {appRouter} from "./routes/app.routes";

@NgModule({
  imports:      [ BrowserModule, HttpModule, FormsModule, ReactiveFormsModule, appRouter ],
  declarations: [ AppComponent, LoginComponent, RegisterComponent, ForgotPasswordComponent, HomeComponent, ProjectDetailComponent],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
