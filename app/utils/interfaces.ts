import * as mongoose from "mongoose";


export interface ILoginResponse {
    sessionId : string;
}

export interface IErrorObject{
    message ?: string;
}

export interface IResponse{
    messages : Array<IErrorObject>;
    code : number;
}

export interface ISession extends mongoose.Document {
    sessionId : string;
    isActive : boolean;
    username : string;
}

export interface IUser extends mongoose.Document{
    employeeId : string;
    empName : string;
    emailId: string;
    jobTitle : string;
    contactNumber: string;
}

export interface IResourceModel extends mongoose.Document{
    resourceName : string;
    resourceType : number;
    mimeType: string;
    resourceUrl : string;
    description : string;
}

