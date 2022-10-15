import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.services';
import { ValuesService } from '../_services/values.service';


@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.css']
})
export class ValueComponent implements OnInit  {





  constructor(private http:HttpClient , private alerty:AlertifyService,private router:Router ,private route:ActivatedRoute, private valueservices:ValuesService) { }

  ngOnInit(): void {

  }

}

