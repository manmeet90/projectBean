import {User} from "./User";
import {Project} from "./Project";

export class Resource {
    resourceName : string;
    resourceType : number;
    mimeType: string;
    resourceUrl : string;
    description : string;
    lastUpdatedBy : User | string;
    projectId :  Project | string;
    updatedAt : string;
    createdAt :  string;
}