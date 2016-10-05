"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var User_1 = require("../../models/User");
var AuthenticationService_1 = require("../../services/AuthenticationService");
var utils_1 = require("../../utils");
var RegisterComponent = (function () {
    function RegisterComponent(fb, authenticationService) {
        this.authenticationService = authenticationService;
        this.cardTitle = "Register";
        this.lbl_employeeId_field = "Employee ID";
        this.lbl_password_field = "Password";
        this.lbl_email_field = "Email Id";
        this.lbl_empname_field = "Name";
        this.lbl_jobTitle_field = "Job Title";
        this.lbl_contactNumber_field = "Contact Number";
        this.btn_register_text = "Register";
        this.lbl_goToLoginPage_link = "Go To Login Page";
        this.registerForm = fb.group({
            username: ["", [forms_1.Validators.required, forms_1.Validators.pattern("^[0-9]+$")]],
            password: ["", [forms_1.Validators.required]],
            email: ["", [forms_1.Validators.required, this.emailValidator]],
            empName: ["", []],
            jobTitle: ["", []],
            contactNumber: ["", [forms_1.Validators.pattern("^[0-9]{10}$")]],
        });
    }
    RegisterComponent.prototype.ngOnInit = function () { };
    RegisterComponent.prototype.emailValidator = function (c) {
        var emailRegex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
        return emailRegex.test(c.value) ? null : {
            validateEmail: {
                valid: false
            }
        };
    };
    RegisterComponent.prototype.resetForm = function () {
        if (this.registerForm) {
            this.registerForm.reset();
        }
    };
    RegisterComponent.prototype.register = function () {
        if (this.registerForm) {
            var newUser = new User_1.User();
            newUser.employeeId = this.registerForm.controls["username"].value;
            newUser.password = this.registerForm.controls["password"].value;
            newUser.emailId = this.registerForm.controls["email"].value;
            newUser.jobTitle = this.registerForm.controls["jobTitle"].value;
            newUser.contactNumber = this.registerForm.controls["contactNumber"].value;
            utils_1.utils.showLoader();
            this.authenticationService.register(newUser)
                .then(function (response) {
                utils_1.utils.hideLoader();
                if (response) {
                    console.log(response);
                    alert("Registered successfully");
                    var userDetails = JSON.parse(JSON.stringify(response));
                    delete userDetails.sessionId;
                    sessionStorage.setItem("loggedInUser", JSON.stringify(userDetails));
                    sessionStorage.setItem("isLogged", JSON.stringify(true));
                    sessionStorage.setItem("sessionId", response.sessionId);
                }
            }, function (err) {
                utils_1.utils.hideLoader();
                if (err.message) {
                    alert(err.message);
                }
            });
        }
    };
    RegisterComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "register",
            templateUrl: "register.component.html",
            styleUrls: ["../app/app.component.css"],
            providers: [AuthenticationService_1.AuthenticationService]
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, AuthenticationService_1.AuthenticationService])
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map