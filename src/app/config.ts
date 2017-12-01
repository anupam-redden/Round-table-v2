import { Headers, RequestOptions } from '@angular/http';
export class Config{
  public static no_auth_url="http://localhost:5200";
  public static api_url="http://localhost:5200/api";
  public static headers = new Headers ({ 'Content-Type': 'application/json' }); 
  public static options = new RequestOptions({ headers: Config.headers});

}