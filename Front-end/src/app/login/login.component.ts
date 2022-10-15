import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.services';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authservice:AuthService,private alerty:AlertifyService,private router:Router) { }
  Model:any={};
  ngOnInit(): void {
  }

  Login(){
    this.authservice.login(this.Model).subscribe({
      next:()=>{this.alerty.showSuccess("Welcome","Welcom"),
      this.router.navigate(["/Customers/GetCustomers"]);},
      error:()=>{this.alerty.showError("Login Faild","Oops")}
    })
}



LoggedIn(){
  const Token = localStorage.getItem('token');
  return !!Token;
}

}
