import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import {Response,Headers,RequestOptions,Http} from '@angular/http';
import { Config } from '../config';
import { Router } from "@angular/router"
import {AuthService} from './auth-service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {User} from '../model/user';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EmployeeService {
  
  private messageSource = new BehaviorSubject<string>("");
  currentMessage = this.messageSource.asObservable();
  
  public emp_data:User[];
  public bdm_data:User[];
  constructor(private http:HttpClient,private router:Router,private authservice:AuthService) { }

   
  getUserList(){
       
     this.http.get<User[]>(Config.api_url+"/users").subscribe(users=>this.emp_data=users)
         
  } 
  
  getUserByType(userType){
    
      this.http.get<User[]>(Config.api_url+"/get-user-by-type/"+userType).subscribe(users=>this.bdm_data=users)
      
  } 

  getUserTypeList(){
    
    return this.http.get(Config.no_auth_url+"/usersType")
      
  }
  
  saveEmployee(emp_json){
    let param={emp_json:emp_json};
    return this.http.post(Config.api_url+"/saveUser",param)
  }
  
  updateEmployee(emp_json){
    let param={emp_json:emp_json};
    return this.http.post(Config.api_url+"/updateUser",param)
  }
  
  deleteEmp(id:any){
    
    return this.http.get(Config.api_url+"/delete-user/"+id)
  }

  findUserByEmail(email:string){
    return this.http.get(Config.no_auth_url+"/getUserByEmail/"+email)
  }
  
  sendMessage(message:string){
    this.messageSource.next(message);
  } 
 

}
