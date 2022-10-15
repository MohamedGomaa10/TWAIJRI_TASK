import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../_services/alertify.services';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
Model:any={};
  constructor(private authservice:AuthService,private alerty:AlertifyService) { }

  ngOnInit(): void {
  }

  Login(){
      this.authservice.login(this.Model).subscribe({
        next:()=>{this.alerty.showSuccess("Welcome","Welcom")},
      }
      )
  }

  LoggedIn(){
    const Token = localStorage.getItem('token');
    return !!Token;
  }

  newtoken:any = localStorage.getItem('token');

  LoggedOut(){
    localStorage.removeItem('token'); 
    console.log('تم الخروج');
  }
}
