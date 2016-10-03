import { Component } from "@angular/core";

@Component({
  moduleId: module.id,
  selector: "project-bean-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  name: string = "App Component";
}
