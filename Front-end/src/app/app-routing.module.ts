import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddcustomerComponent } from './addcustomer/addcustomer.component';
import { AddvaluesComponent } from './addvalues/addvalues.component';
import { CustomerComponent } from './customer/customer.component';
import { EditvalueComponent } from './editvalue/editvalue.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ValueComponent } from './value/value.component';


const routes: Routes = [
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'Values/GetValues',component:ValueComponent},
  {path:'Customers/GetCustomers',component:CustomerComponent},
  {path:'Customers/AddCustomers',component:AddcustomerComponent},
  {path:'Invoices/GetInvoices',component:InvoiceComponent},
  {path:'Values/addvalue',component:AddvaluesComponent},
  {path:'Values/editvalue/:id',component:EditvalueComponent},  
  {path:'',component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
