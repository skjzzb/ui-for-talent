import { Component, EventEmitter, Input, OnDestroy, Output, OnInit } from '@angular/core';
import { NbMediaBreakpoint, NbMediaBreakpointsService, NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
import { DataService } from '../../../../@core/utils/data.service';
import { fakeAsync } from '@angular/core/testing';

@Component({
  selector: 'ngx-chart-panel-header',
  styleUrls: ['./chart-panel-header.component.scss'],
  templateUrl: './chart-panel-header.component.html',
})
export class ChartPanelHeaderComponent implements OnInit {
  constructor(private service : DataService){}

  
  public lineChartOptions = {
    scaleShowVerticalLines : false,
    responsive : true,

    scales: {
      yAxes: [{
          gridLines: {
              display:false
          },
          display: true,
          ticks: {
            max : 30,
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

  public lineChartLabels = ['Jan','Feb','March','April','May','June','July','Aug','Sep','Oct','Nov','Dec'];

  public lineChartType = 'line';

  public lineChartLegend = true;

  public colors : Array<any> = [
    { 
      backgroundColor: 'rgba(255,255,255,255)'
    }
   ]

  
   lineChartData =[
    {
      label: "",
      backgroundColor : "white",
      borderColor: "white",
      borderWidth: 0,
      data: []
    },
    {
      label: "",
      backgroundColor : "white",
      borderColor: "white",
      borderWidth: 0,
      data: []
    },
    {
      label: "",
      backgroundColor : "white",
      borderColor: "white",
      borderWidth: 0,
      data: []
    }
  ];

 info1 : any;
 key11 : any;
 arr1 :any;

 info : any;
 key : any;
 arr :any;

 info2 : any;
 key2 : any;
 arr2 :any;

  ngOnInit(): void {
    let obResult1 = this.service.getSelectedMonthly();
    obResult1.subscribe(result1=>{
      this.info1 = result1
      this.info1 = Object.entries(result1);
      this.key11= Object.values(result1);
      this.arr1=Object.values(result1);
      let name1 =  this.arr1;
      this.lineChartData.push({label: "SELECTED",
      borderColor: "red",backgroundColor : "lightgrey",
      borderWidth: 1.5,data : name1});
  });

  let obResult = this.service.getNumberOfRejectedMonthly();
    obResult.subscribe(result=>{
      this.info = result
      this.info= Object.entries(result);
      this.key= Object.values(result);
      this.arr=Object.values(result);
      let name =  this.arr;
      this.lineChartData.push({label: "REJECTED",
      borderColor: "black",backgroundColor : "lightgrey",
      borderWidth: 1.5,data : name});
  });

  let obResult2 = this.service.getTotalInterviewMonthly();
    obResult2.subscribe(result2=>{
      this.info2 = result2
      this.info2= Object.entries(result2);
      this.key2= Object.values(result2);
      this.arr2=Object.values(result2);
      let name2 =  this.arr2;
      this.lineChartData.push({label: "Total INTERVIEW",
      borderColor: "blue",backgroundColor : "lightgrey",
      borderWidth: 1.5,data : name2});
  });

  
  }
  
}
