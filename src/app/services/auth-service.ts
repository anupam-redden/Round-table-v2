import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {Response,Headers,RequestOptions,Http} from '@angular/http';
import { Config } from '../config';
import { Router } from "@angular/router"
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {User} from '../model/user';
@Injectable()
export class AuthService {
  
  private messageSource = new BehaviorSubject<string>("");
  auth_user:User;
  currentMessage = this.messageSource.asObservable();

  constructor(private http:HttpClient,private router:Router) { }

   isLoggedin():boolean{
    let is_logged:boolean=false;
    
    if(localStorage.is_logged===undefined)
         is_logged=false;
    else if(localStorage.is_logged=="1")
         is_logged=true;
    else
         is_logged=false;        
    return is_logged;
  }
  
  logout():void{
    
    localStorage.is_logged=0;
    localStorage.removeItem("is_logged");
    localStorage.removeItem("authtoken");
    localStorage.removeItem("user");
    this.router.navigate(['login'])
  }


  authenticateCheck(email:string,password:string){
   
      let param={email:email,password:password};
      return this.http.post(Config.no_auth_url+"/authenticate",param);
  }
  
  getCurrentUser():any {
    
    return JSON.parse(localStorage.user);
  }
  sendMessage(message:string){
    this.messageSource.next(message);
  } 

}
