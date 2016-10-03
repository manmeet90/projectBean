import {Resource} from "../models/resources";

export class ResourceController{
    constructor(private resourceName: string, private mimeType: string, private projectId: string,
     private lastUpdatedBy?: string, private resourceUrl?: string, private description?: string){

    }

    saveFile(){
        let newResource = new Resource({
            resourceName : this.resourceName,
            mimeType : this.mimeType,
            resourceUrl: this.resourceUrl || "",
            projectId : this.projectId,
            lastUpdatedBy: this.lastUpdatedBy,
            description : this.description || "" 
        });

        return newResource.save();
    }

    getFileDetails(fileId: string, projectId: string){
        return Resource.findOne({_id: fileId, projectId: projectId}).exec();
    }

    deleteFile(fileId: string){
        return Resource.findByIdAndRemove(fileId).exec();
    }
}