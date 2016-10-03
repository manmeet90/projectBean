import { Component } from "@angular/core";
import {LoginModel} from "./login.model";
import {FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";

@Component({
  moduleId: module.id,
  selector: "login-box",
  templateUrl: "./login.component.html",
  styleUrls: ["../app/app.component.css"]
})
export class LoginComponent {

    cardTitle: string = "Login";
    lbl_username_field : string = "Employee ID";
    lbl_password_field: string = "Password";
    btn_login_text: string = "Login";
    lbl_forgotpassword_link: string = "Forgot password?";
    loginForm: FormGroup;

    constructor(fb:FormBuilder){
        this.loginForm = fb.group({
            username : new FormControl("", Validators.compose([Validators.required, this.validateUserName])),
            password : new FormControl("", Validators.required)
        });
    }

    // model : LoginModel = new LoginModel("","");
    

    login(loginForm){
        // if(isNaN(parseInt(this.model.username, 10))){
        //     loginForm.controls.username.invalid = true;
        //     loginForm.controls.username.errors.invalidusername = true;
        // }
        // console.log(this.model.username, this.model.password);
        console.log(loginForm);
    }

    validateUserName(c: FormControl){
        return /^\d+$/.test(c.value) ? null : {
            validateUserName : {
                valid : false
            }
        }
    }
}
