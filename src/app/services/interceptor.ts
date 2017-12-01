import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest,HttpErrorResponse,HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/do';
import {Router} from '@angular/router';


@Injectable()
export class Interseptor implements HttpInterceptor {

  constructor(private router:Router) { }

  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    if(!(typeof(localStorage.authtoken)=="undefined")){
      
      const authReq = req.clone({
        setHeaders: {
                        'Authorization': localStorage.authtoken
                               
                    }
      });
      return next.handle(authReq).do((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // do stuff with response if you want
          if(event.body.auth==false)
              this.router.navigate(['logout/1']);
             
        }
      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 403) {
            // redirect to the login route
            // or show a modal
            this.router.navigate(['logout/1']);
          }
        }
      });
    }

    return next.handle(req);
  }
}