import { HttpClient } from '@angular/common/http';
import {AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.services';
import { CustomerService } from '../_services/customerService/customer.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  Customers:any;
  dataSource!:MatTableDataSource<any>;
  columndefs : any[] = ['customerName', 'phoneNumber','invoicesNumber', 'actions'];  
  constructor(public dialog: MatDialog,private http:HttpClient , private alerty:AlertifyService,private router:Router ,private route:ActivatedRoute, private _services:CustomerService) { }

 

  ngOnInit(): void {
    this.getCustomers();
  }
  token:any=localStorage.getItem('token');
  getCustomers() {
    this._services.getCategories().subscribe({
      next: (customer) => {
        if(this.token==null){
          this.alerty.showError("Error","Error")
        }
        this.Customers = customer
        this.dataSource = new MatTableDataSource(customer);
        console.log(this.token);
        
      }
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '450px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(res => {
      this.getCustomers();
    });
  }

  EditCustomer(row: any) {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '450px',
      data: row
    });
    dialogRef.afterClosed().subscribe(res => {
      this.getCustomers();
    });
  }
  DeleteCustomer(id: Number) {
    this._services.DeleteCustomer(id).subscribe({
      next: () => {
        this.alerty.showSuccess('Success', 'Customer Deleted')
        this.getCustomers();
      },
    })
  }
  

}
