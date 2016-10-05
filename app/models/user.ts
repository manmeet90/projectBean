/// <reference path="../../typings/index.d.ts" />

import * as mongoose from "mongoose";
import {mongooseUtils} from "../utils/mongooseUtils";
import {IUser} from "../utils/interfaces";

const UserSchema = new mongoose.Schema({
    employeeId : {type: String, unique: true},
    empName :  {type : String},
    lastLogin : Number,
    password : String,
    emailId : {type: String, unique:true},
    jobTitle : String,
    contactNumber : Number,
    projects : [ {type : mongoose.Schema.Types.ObjectId, ref : "Project"} ],
    updatedAt : String,
    createdAt :  String,
    isActive : {type : Boolean, default : true}
});

UserSchema.pre("save", mongooseUtils.addDefaultCCUU);

export const User = mongoose.model<IUser>("User", UserSchema);