import { Component, OnInit } from "@angular/core";
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";
import {User} from "../../models/User";
import {AuthenticationService} from "../../services/AuthenticationService";
import {utils} from "../../utils";

@Component({
    moduleId: module.id,
    selector: "register",
    templateUrl: "forgotpassword.component.html",
    styleUrls: ["../app/app.component.css"],
    providers: [AuthenticationService]
})
export class ForgotPasswordComponent implements OnInit {
    cardTitle: string = "Forgot Password";
    lbl_email_field: string = "Email Id";
    lbl_goToLoginPage_link: string =  "Go To Login Page";
    fpForm: FormGroup;

    constructor(fb: FormBuilder, private authenticationService: AuthenticationService) {
        this.fpForm = fb.group({
            email : ["", [Validators.required, this.emailValidator]],
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
        if(this.fpForm){
            this.fpForm.reset();
        }
    }

    sendEmail(){
        if(this.fpForm){
            utils.showLoader();
            this.authenticationService.sendEmail(this.fpForm.controls["email"].value)
            .then( response => {
                utils.hideLoader();
                if(response){
                    alert("Email with your password sent successfully");
                    this.fpForm.reset();
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