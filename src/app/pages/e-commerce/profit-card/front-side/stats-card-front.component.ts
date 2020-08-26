import { Component,OnInit } from '@angular/core';
import { ProfitBarAnimationChartData } from '../../../../@core/data/profit-bar-animation-chart';
import { takeWhile } from 'rxjs/operators';
import { DataService } from '../../../../@core/utils/data.service';
import * as Chart from 'chart.js';
import { MAT_RIPPLE_GLOBAL_OPTIONS } from '@angular/material/core';

@Component({
  selector: 'ngx-stats-card-front',
  styleUrls: ['./stats-card-front.component.scss'],
  templateUrl: './stats-card-front.component.html',
})
export class StatsCardFrontComponent implements OnInit{

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

  public barChartLabels = ['Jan','Feb','March','April','May','June','July','Aug','Sep','Oct','Nov','Dec'];

  public barChartType = 'bar';

  public barChartLegend = true;

  public colors : Array<any> = [
    { 
      backgroundColor: 'rgba(255,255,255,255)'
    }
   ]

  /* barChartData : 
    { 
      data : [20,30,40,60,59,34,2,1,44,56,40],
      label : string
    }[]=[];*/
    barChartData =[
    { 
      data : [],
      label : " "
    }
  ];

  constructor(private dataService : DataService){}
  info : any;
  arr : any;

  ngOnInit(): void {
    let obResult = this.dataService.getAllApplicationInMonth();
    obResult.subscribe(result=>{
      this.info = result;
      this.info = Object.entries(result);
      let op = this.info.sort(new Intl.Collator('en',{numeric:true, sensitivity:'accent'}).compare);
      console.log(op);
     this.arr=Object.values(result);
      console.log(this.arr);
      let name = []= this.arr;
      console.log(name);
      this.barChartData.push({data : name,label : 'No. Of Application'});
    });
  }
}
