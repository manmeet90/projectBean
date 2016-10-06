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
var router_1 = require("@angular/router");
var AuthenticationService_1 = require("../../services/AuthenticationService");
var utils_1 = require("../../utils");
var AppComponent = (function () {
    function AppComponent(router, authenticationService) {
        var _this = this;
        this.router = router;
        this.authenticationService = authenticationService;
        this.name = "App Component";
        this.isLoggedIn = false;
        this.router.events.subscribe(function (evt) {
            // console.log(evt);
            if (sessionStorage.getItem("isLogged")) {
                _this.isLoggedIn = JSON.parse(sessionStorage.getItem("isLogged"));
            }
            if (evt.url === "/register" || evt.url === "/forgotpassword") {
                return;
            }
            if ((evt.url !== "/login") && !_this.isLoggedIn) {
                _this.router.navigateByUrl("/login");
            }
            else if (evt.url === "/login" && _this.isLoggedIn) {
                _this.router.navigateByUrl("/home");
            }
        });
    }
    AppComponent.prototype.ngOnInit = function () {
        //  $(".button-collapse").sideNav();
    };
    AppComponent.prototype.logout = function (evt) {
        var _this = this;
        evt.preventDefault();
        utils_1.utils.showLoader();
        this.authenticationService.logout()
            .then(function () {
            utils_1.utils.hideLoader();
            sessionStorage.removeItem("loggedInUser");
            sessionStorage.removeItem("sessionId");
            sessionStorage.setItem("isLogged", JSON.stringify(false));
            _this.router.navigateByUrl("/login");
        }, function (err) {
            utils_1.utils.hideLoader();
            alert(err.message);
        });
    };
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "project-bean-app",
            templateUrl: "./app.component.html",
            styleUrls: ["./app.component.css"],
            providers: [AuthenticationService_1.AuthenticationService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, AuthenticationService_1.AuthenticationService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map