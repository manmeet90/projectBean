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
var http_1 = require("@angular/http");
var constants_1 = require("../constants");
require("rxjs/add/operator/toPromise");
var AuthenticationService = (function () {
    function AuthenticationService(http) {
        this.http = http;
    }
    AuthenticationService.prototype.login = function (credentials) {
        var loginUrl = constants_1.constants.baseURL + "auth/login";
        var payload = {
            username: credentials.employeeId,
            password: credentials.password
        };
        var _headers = new http_1.Headers({ "Content-Type": "application/json" });
        return this.http.post(loginUrl, JSON.stringify(payload), { headers: _headers })
            .toPromise()
            .then(function (response) {
            return response.json();
        }).catch(function (err) {
            return Promise.reject(err.json());
        });
    };
    AuthenticationService.prototype.register = function (user) {
        var loginUrl = constants_1.constants.baseURL + "auth/profile";
        var payload = {
            username: user.employeeId,
            password: user.password,
            email: user.emailId,
            empName: user.empName,
            jobTitle: user.jobTitle,
            contactNumber: user.contactNumber
        };
        var _headers = new http_1.Headers({ "Content-Type": "application/json" });
        return this.http.post(loginUrl, JSON.stringify(payload), { headers: _headers })
            .toPromise()
            .then(function (response) {
            return response.json();
        }).catch(function (err) {
            return Promise.reject(err.json());
        });
    };
    AuthenticationService.prototype.logout = function () {
        var logoutUrl = constants_1.constants.baseURL + "auth/logout";
        var _headers = new http_1.Headers({ "Content-Type": "application/json", "X-Session-Key": sessionStorage.getItem("sessionId") });
        return this.http.delete(logoutUrl, { headers: _headers })
            .toPromise()
            .then(function (response) {
            return response.json();
        }).catch(function (err) {
            return Promise.reject(err.json());
        });
    };
    AuthenticationService.prototype.sendEmail = function (email) {
        var fpUrl = constants_1.constants.baseURL + "auth/forgotpassword";
        var payload = {
            email: email,
        };
        var _headers = new http_1.Headers({ "Content-Type": "application/json" });
        return this.http.post(fpUrl, JSON.stringify(payload), { headers: _headers })
            .toPromise()
            .then(function (response) {
            return response.json();
        }).catch(function (err) {
            return Promise.reject(err.json());
        });
    };
    AuthenticationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AuthenticationService);
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=AuthenticationService.js.map