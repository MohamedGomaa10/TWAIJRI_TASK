import { Component } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name: any;
  color: any;
  constructor(public dialog: MatDialog) { }
  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '250px',
      data: { name: "this.name", color: this.color }
    });
    dialogRef.afterClosed().subscribe(res => {
      this.color = res;
    });
  }
  title = 'Front-End-SPA';
  list:number[]=[1,2,3]
}


