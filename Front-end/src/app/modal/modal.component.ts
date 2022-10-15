import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertifyService } from '../_services/alertify.services';
import { CustomerService } from '../_services/customerService/customer.service';
import { Router } from '@angular/router';
import {MatDialog,MatDialogRef , MAT_DIALOG_DATA} from '@angular/material/dialog'; 
import { FormGroup, Validators, FormBuilder} from '@angular/forms';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  Customer: any = {};
  customerForm !:FormGroup;
  actionBtn:string="Save"
  constructor(
    private _services:CustomerService,
    private formBuilder:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public customerData: any,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ModalComponent>,
    private http: HttpClient,
    private alerty: AlertifyService,
    private route: Router
    )
  { }

 

  ngOnInit() {
    this.customerForm = this.formBuilder.group({
      cutomerName: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    })

    if (this.customerData.customerId != null) {
      this.actionBtn="Update";
      console.log(this.customerData);
      
      this.customerForm.controls['cutomerName'].setValue(this.customerData.cutomerName);
      this.customerForm.controls['phoneNumber'].setValue(this.customerData.phoneNumber);
    }
  }
//Add New Customer
  AddCustomer() {
    this._services.addCustomer(this.Customer).subscribe({
      next: () => {
        this.alerty.showSuccess('Success', 'Add Value Done'),
        this.dialogRef.close();
      },
    });
  }
  AddInvoice() {
    if(this.customerData.customerId == null){
      this._services.addCustomer(this.customerForm.value).subscribe({
        next: () => {
          this.alerty.showSuccess('Success', 'Add Customer Done'),
            this.dialogRef.close();
        },
      });
    }else{
      this.UpdateCustomer();
    }
  }

  UpdateCustomer(){    
    this._services.EditCustomer(this.customerForm.value, this.customerData.customerId).subscribe({
      next: () => {
        this.alerty.showSuccess('Success', 'Edit Customer Done'),
          this.dialogRef.close();
      },
    });
  }
}
