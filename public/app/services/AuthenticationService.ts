import { Injectable }    from "@angular/core";
import { Headers, Http } from "@angular/http";
import {constants} from "../constants";
import {User} from "../models/User";
import "rxjs/add/operator/toPromise";

@Injectable()
export class AuthenticationService {
    
    constructor(private http: Http){

    }

    login(credentials: User) {
        let loginUrl = `${constants.baseURL}auth/login`;
        let payload = {
            username : credentials.employeeId,
            password : credentials.password
        };
        let _headers = new Headers({"Content-Type": "application/json"});
        return this.http.post(loginUrl, JSON.stringify(payload), {headers : _headers})
        .toPromise()
        .then( response => {
            return response.json();
        }).catch(err => {
            return Promise.reject(err.json());
        });
    }

    register(user: User) {
        let loginUrl = `${constants.baseURL}auth/profile`;
        let payload = {
            username : user.employeeId,
            password : user.password,
            email : user.emailId,
            empName : user.empName,
            jobTitle : user.jobTitle,
            contactNumber : user.contactNumber
        };
        let _headers = new Headers({"Content-Type": "application/json"});
        return this.http.post(loginUrl, JSON.stringify(payload), {headers : _headers})
        .toPromise()
        .then( response => {
            return response.json();
        }).catch(err => {
            return Promise.reject(err.json());
        });
    }

    logout(){
        let logoutUrl = `${constants.baseURL}auth/logout`;
       
        let _headers = new Headers({"Content-Type": "application/json", "X-Session-Key": sessionStorage.getItem("sessionId")});
        return this.http.delete(logoutUrl, {headers : _headers})
        .toPromise()
        .then( response => {
            return response.json();
        }).catch(err => {
            return Promise.reject(err.json());
        });
    }
}