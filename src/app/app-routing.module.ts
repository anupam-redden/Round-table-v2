import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CanActivateViaAuthGuard } from './guard/CanActivateViaAuthGuard';
import { EmployeeComponent } from './employee/employee.component';
import { AddEmployeeComponent } from './employee/add/add-employee.component';
import { EditEmployeeComponent } from './employee/edit/edit-employee.component';

const routes:Routes = [
   {path:'',redirectTo:"login",pathMatch:'full'},
   {path:'login',component:AuthenticationComponent},
   {path:'logout/:islogout',component:AuthenticationComponent},
   {path:'dashboard',component:DashboardComponent,canActivate:[CanActivateViaAuthGuard]},
   {path:'epmloyee-list',component:EmployeeComponent,canActivate:[CanActivateViaAuthGuard]},
   {path:'epmloyee-add',component:AddEmployeeComponent,canActivate:[CanActivateViaAuthGuard]},
   {path:'epmloyee-edit/:index',component:EditEmployeeComponent,canActivate:[CanActivateViaAuthGuard]}
   
];

@NgModule({
   imports : [RouterModule.forRoot(routes)],
   exports : [RouterModule]

})

export class AppRoutingModule{}