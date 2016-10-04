import {User} from "./User";

export class Project {
    projectId : string;
    projectName :  string;
    projectManager :  User | string;
    members : User[] | string[];
    updatedAt : string;
    createdAt :  string;
}