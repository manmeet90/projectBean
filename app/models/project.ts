/// <reference path="../../typings/index.d.ts" />

import * as mongoose from "mongoose";
import {mongooseUtils} from "../utils/mongooseUtils";

const ProjectSchema = new mongoose.Schema({
    projectId : {type: String, unique: true},
    projectName :  {type : String, unique: true},
    projectManager :  {type : mongoose.Schema.Types.ObjectId, ref :  "User"},
    members : [ {type : mongoose.Schema.Types.ObjectId, ref : "User"} ],
    updatedAt : String,
    createdAt :  String
});

ProjectSchema.pre("save", mongooseUtils.addDefaultCCUU);

export const Project = mongoose.model("Project", ProjectSchema);