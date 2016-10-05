/// <reference path="../../typings/index.d.ts" />
"use strict";
var mongoose = require("mongoose");
var mongooseUtils_1 = require("../utils/mongooseUtils");
var UserSchema = new mongoose.Schema({
    employeeId: { type: String, unique: true },
    empName: { type: String },
    lastLogin: Number,
    password: String,
    emailId: { type: String, unique: true },
    jobTitle: String,
    contactNumber: Number,
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
    updatedAt: String,
    createdAt: String,
    isActive: { type: Boolean, default: true }
});
UserSchema.pre("save", mongooseUtils_1.mongooseUtils.addDefaultCCUU);
exports.User = mongoose.model("User", UserSchema);
//# sourceMappingURL=user.js.map