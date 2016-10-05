import { Component, OnInit } from "@angular/core";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/AuthenticationService";
import {utils} from "../../utils";

@Component({
  moduleId: module.id,
  selector: "project-bean-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers : [AuthenticationService]
})
export class AppComponent implements OnInit  {
  name: string = "App Component";
  isLoggedIn : boolean = false;
  
  constructor(private router: Router, private authenticationService : AuthenticationService){
    
    this.router.events.subscribe((evt) => {
        // console.log(evt);
        if(sessionStorage.getItem("isLogged")){
          this.isLoggedIn = JSON.parse(sessionStorage.getItem("isLogged"));
        }
        if(evt.url === "/register"){
            return;
        }
        if((evt.url !== "/login") && !this.isLoggedIn){
            this.router.navigateByUrl("/login");
        }else if(evt.url === "/login" && this.isLoggedIn){
            this.router.navigateByUrl("/home");
        }
    });
  }

  ngOnInit(){
    //  $(".button-collapse").sideNav();
  }

  logout(evt){
      evt.preventDefault();
      utils.showLoader();
      this.authenticationService.logout()
      .then(() => {
          utils.hideLoader();
          sessionStorage.removeItem("loggedInUser");
          sessionStorage.removeItem("sessionId");
          sessionStorage.setItem("isLogged", JSON.stringify(false));
          this.router.navigateByUrl("/login");
      }, err => {
        utils.hideLoader();
        alert(err.message);
      });
  }
}
