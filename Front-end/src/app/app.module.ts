import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ValueComponent } from './value/value.component';
import { NavComponent } from './nav/nav.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ErrorInterceptorProvidor, ErrorInterseptor } from './_services/Error.interceptor';
import { AlertifyService } from './_services/alertify.services';
import { AuthService } from './_services/auth.service';
import { ToastrModule } from 'ngx-toastr';
import { TokenInterceptorProvidor, TokenInterceptorService } from './_services/token-interceptor.service';
import { AddvaluesComponent } from './addvalues/addvalues.component';
import { EditvalueComponent } from './editvalue/editvalue.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { AgGridModule } from 'ag-grid-angular';
import { LoginComponent } from './login/login.component';
import { CustomerComponent } from './customer/customer.component';
import { AddcustomerComponent } from './addcustomer/addcustomer.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { ModalComponent } from './modal/modal.component';
import { AngularMaterialModule } from './angular-material.module';
import {ModalInvoiceComponent} from './modal-invoice/modal-invoice.component'
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule,MatTableDataSource } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';






@NgModule({
  declarations: [
    AppComponent,
    ValueComponent,
    NavComponent,
    RegisterComponent,
    AddvaluesComponent,
    EditvalueComponent,
    LoginComponent,
    CustomerComponent,
    AddcustomerComponent,
    InvoiceComponent,
    ModalComponent,
    ModalInvoiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    AlertModule.forRoot(),
    ToastrModule.forRoot(),
    GridModule,
    AgGridModule,    
    AngularMaterialModule,
    MatDialogModule,
    MatTableModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatRadioModule
  ],
  providers: [
    // {
    //   provide:HTTP_INTERCEPTORS,
    //   useClass:ErrorInterseptor,
    //   multi:true
    // }
    MatTableDataSource,
    ErrorInterceptorProvidor,
    AlertifyService,
    AuthService,
    TokenInterceptorProvidor,
    { provide: MAT_DIALOG_DATA, useValue: {} }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [ModalComponent]
})
export class AppModule { }
