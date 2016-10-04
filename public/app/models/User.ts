import {Project} from "./Project";

export class User {
    employeeId : string;
    empName :  string;
    lastLogin : number;
    password : string;
    emailId : string;
    jobTitle : string;
    contactNumber : number;
    projects : Project[] | string[];
    updatedAt : string;
    createdAt :  string;
    isActive : boolean
}