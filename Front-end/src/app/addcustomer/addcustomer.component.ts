import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../_services/alertify.services';
import { Customer } from '../_services/models/Customer.model';
import { CustomerService } from '../_services/customerService/customer.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-addcustomer',
  templateUrl: './addcustomer.component.html',
  styleUrls: ['./addcustomer.component.css'],
})
export class AddcustomerComponent implements OnInit {
  Customer: any = {};
  constructor(
    private http: HttpClient,
    private alerty: AlertifyService,
    private _services: CustomerService,
    private route: Router
  ) {}

  ngOnInit(): void {}

  AddCustomer() {
    this._services.addCustomer(this.Customer).subscribe({
      next: () => {
        this.alerty.showSuccess('Success', 'Add Value Done'),
          this.route.navigate(['/Customers/GetCustomers']);
      },
    });
  }
}
