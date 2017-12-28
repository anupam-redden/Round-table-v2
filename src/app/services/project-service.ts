import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import {Response,Headers,RequestOptions,Http} from '@angular/http';
import { Config } from '../config';
import { Router } from "@angular/router"
import {AuthService} from './auth-service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import {Project} from '../model/project';
import {User} from '../model/user';

@Injectable()
export class ProjectService {
  
  private messageSource = new BehaviorSubject<string>("");
  currentMessage = this.messageSource.asObservable();
  
  public project_data:Project[];
 
  constructor(private http:HttpClient,private router:Router,private authservice:AuthService) { }

   
  getProjectList(){
       
     this.http.get<Project[]>(Config.api_url+"/projects").subscribe(projects=>this.project_data=projects)
         
  } 
  
  saveProject(project_json){
  let param={project_json:project_json} 
  
  return this.http.post(Config.api_url+"/saveprojects",param);
      
  } 

  updateProject(project_json){
    let param={project_json:project_json} 
  
    return this.http.post(Config.api_url+"/updateprojects",param);
  }
  
  deleteProject(id:any){
    
    return this.http.get(Config.api_url+"/delete-project/"+id);
  }

  getAssignedUser(project_id:any){
    return this.http.get(Config.api_url+"/get-developer/"+project_id)
  }
  
  getFreeWorkers(ids){
    let param={ids:ids} 
    return this.http.post<User[]>(Config.api_url+"/get-free-worker/",param)
  }
  assignToProject(user_id:any,project_id:any){
    let param1={user_id:user_id,project_id:project_id} 
    let param={assign_info:param1}
    return this.http.post<User[]>(Config.api_url+"/assign-to-project/",param)
  }
  removeFromProject(user_id:any,project_id:any){
    
    return this.http.get(Config.api_url+"/remove-from-project/"+user_id+"/"+project_id)
  }
  
  sendMessage(message:string){
    this.messageSource.next(message);
  } 


}
