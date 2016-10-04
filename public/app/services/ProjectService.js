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
var ProjectService = (function () {
    function ProjectService(http) {
        this.http = http;
    }
    ProjectService.prototype.getAllProjects = function (getRecentProjectsOnly) {
        var serviceUrl = constants_1.constants.baseURL + "projects" + (getRecentProjectsOnly ? "/recent" : "");
        var headers = new http_1.Headers({
            "Content-Type": "application/json",
            "X-Session-Key": sessionStorage.getItem("sessionId")
        });
        return this.http.get(serviceUrl, { headers: headers })
            .toPromise()
            .then(function (response) {
            return response.json();
        })
            .catch(function (err) {
            return Promise.reject(err.json());
        });
    };
    ProjectService.prototype.getProjectDetailsByProjectId = function (projectId) {
        var serviceUrl = constants_1.constants.baseURL + "projects/" + projectId;
        var headers = new http_1.Headers({
            "Content-Type": "application/json",
            "X-Session-Key": sessionStorage.getItem("sessionId")
        });
        return this.http.get(serviceUrl, { headers: headers })
            .toPromise()
            .then(function (response) {
            return response.json();
        })
            .catch(function (err) {
            return Promise.reject(err.json());
        });
    };
    ProjectService.prototype.getProjectResourcesByProjectId = function (projectId) {
        var serviceUrl = constants_1.constants.baseURL + "projects/" + projectId + "/resources";
        var headers = new http_1.Headers({
            "Content-Type": "application/json",
            "X-Session-Key": sessionStorage.getItem("sessionId")
        });
        return this.http.get(serviceUrl, { headers: headers })
            .toPromise()
            .then(function (response) {
            return response.json();
        })
            .catch(function (err) {
            return Promise.reject(err.json());
        });
    };
    ProjectService.prototype.addResourceToProject = function (projectId, file, description) {
        var serviceUrl = constants_1.constants.baseURL + "projects/" + projectId + "/resources";
        var headers = new http_1.Headers({
            "X-Session-Key": sessionStorage.getItem("sessionId")
        });
        var formData = new FormData();
        formData.append("description", description);
        formData.append("resourceFile", file);
        return this.http.post(serviceUrl, formData, { headers: headers })
            .toPromise()
            .then(function (response) {
            return response.json();
        })
            .catch(function (err) {
            return Promise.reject(err.json());
        });
    };
    ProjectService.prototype.getResourceDetails = function (projectId, resourceId) {
        var serviceUrl = constants_1.constants.baseURL + "projects/" + projectId + "/resources/" + resourceId;
        var headers = new http_1.Headers({
            "Content-Type": "application/json",
            "X-Session-Key": sessionStorage.getItem("sessionId")
        });
        return this.http.get(serviceUrl, { headers: headers })
            .toPromise()
            .then(function (response) {
            return response.json();
        })
            .catch(function (err) {
            return Promise.reject(err.json());
        });
    };
    ProjectService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ProjectService);
    return ProjectService;
})();
exports.ProjectService = ProjectService;
//# sourceMappingURL=ProjectService.js.map