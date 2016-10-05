/// <reference path="../../typings/index.d.ts" />
"use strict";
var mongoose = require("mongoose");
var mongooseUtils_1 = require("../utils/mongooseUtils");
var ProjectSchema = new mongoose.Schema({
    projectId: { type: String, unique: true },
    projectName: { type: String, unique: true },
    projectManager: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    updatedAt: String,
    createdAt: String
});
ProjectSchema.pre("save", mongooseUtils_1.mongooseUtils.addDefaultCCUU);
exports.Project = mongoose.model("Project", ProjectSchema);
//# sourceMappingURL=project.js.map