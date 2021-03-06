/// <reference path="../../typings/index.d.ts" />

import * as mongoose from "mongoose";
import {mongooseUtils} from "../utils/mongooseUtils";
import {IResourceModel} from "../utils/interfaces";

const ResourceSchema = new mongoose.Schema({
    resourceName : String,
    resourceType : {type: Number, default : 1},
    mimeType: String,
    resourceUrl : String,
    description : String,
    lastUpdatedBy : {type : mongoose.Schema.Types.ObjectId, ref : "User"},
    projectId :  {type : mongoose.Schema.Types.ObjectId, ref :  "Project"},
    updatedAt : String,
    createdAt :  String
});

ResourceSchema.pre("save", mongooseUtils.addDefaultCCUU);

export const Resource = mongoose.model<IResourceModel>("Resource", ResourceSchema);