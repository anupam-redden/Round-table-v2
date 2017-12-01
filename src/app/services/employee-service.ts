import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import {Response,Headers,RequestOptions,Http} from '@angular/http';
import { Config } from '../config';
import { Router } from "@angular/router"
import {AuthService} from './auth-service';

@Injectable()
export class EmployeeService {
  
  

  constructor(private http:HttpClient,private router:Router,private authservice:AuthService) { }

   
  getUserList(){
       
    return this.http.get(Config.api_url+"/users")
         
  } 

  getUserTypeList(){
    
    return this.http.get(Config.no_auth_url+"/usersType")
      
  }
  
  saveEmployee(emp_json){
    let param={emp_json:emp_json};
    return this.http.post(Config.api_url+"/saveUser",param)
  }
  

}
