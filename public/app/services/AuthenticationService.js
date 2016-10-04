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
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var constants_1 = require("../constants");
require('rxjs/add/operator/toPromise');
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
    AuthenticationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AuthenticationService);
    return AuthenticationService;
})();
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=AuthenticationService.js.map