import { Injectable }    from "@angular/core";
import { Headers, Http } from "@angular/http";
import {constants} from "../constants";
import {User} from "../models/User";
import "rxjs/add/operator/toPromise";

export enum SearchType{
    USER_SEARCH,
    PROJECT_SEARCH
}

@Injectable()
export class SearchService {
    
    constructor(private http: Http){

    }

    search(searchterm: string, type: SearchType) {
        let searchUrl = `${constants.baseURL}search?${type === SearchType.USER_SEARCH? "user=" : "project="}${searchterm}`;
        
        let headers = new Headers({
            "Content-Type": "application/json",
            "X-Session-Key": sessionStorage.getItem("sessionId")
        });

        return this.http.get(searchUrl, {headers : headers})
        .toPromise()
        .then( response => {
            return response.json();
        }).catch(err => {
            return Promise.reject(err.json());
        });
    }

}