import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class AlertifyService {
    /**
     *
     */
    constructor(private toastr:ToastrService) {
        
    }
    showSuccess(title:string,body:string) {
        this.toastr.success(body, title);
    }
    showError(title:string,body:string) {
        this.toastr.error(title, body);
    }
    showWaring(title:string,body:string) {
        this.toastr.warning(body, title);
    }
    showInfo(title:string,body:string) {
        this.toastr.info(body, title);
    }
    
}