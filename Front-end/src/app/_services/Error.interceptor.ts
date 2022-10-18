import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest, HttpErrorResponse, HTTP_INTERCEPTORS } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { AlertModule } from "ngx-bootstrap/alert";
import { AlertifyService } from "./alertify.services";


declare let alertify:any;
@Injectable({
    providedIn:'root'
})
export class ErrorInterseptor implements HttpInterceptor{
    /**
     *
     */
    constructor(private alertri:AlertifyService) {
        
    }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return next.handle(req)
        .pipe(
            catchError((error:HttpErrorResponse)=>{
                const errorMessage =this.setError(error);
                this.alertri.showError(errorMessage,"You must be Login");
                return throwError(()=>{errorMessage});
            })
        );
    }


    setError(error:HttpErrorResponse):string{
        let messageError='لا توجد بيانات';
        if(error.error instanceof ErrorEvent){
            messageError=error.error.message;
        }else{
            if(error.status!==0){
                messageError=error.error;
            }
        }
        return messageError;
    }
}
// import { Injectable } from "@angular/core";
// import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest, HttpErrorResponse, HTTP_INTERCEPTORS } from "@angular/common/http";
// import { observable, Observable, throwError } from "rxjs";
// import { catchError } from "rxjs/operators";
// @Injectable()
// export class ErrorInterseptor implements HttpInterceptor{
//     /**
//      *
//      */
//     // constructor(private alertify:AlertifyService) {}
//       intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
//         return next.handle(req).pipe(          
//             catchError(error  => {
//                 if(error instanceof HttpErrorResponse){
//                     const applicationError = error.headers.get('Application-Error');
//                     if(applicationError){
//                         console.error(applicationError);
//                         return  throwError(()=>applicationError);
//                         // throw new Error(applicationError);
                        
//                     }
//                     ///ModelState Errors
//                     const serverError = error.error;
//                     let modelStateErrors ='';
//                     if(serverError && typeof serverError==="object"){
//                         for (const key in serverError.errors) {
//                             if(serverError.errors[key]){
//                                 modelStateErrors += serverError.errors[key] + '\n';
//                             }
//                         }
//                          return throwError(()=>modelStateErrors)
//                     }
//                     //Unauthorized errors
//                     // if(error.status==401){
//                     //     return throwError(()=>{error.error});
//                     // }
//                     if(serverError && typeof serverError!=="object"){
//                         return throwError(()=>error.error);
//                     }
                    
//                     return throwError(()=>{ modelStateErrors || serverError || 'Server Error'})
//                 }
//                 return  throwError(()=>error.error);
//             }),
            
//         )
//     }
// }
export const ErrorInterceptorProvidor={
    provide:HTTP_INTERCEPTORS,
    useClass:ErrorInterseptor,
    multi:true
}