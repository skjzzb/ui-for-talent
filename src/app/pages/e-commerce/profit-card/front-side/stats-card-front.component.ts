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

  public barChartLabels = ['january','february','march','april','may','june','july','august','september','october','november','december'];

  public barChartType = 'bar';

  public barChartLegend = true;

   barChartData : 
    { 
      data : any[],
      label : string
    }[]=[];
    /*barChartData =[
    { 
      data : [],
      label : " "
    }
  ];*/

  constructor(private dataService : DataService){}
  info : any;
  arr : [];

  ngOnInit(): void {
    let obResult = this.dataService.getAllApplicationInMonth();
    obResult.subscribe(result=>{
      this.info = result;
      this.info = Object.entries(result);
      console.log(this.info);
      this.arr = this.info.sort(function(a, b){return a-b});
      console.log(this.arr);
      /*this.arr=Object.values(result);
      console.log(this.arr);
      
      let name = []= this.arr;
      console.log(name);*/
     this.barChartData.push({data : name,label : 'No. Of Application'});

    });

    
  }

}
