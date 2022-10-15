import { HttpClient } from '@angular/common/http';
import {Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.services';
import { InvoiceService } from '../_services/invoiceService/invoice.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ModalInvoiceComponent } from '../modal-invoice/modal-invoice.component';


@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  Invoices:any;
  dataSource!:MatTableDataSource<any>;
  columndefs : any[] = ['value', 'invoiceDate', 'state', 'cutomer', 'actions'];
  constructor(@Inject(MAT_DIALOG_DATA) public ivoiceData: any, public dialog: MatDialog,private http:HttpClient , private alerty:AlertifyService,private router:Router ,private route:ActivatedRoute, private _services:InvoiceService) { }

  ngOnInit(): void {
    this.GetAllInvoices();
  }

  GetAllInvoices() {
    this._services.getInvoices().subscribe({
      next: (invoice) => {
        this.Invoices = invoice
        this.dataSource = new MatTableDataSource(invoice);
      }
    })
  }

  EditInvoice(row:any){
    const dialogRef = this.dialog.open(ModalInvoiceComponent, {
      width: '450px',
      data: row
    });
    dialogRef.afterClosed().subscribe(res => {
      this.GetAllInvoices();
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalInvoiceComponent, {
      width: '450px',
      data: {}
    });
    
    dialogRef.afterClosed().subscribe(res => {
      this.GetAllInvoices();
    });
  }

  DeleteInvoice(id:number){
    this._services.DeleteInvoice(id).subscribe({
      next: () => {
        this.alerty.showSuccess('Success', 'Invoice Deleted')
        this.GetAllInvoices();
      },
    })
   }

}
