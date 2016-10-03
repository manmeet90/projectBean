/// <reference path="../../typings/index.d.ts" />
var mongoose = require("mongoose");
var mongooseUtils_1 = require("../utils/mongooseUtils");
var UserSessionSchema = new mongoose.Schema({
    username: { type: String },
    sessionId: String,
    updatedAt: String,
    createdAt: String,
    isActive: { type: Boolean, default: true }
});
UserSessionSchema.pre("save", mongooseUtils_1.mongooseUtils.addDefaultCCUU);
exports.UserSession = mongoose.model("UserSession", UserSessionSchema);
//# sourceMappingURL=usersession.js.map