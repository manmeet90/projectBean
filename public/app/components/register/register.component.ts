import { Component, OnInit } from "@angular/core";
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";
import {User} from "../../models/User";
import {AuthenticationService} from "../../services/AuthenticationService";
import {utils} from "../../utils";

@Component({
    moduleId: module.id,
    selector: "register",
    templateUrl: "register.component.html",
    styleUrls: ["../app/app.component.css"],
    providers: [AuthenticationService]
})
export class RegisterComponent implements OnInit {
    cardTitle: string = "Register";
    lbl_employeeId_field : string = "Employee ID";
    lbl_password_field: string = "Password";
    lbl_email_field: string = "Email Id";
    lbl_empname_field: string = "Name";
    lbl_jobTitle_field: string = "Job Title";
    lbl_contactNumber_field: string = "Contact Number";
    btn_register_text: string = "Register";
    lbl_goToLoginPage_link: string =  "Go To Login Page";
    registerForm: FormGroup;

    constructor(fb: FormBuilder, private authenticationService: AuthenticationService) {
        this.registerForm = fb.group({
            username : ["", [Validators.required, Validators.pattern("^[0-9]+$")]],
            password : ["", [Validators.required]],
            email : ["", [Validators.required, this.emailValidator]],
            empName : ["", []],
            jobTitle : ["", []],
            contactNumber : ["", [Validators.pattern("^[0-9]{10}$")]],
        });
     }

    ngOnInit() { }

    emailValidator(c: FormControl){
        const emailRegex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
        return emailRegex.test(c.value) ? null : {
            validateEmail : {
                valid : false
            }
        };
    }

    resetForm(){
        if(this.registerForm){
            this.registerForm.reset();
        }
    }

    register(){
        if(this.registerForm){
            let newUser = new User();
            newUser.employeeId = this.registerForm.controls["username"].value;
            newUser.password = this.registerForm.controls["password"].value;
            newUser.emailId = this.registerForm.controls["email"].value;
            newUser.jobTitle = this.registerForm.controls["jobTitle"].value;
            newUser.contactNumber = this.registerForm.controls["contactNumber"].value;
            utils.showLoader();

            this.authenticationService.register(newUser)
            .then( response => {
                utils.hideLoader();
                if(response){
                    console.log(response);
                    alert("Registered successfully");
                    let userDetails =  JSON.parse(JSON.stringify(response));
                    delete userDetails.sessionId;
                    sessionStorage.setItem("loggedInUser", JSON.stringify(userDetails));
                    sessionStorage.setItem("isLogged", JSON.stringify(true));
                    sessionStorage.setItem("sessionId", response.sessionId);
                }
            }, err => {
                utils.hideLoader();
                if(err.message){
                    alert(err.message);
                }
            });

        }
    }
}