import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest , HTTP_INTERCEPTORS} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertifyService } from './alertify.services';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private alerty:AlertifyService, private router:Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   let Token = localStorage.getItem("token");
  
   let jwttoken = req.clone({
    setHeaders: { Authorization: `Bearer ${Token}` }
   })
   if(!Token){
    this.router.navigate(["/login"]); 
   }
   return next.handle(jwttoken);
  }
}

export const TokenInterceptorProvidor={
  provide:HTTP_INTERCEPTORS,
  useClass:TokenInterceptorService,
  multi:true
}
