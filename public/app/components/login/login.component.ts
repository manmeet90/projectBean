import { Component, OnInit } from "@angular/core";
import {LoginModel} from "./login.model";
import {FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";
import {AuthenticationService} from "../../services/AuthenticationService";
import {User} from "../../models/User";
import {Router} from "@angular/router";

@Component({
  moduleId: module.id,
  selector: "login-box",
  templateUrl: "./login.component.html",
  styleUrls: ["../app/app.component.css"],
  providers: [AuthenticationService]
})
export class LoginComponent  implements OnInit {

    cardTitle: string = "Login";
    lbl_username_field : string = "Employee ID";
    lbl_password_field: string = "Password";
    btn_login_text: string = "Login";
    lbl_forgotpassword_link: string = "Forgot password?";
    lbl_register_link: string = "Register";
    loginForm: FormGroup;

    constructor(fb:FormBuilder, private authenticationService: AuthenticationService, private router : Router){
        this.loginForm = fb.group({
            username : new FormControl("", Validators.compose([Validators.required, this.validateUserName])),
            password : new FormControl("", Validators.required)
        });
    }

    ngOnInit(){
        let isLogged = JSON.parse(sessionStorage.getItem("isLogged"));
        if(isLogged){
            this.router.navigateByUrl("/home");
        }
    }

    login(){
        let _user = new User();
        _user.employeeId = this.loginForm.controls["username"].value;
        _user.password = this.loginForm.controls["password"].value;
        this.authenticationService.login(_user)
        .then(loginResponse => {
            console.log(loginResponse);
            let userDetails =  JSON.parse(JSON.stringify(loginResponse));
            delete userDetails.sessionId;
            sessionStorage.setItem("loggedInUser", JSON.stringify(userDetails));
            sessionStorage.setItem("isLogged", JSON.stringify(true));
            sessionStorage.setItem("sessionId", loginResponse.sessionId);
            this.router.navigateByUrl("/home");
        }, (err) => {
            alert(err.message);
        });
    }

    validateUserName(c: FormControl){
        return /^[0-9]+$/.test(c.value) ? null : {
            validateUserName : {
                valid : false
            }
        };
    }
}
