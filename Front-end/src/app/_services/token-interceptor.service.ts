import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest , HTTP_INTERCEPTORS} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   let Token = localStorage.getItem("token");
    console.log(Token);
   let jwttoken = req.clone({
    setHeaders: { Authorization: `Bearer ${Token}` }
    // setHeaders:{
      
    //   Authorization:'Bearer '+Token
    // }
   })
   return next.handle(jwttoken);
  }
}

export const TokenInterceptorProvidor={
  provide:HTTP_INTERCEPTORS,
  useClass:TokenInterceptorService,
  multi:true
}
