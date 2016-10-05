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
(function (SearchType) {
    SearchType[SearchType["USER_SEARCH"] = 0] = "USER_SEARCH";
    SearchType[SearchType["PROJECT_SEARCH"] = 1] = "PROJECT_SEARCH";
})(exports.SearchType || (exports.SearchType = {}));
var SearchType = exports.SearchType;
var SearchService = (function () {
    function SearchService(http) {
        this.http = http;
    }
    SearchService.prototype.search = function (searchterm, type) {
        var searchUrl = constants_1.constants.baseURL + "search?" + (type === SearchType.USER_SEARCH ? "user=" : "project=") + searchterm;
        var headers = new http_1.Headers({
            "Content-Type": "application/json",
            "X-Session-Key": sessionStorage.getItem("sessionId")
        });
        return this.http.get(searchUrl, { headers: headers })
            .toPromise()
            .then(function (response) {
            return response.json();
        }).catch(function (err) {
            return Promise.reject(err.json());
        });
    };
    SearchService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], SearchService);
    return SearchService;
}());
exports.SearchService = SearchService;
//# sourceMappingURL=SearchService.js.map