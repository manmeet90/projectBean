/// <reference path="../../typings/index.d.ts" />

import * as mongoose from "mongoose";
import {mongooseUtils} from "../utils/mongooseUtils";

const UserSessionSchema = new mongoose.Schema({
    username : {type: String},
    sessionId : String,
    updatedAt : String,
    createdAt :  String,
    isActive : {type : Boolean, default : true}
});

UserSessionSchema.pre("save", mongooseUtils.addDefaultCCUU);

export const UserSession = mongoose.model("UserSession", UserSessionSchema);