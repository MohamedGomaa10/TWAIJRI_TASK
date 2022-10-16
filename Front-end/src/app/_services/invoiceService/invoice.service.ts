import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from '../alertify.services';
import { Observable } from 'rxjs';
import { Invoice } from '../models/Invoice.model';
@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
baseUrl = "https://localhost:44345/api/Invoices/";
  constructor(private http:HttpClient , private alerty:AlertifyService,private router:Router , private route:ActivatedRoute) { }

  getInvoices():Observable<Invoice[]>{
    let headers: HttpHeaders = new HttpHeaders();
    const token = localStorage.getItem('token');
    if(token == null){
      this.router.navigate(["/login"]);
    }
    headers = headers.append('Authorization',token!!);
    return this.http.get<Invoice[]>(this.baseUrl + "GetAllInvoices", {headers})
  }
  
  // getInvoicesPaid():Observable<Invoice[]>{
  //   let headers: HttpHeaders = new HttpHeaders();
  //   const token = localStorage.getItem('token');
  //   if(token == null){
  //     this.router.navigate(["/login"]);
  //   }
  //   headers = headers.append('Authorization',token!!);
  //   return this.http.get<Invoice[]>(this.baseUrl + "GetInvoicesPaid", {headers})
  // }

  // getInvoicesUnPaid():Observable<Invoice[]>{
  //   let headers: HttpHeaders = new HttpHeaders();
  //   const token = localStorage.getItem('token');
  //   if(token == null){
  //     this.router.navigate(["/login"]);
  //   }
  //   headers = headers.append('Authorization',token!!);
  //   return this.http.get<Invoice[]>(this.baseUrl + "GetInvoicesUnPaid", {headers})
  // }
  
  getInvoicesState(id:number):Observable<Invoice[]>{
    let headers: HttpHeaders = new HttpHeaders();
    const token = localStorage.getItem('token');
    if(token == null){
      this.router.navigate(["/login"]);
    }
    headers = headers.append('Authorization',token!!);
    return this.http.get<Invoice[]>(this.baseUrl + "GetInvoicesState/"+id, {headers})
  }

  AddInvoice(customer:Invoice):Observable<Invoice>{
    return this.http.post<Invoice>(this.baseUrl + 'AddInvoice', customer)
  }

  EditInvoice(customer:Invoice , id:number):Observable<Invoice>{
    return this.http.put<Invoice>(this.baseUrl + 'EditInvoice/'+id, customer)
  }
  DeleteInvoice(id:number):Observable<any>{
    return this.http.delete<any>(this.baseUrl+id)
  }
}
