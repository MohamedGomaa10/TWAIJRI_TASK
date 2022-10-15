import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.services';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
Model:any={}
errorMessage:any
  constructor(private authservice:AuthService,private alerty:AlertifyService,private router:Router) { }

  ngOnInit(): void {
  }
Register(){
  this.authservice.register(this.Model).subscribe({
    next:()=>{this.alerty.showSuccess("Success","Register Done");
          this.router.navigate(["/Customers/GetCustomers"]);      
      },
      error:()=>{this.alerty.showError("Error","register Error")}
  }
  )
}
}
