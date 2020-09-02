import { Component, OnDestroy, OnInit } from '@angular/core';
import { PieChart, EarningData } from '../../../../@core/data/earning';
import { takeWhile } from 'rxjs/operators';
import { DataService } from '../../../../@core/utils/data.service';

@Component({
  selector: 'ngx-earning-card-back',
  styleUrls: ['./earning-card-back.component.scss'],
  templateUrl: './earning-card-back.component.html',
})
export class EarningCardBackComponent implements OnInit {

  constructor(private service: DataService){

  }

  
  public barChartOptions = {
    responsive: true,
    legend: {
      position: "top"
    },
    title: {
      display: false
    },
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

  };

  public barChartLabels = [];

  public barChartType = 'bar';

  public barChartLegend = true;

  public colors : Array<any> = [
    { 
      backgroundColor: ['rgba(255,255,255,255)','rgba(255,255,255,255)']
    }
   ]
  
    barChartData =[
     
      {
        label: "",
        backgroundColor: "rgba(255,255,255,255)",
        borderColor: "rgba(255,255,255,255)",
        borderWidth: 0,
        data: []
      },
      {
        label: " ",
        backgroundColor: "rgba(255,255,255,255)",
        borderColor: "rgba(255,255,255,255)",
        borderWidth: 0,
        data: []
      }
  ];

  info : any;
  key1:any;
  key : any;
  arr :any;

  info1 : any;
  key11:any;
  key111 : any;
  arr1 :any;

  ngOnInit(): void {
    let obResult = this.service.getCountOfVacancyForProject("year");
    obResult.subscribe(result=>{
      this.info = result;
      this.info = Object.entries(result);
    
      this.key1 = Object.keys(result);

      for ( this.key of this.key1) {
        this.barChartLabels.push(this.key);
      }
      this.arr=Object.values(result);
      let name =  this.arr;
      this.barChartData.push({label: "Total Vacancy",
      backgroundColor: "#6690FF",
      borderColor: "black",
      borderWidth: 1,data : name});
  });


  let obResult1 = this.service.getCountOfSelectedForProject();
  obResult1.subscribe(result1=>{
    this.info1 = result1
    this.info1 = Object.entries(result1);
    this.key11= Object.keys(result1);
    this.arr1=Object.values(result1);
    let name1 =  this.arr1;
    this.barChartData.push({label: "Total SELECTED",
    backgroundColor: "#FF7A65",
    borderColor: "black",
    borderWidth: 1,data : name1});
});
  }
}

