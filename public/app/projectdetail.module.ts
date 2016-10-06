import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule }    from "@angular/http";
import {AddResourceComponent} from "./components/project/resource.component";
import {AddProjectMemberComponent} from "./components/project/addmember.component";

const ProjectDetailRoutes: Routes = [
    {
        path: "",
        component : null
    },
    {
        path : "addresource",
        component : AddResourceComponent
    },
    {
        path: "addmember",
        component:  AddProjectMemberComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(ProjectDetailRoutes), CommonModule, HttpModule, FormsModule, ReactiveFormsModule],
    declarations: [AddResourceComponent, AddProjectMemberComponent],
})
export default class ProjectDetailModule { }
