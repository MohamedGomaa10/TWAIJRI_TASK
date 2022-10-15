import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertifyService } from './alertify.services';
import { Categories } from './Categories.model';

import { Values } from './value.model';

@Injectable({
  providedIn: 'root'
})
export class ValuesService {
  baseUrl='https://localhost:44316/api/Values';
  secondbaseUrl='https://localhost:44300/api/';
  value :Values={
    id:0,
    name:''
  }
  constructor(private http:HttpClient , private alerty:AlertifyService,private router:Router , private route:ActivatedRoute) { }

  getValues():Observable<Values[]>{
   return this.http.get<Values[]>(this.baseUrl)
  }

getCategories():Observable<Categories[]>{
  let headers: HttpHeaders = new HttpHeaders();
  const token=localStorage.getItem('token');
  if(token==null){
    this.router.navigate(["/login"]);
  }
  headers = headers.append('Authorization',token!!); // Not added yet as this is the reason for the ques
  return this.http.get<Categories[]>(this.secondbaseUrl+'Categories',{headers})
}

getCategoriesByID(id:string):Observable<Categories>{
  return this.http.get<Categories>(this.secondbaseUrl+'/'+id)
}

  GetValuesByID(id:string):Observable<Values>{
    return this.http.get<Values>(this.baseUrl+'/'+id)
   }


   EditValue(id:Number , updateValue:Values):Observable<Values>{
    return this.http.put<Values>(this.baseUrl+'/'+id , updateValue);
   }

  
}
