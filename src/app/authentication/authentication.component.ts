import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth-service'

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  
  login_frm:FormGroup;
  email:string;
  password:string;
  emailValidateMsg="Please give an valid email";
  requiredMsg="This field is required";
  minlen8="Password min length 8";
  message="";
  constructor(private fb:FormBuilder,private router:Router,private authservice1:AuthService,private a_route:ActivatedRoute) {
    const pureEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      this.login_frm=this.fb.group({
        'email':[null,[Validators.required,Validators.pattern(pureEmail)]],
        'password':[null,[Validators.required]]

       });

   }
   
  ngOnInit() {
    this.a_route.params.subscribe(params=>{
      
        if(params.islogout=='1'){
             this.logout()
        }
    })
   
    if(this.authservice1.isLoggedin()){
     
       this.router.navigate(['dashboard']);
    }
  }

  authenticate(loginData):void{
    
     var email=loginData.email;
     var password= loginData.password;   
     this.authservice1.authenticateCheck(email,password)
                      .subscribe(data=>{
                                 
                                if(data['auth']=="1"){
                                    localStorage.is_logged=1
                                    localStorage.authtoken=data['token'];
                                    localStorage.user=JSON.stringify(data['user']);
                                    this.authservice1.auth_user=data['user'];
                                    
                                    this.router.navigate(['dashboard']);
                                 }
                                 else if(data['auth']=="0"){
                                     this.message="Wrong email or password"
                                 }
                                 else if(data['auth']=="-1"){
                                  this.message="Your account has suspended!!"
                                 }
                          });
  }

  
logout(){
    this.authservice1.logout()
}


}
