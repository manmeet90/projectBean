/// <reference path="../../typings/index.d.ts" />
var mongoose = require("mongoose");
var mongooseUtils_1 = require("../utils/mongooseUtils");
var ResourceSchema = new mongoose.Schema({
    resourceName: String,
    resourceType: { type: Number, default: 1 },
    mimeType: String,
    resourceUrl: String,
    description: String,
    lastUpdatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
    updatedAt: String,
    createdAt: String
});
ResourceSchema.pre("save", mongooseUtils_1.mongooseUtils.addDefaultCCUU);
exports.Resource = mongoose.model("Resource", ResourceSchema);
//# sourceMappingURL=resources.js.map