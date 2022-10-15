import { Component, OnInit, Input, Inject } from '@angular/core';
import { InvoiceService } from '../_services/invoiceService/invoice.service';
import {MatDialog,MatDialogRef , MAT_DIALOG_DATA} from '@angular/material/dialog'; 
import { HttpClient } from '@angular/common/http';
import { AlertifyService } from '../_services/alertify.services';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';


@Component({
  selector: 'app-modal-invoice',
  templateUrl: './modal-invoice.component.html',
  styleUrls: ['./modal-invoice.component.css']
})
export class ModalInvoiceComponent implements OnInit {
  Invoice: any = {};
  invoiceForm !:FormGroup;
  actionBtn:string="Save"
  constructor(private _services:InvoiceService,
    private formBuilder:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public invoiceData: any,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ModalInvoiceComponent>,
    private http: HttpClient,
    private alerty: AlertifyService,
    private route: Router
    ) { }

  ngOnInit(): void {

    this.invoiceForm = this.formBuilder.group({
      invoiceDate:['', Validators.required],
      value:['', Validators.required],
      state:['', Validators.required]
    })
    
    if(this.invoiceData!=null){  
      this.invoiceForm.controls['invoiceDate'].setValue(this.invoiceData.invoiceDate);
      this.invoiceForm.controls['value'].setValue(this.invoiceData.value);
      this.invoiceForm.controls['state'].setValue(this.invoiceData.state);
    }
  }

  AddInvoice() {
    if(this.invoiceData.invoiceId == undefined){
      console.log(this.invoiceData.invoiceDate);
      this._services.AddInvoice(this.invoiceForm.value).subscribe({
        next: () => {
          this.alerty.showSuccess('Success', 'Add Invoice Done'),
            this.dialogRef.close();
        },
      });
    }else{
      this.UpdateInvoice();
    }
  }

  UpdateInvoice(){    
    this._services.EditInvoice(this.invoiceForm.value, this.invoiceData.invoiceId).subscribe({
      next: () => {
        this.alerty.showSuccess('Success', 'Add Invoice Done'),
          this.dialogRef.close();
      },
    });
  }


}
