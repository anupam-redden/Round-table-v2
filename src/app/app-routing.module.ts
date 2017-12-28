import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CanActivateViaAuthGuard } from './guard/CanActivateViaAuthGuard';
import { EmployeeComponent } from './employee/employee.component';
import { AddEmployeeComponent } from './employee/add/add-employee.component';
import { EditEmployeeComponent } from './employee/edit/edit-employee.component';
import { ProjectComponent } from './project/project.component';
import { AddProjectComponent } from './project/add/add-project.component';
import { EditProjectComponent } from './project/edit/edit-project.component';
import { AssignComponent } from './project/assign/assign.component';
const routes:Routes = [
   {path:'',redirectTo:"login",pathMatch:'full'},
   {path:'login',component:AuthenticationComponent},
   {path:'logout/:islogout',component:AuthenticationComponent},
   {path:'dashboard',component:DashboardComponent,canActivate:[CanActivateViaAuthGuard]},
   {path:'epmloyee-list',component:EmployeeComponent,canActivate:[CanActivateViaAuthGuard]},
   {path:'epmloyee-add',component:AddEmployeeComponent,canActivate:[CanActivateViaAuthGuard]},
   {path:'epmloyee-edit/:index',component:EditEmployeeComponent,canActivate:[CanActivateViaAuthGuard]},
   {path:'project-list',component:ProjectComponent,canActivate:[CanActivateViaAuthGuard]},
   {path:'project-add',component:AddProjectComponent,canActivate:[CanActivateViaAuthGuard]},
   {path:'project-edit/:index',component:EditProjectComponent,canActivate:[CanActivateViaAuthGuard]},
   {path:'project-assign/:index',component:AssignComponent,canActivate:[CanActivateViaAuthGuard]}
   
];

@NgModule({
   imports : [RouterModule.forRoot(routes)],
   exports : [RouterModule]

})

export class AppRoutingModule{}