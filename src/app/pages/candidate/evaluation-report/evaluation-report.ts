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
  constructor(private service:DataService,private tokenService:TokenStorageService,private router: Router) {
  }

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as {example: string};
    this.example = state.example;
    console.log("ex"+this.example);
    // console.log("rowdata"+this.route.getCurrentNavigation().extras.state.rowData);

  }




}
