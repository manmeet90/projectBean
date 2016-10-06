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
var AuthenticationService_1 = require("../../services/AuthenticationService");
var utils_1 = require("../../utils");
var ForgotPasswordComponent = (function () {
    function ForgotPasswordComponent(fb, authenticationService) {
        this.authenticationService = authenticationService;
        this.cardTitle = "Forgot Password";
        this.lbl_email_field = "Email Id";
        this.lbl_goToLoginPage_link = "Go To Login Page";
        this.fpForm = fb.group({
            email: ["", [forms_1.Validators.required, this.emailValidator]],
        });
    }
    ForgotPasswordComponent.prototype.ngOnInit = function () { };
    ForgotPasswordComponent.prototype.emailValidator = function (c) {
        var emailRegex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
        return emailRegex.test(c.value) ? null : {
            validateEmail: {
                valid: false
            }
        };
    };
    ForgotPasswordComponent.prototype.resetForm = function () {
        if (this.fpForm) {
            this.fpForm.reset();
        }
    };
    ForgotPasswordComponent.prototype.sendEmail = function () {
        var _this = this;
        if (this.fpForm) {
            utils_1.utils.showLoader();
            this.authenticationService.sendEmail(this.fpForm.controls["email"].value)
                .then(function (response) {
                utils_1.utils.hideLoader();
                if (response) {
                    alert("Email with your password sent successfully");
                    _this.fpForm.reset();
                }
            }, function (err) {
                utils_1.utils.hideLoader();
                if (err.message) {
                    alert(err.message);
                }
            });
        }
    };
    ForgotPasswordComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "register",
            templateUrl: "forgotpassword.component.html",
            styleUrls: ["../app/app.component.css"],
            providers: [AuthenticationService_1.AuthenticationService]
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, AuthenticationService_1.AuthenticationService])
    ], ForgotPasswordComponent);
    return ForgotPasswordComponent;
}());
exports.ForgotPasswordComponent = ForgotPasswordComponent;
//# sourceMappingURL=forgotpassword.component.js.map