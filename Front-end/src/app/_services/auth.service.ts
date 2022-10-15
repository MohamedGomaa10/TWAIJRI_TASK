import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Register } from './Register.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
baseUrl= 'https://localhost:44345/api/Auth/'
editValue:any
  constructor(private http:HttpClient) { }

  
 login(model:any){
    return this.http.post(this.baseUrl + 'login', model).pipe(
       map(
         (Response:any)=>{
           const user = Response;
           if(user){
             localStorage.setItem('token', user.token);  
           }
         }
       )
     )
   }

  register(register:Register):Observable<Register>{
    return this.http.post<Register>(this.baseUrl + 'register' , register).pipe();
  }

}
