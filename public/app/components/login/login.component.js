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
var LoginComponent = (function () {
    function LoginComponent(fb) {
        this.cardTitle = "Login";
        this.lbl_username_field = "Employee ID";
        this.lbl_password_field = "Password";
        this.btn_login_text = "Login";
        this.lbl_forgotpassword_link = "Forgot password?";
        this.loginForm = fb.group({
            username: new forms_1.FormControl("", forms_1.Validators.compose([forms_1.Validators.required, this.validateUserName])),
            password: new forms_1.FormControl("", forms_1.Validators.required)
        });
    }
    // model : LoginModel = new LoginModel("","");
    LoginComponent.prototype.login = function (loginForm) {
        // if(isNaN(parseInt(this.model.username, 10))){
        //     loginForm.controls.username.invalid = true;
        //     loginForm.controls.username.errors.invalidusername = true;
        // }
        // console.log(this.model.username, this.model.password);
        console.log(loginForm);
    };
    LoginComponent.prototype.validateUserName = function (c) {
        return /^\d+$/.test(c.value) ? null : {
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
            styleUrls: ["../app/app.component.css"]
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder])
    ], LoginComponent);
    return LoginComponent;
})();
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map