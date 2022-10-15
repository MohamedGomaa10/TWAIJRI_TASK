import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertifyService } from '../alertify.services';
import { Customer } from '../models/Customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  baseUrl='https://localhost:44345/api/Customers/';
  constructor(private http:HttpClient , private alerty:AlertifyService,private router:Router , private route:ActivatedRoute) 
  { }


  
getCategories():Observable<Customer[]>{
  let headers: HttpHeaders = new HttpHeaders();
  const token = localStorage.getItem('token');
  if(token == null){
    this.router.navigate(["/login"]);
  }
  headers = headers.append('Authorization',token!!);
  return this.http.get<Customer[]>(this.baseUrl, {headers})
}


addCustomer(customer:Customer):Observable<Customer>{
  return this.http.post<Customer>(this.baseUrl + 'AddCustomer', customer)
}

EditCustomer(customer:Customer,id:Number):Observable<Customer>{
return this.http.put<Customer>(this.baseUrl+'EditCustomer/'+id,customer)
}

DeleteCustomer(id:Number):Observable<any>{
  return this.http.delete<any>(this.baseUrl+id);
}
}
