"use strict";
var resources_1 = require("../models/resources");
var ResourceController = (function () {
    function ResourceController(resourceName, mimeType, projectId, lastUpdatedBy, resourceUrl, description) {
        this.resourceName = resourceName;
        this.mimeType = mimeType;
        this.projectId = projectId;
        this.lastUpdatedBy = lastUpdatedBy;
        this.resourceUrl = resourceUrl;
        this.description = description;
    }
    ResourceController.prototype.saveFile = function () {
        var newResource = new resources_1.Resource({
            resourceName: this.resourceName,
            mimeType: this.mimeType,
            resourceUrl: this.resourceUrl || "",
            projectId: this.projectId,
            lastUpdatedBy: this.lastUpdatedBy,
            description: this.description || ""
        });
        return newResource.save();
    };
    ResourceController.prototype.getFileDetails = function (fileId, projectId) {
        return resources_1.Resource.findOne({ _id: fileId, projectId: projectId }).exec();
    };
    ResourceController.prototype.deleteFile = function (fileId) {
        return resources_1.Resource.findByIdAndRemove(fileId).exec();
    };
    return ResourceController;
}());
exports.ResourceController = ResourceController;
//# sourceMappingURL=ResourceController.js.map