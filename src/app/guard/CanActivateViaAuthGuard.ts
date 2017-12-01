import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { AuthService } from "../services/auth-service"
import { Router } from "@angular/router"

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate{
    
    constructor(private authservice:AuthService,private router:Router){

    }
    
    canActivate(){
        if(!this.authservice.isLoggedin()){
            this.router.navigate(['login']);
            return false;
        }
            
        return this.authservice.isLoggedin();

    }
}