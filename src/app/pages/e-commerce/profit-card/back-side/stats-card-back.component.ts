import { Component,OnInit,TemplateRef, ViewChild} from '@angular/core';
import {NbDialogService} from '@nebular/theme';
import { ProfitBarAnimationChartData } from '../../../../@core/data/profit-bar-animation-chart';
import { takeWhile } from 'rxjs/operators';
import { DataService } from '../../../../@core/utils/data.service';
import * as Chart from 'chart.js';
import { MAT_RIPPLE_GLOBAL_OPTIONS } from '@angular/material/core';
import { ThemeService } from 'ng2-charts';
import { NumberSymbol } from '@angular/common';

@Component({
  selector: 'ngx-stats-card-back',
  styleUrls: ['./stats-card-back.component.scss'],
  templateUrl: './stats-card-back.component.html',
})
export class StatsCardBackComponent implements OnInit {

  public barChartOptions = {
    scaleShowVerticalLines : true,
    responsive : true,

    scales: {
      yAxes: [{
          gridLines: {
              display:false
          },
          display: true,
          ticks: {
            max : 60,
            min: 0
          }
      }]
    },

    display: true,
    labels: {
      fontColor: '#4286f4',
      backgroundColor: '#6FC8CE'
    }
  };

  public barChartLabels = [];

  public barChartType = 'bar';

  public barChartLegend = true;

  public colors : Array<any> = [
    { 
      backgroundColor: 'rgba(255,255,255,255)'
    }
   ]

  
    barChartData =[
    { 
      data : [],
      label : " "
    }
  ];

  constructor(private dataService : DataService){}
  info : any;
  arr : any;
  key1 : any;
  i : any;
  key : string;

  ngOnInit(): void {
    let obResult = this.dataService.getCountOfApplicationForProject();
    obResult.subscribe(result=>{
      this.info = result;
      this.info = Object.entries(result);

      this.key1 = Object.keys(result);
      console.log(this.key1);
      for ( this.key of this.key1) {
        this.barChartLabels.push(this.key);
      }

      this.arr=Object.values(result);
      let name = []= this.arr;
      this.barChartData.push({data : name,label : 'No. Of Application for project'});
      this.colors.push({ backgroundColor: 'rgba(0,128,128)'});
    });
  }
}
