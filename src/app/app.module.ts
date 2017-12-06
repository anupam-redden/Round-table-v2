import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AddEmployeeComponent } from './employee/add/add-employee.component';
import { EditEmployeeComponent } from './employee/edit/edit-employee.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeComponent } from './employee/employee.component';

import { AuthService }  from './services/auth-service';
import { EmployeeService }  from './services/employee-service';


import { Interseptor }  from './services/interceptor';
import { CanActivateViaAuthGuard } from './guard/CanActivateViaAuthGuard';


import { AppRoutingModule } from './app-routing.module';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SideMenuComponent,
    AuthenticationComponent,
    DashboardComponent,
    EmployeeComponent,
    AddEmployeeComponent,
    EditEmployeeComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    
    NgxMyDatePickerModule.forRoot()
   
  ],
  providers: [
              AuthService,
              CanActivateViaAuthGuard,
              EmployeeService,
              {
                provide: HTTP_INTERCEPTORS,
                useClass: Interseptor,
                multi: true
               }
            ],
  bootstrap: [AppComponent],
  schemas: [ ]
})
export class AppModule { }
