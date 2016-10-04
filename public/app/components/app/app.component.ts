import { Component, OnInit } from "@angular/core";

@Component({
  moduleId: module.id,
  selector: "project-bean-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit  {
  name: string = "App Component";

  ngOnInit(){
     $(".button-collapse").sideNav();
  }
}
