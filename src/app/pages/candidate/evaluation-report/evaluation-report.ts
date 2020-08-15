import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { DataService } from '../../../@core/utils/data.service';
import { TokenStorageService } from '../../../_services/token-storage.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-evaluation-report',
  templateUrl: './evaluation-report.html',
  styleUrls: ['./evaluation-report.scss']
})
export class EvaluationReportComponent implements OnInit {
  example: any;
  constructor(private service:DataService,private tokenService:TokenStorageService,private router: Router,private route :ActivatedRoute){}
  

  ngOnInit(): void {
   // this.example = this.route.snapshot.params['rowData'];
   // console.log(this.route.snapshot.params['rowData'])
    this.example = JSON.parse(this.route.snapshot.params["rowData"]);
    console.log(this.example.email)
    console.log(this.example)

    // console.log("rowdata"+this.route.getCurrentNavigation().extras.state.rowData);

  }




}
