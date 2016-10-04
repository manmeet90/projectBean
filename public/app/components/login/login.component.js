var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var AuthenticationService_1 = require("../../services/AuthenticationService");
var User_1 = require("../../models/User");
var router_1 = require("@angular/router");
var LoginComponent = (function () {
    function LoginComponent(fb, authenticationService, router) {
        this.authenticationService = authenticationService;
        this.router = router;
        this.cardTitle = "Login";
        this.lbl_username_field = "Employee ID";
        this.lbl_password_field = "Password";
        this.btn_login_text = "Login";
        this.lbl_forgotpassword_link = "Forgot password?";
        this.lbl_register_link = "Register";
        this.loginForm = fb.group({
            username: new forms_1.FormControl("", forms_1.Validators.compose([forms_1.Validators.required, this.validateUserName])),
            password: new forms_1.FormControl("", forms_1.Validators.required)
        });
    }
    LoginComponent.prototype.ngOnInit = function () {
        var isLogged = JSON.parse(sessionStorage.getItem("isLogged"));
        if (isLogged) {
            this.router.navigateByUrl("/home");
        }
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        var _user = new User_1.User();
        _user.employeeId = this.loginForm.controls["username"].value;
        _user.password = this.loginForm.controls["password"].value;
        this.authenticationService.login(_user)
            .then(function (loginResponse) {
            console.log(loginResponse);
            var userDetails = JSON.parse(JSON.stringify(loginResponse));
            delete userDetails.sessionId;
            sessionStorage.setItem("loggedInUser", JSON.stringify(userDetails));
            sessionStorage.setItem("isLogged", JSON.stringify(true));
            sessionStorage.setItem("sessionId", loginResponse.sessionId);
            _this.router.navigateByUrl("/home");
        }, function (err) {
            alert(err.message);
        });
    };
    LoginComponent.prototype.validateUserName = function (c) {
        return /^[0-9]+$/.test(c.value) ? null : {
            validateUserName: {
                valid: false
            }
        };
    };
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "login-box",
            templateUrl: "./login.component.html",
            styleUrls: ["../app/app.component.css"],
            providers: [AuthenticationService_1.AuthenticationService]
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, AuthenticationService_1.AuthenticationService, router_1.Router])
    ], LoginComponent);
    return LoginComponent;
})();
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map