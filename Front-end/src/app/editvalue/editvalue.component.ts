import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../_services/alertify.services';
import { ValuesService } from '../_services/values.service';

@Component({
  selector: 'app-editvalue',
  templateUrl: './editvalue.component.html',
  styleUrls: ['./editvalue.component.css']
})
export class EditvalueComponent implements OnInit {

  
  constructor(private http:HttpClient , private alerty:AlertifyService , private route:ActivatedRoute , private editservice:ValuesService) { }


  ngOnInit(): void {
  }
}
