import { Component, OnDestroy,OnInit } from '@angular/core';
import { StatsBarData } from '../../../../@core/data/stats-bar';
import { takeWhile } from 'rxjs/operators';
import { DataService } from '../../../../@core/utils/data.service';

@Component({
  selector: 'ngx-stats-card-back',
  styleUrls: ['./stats-card-back.component.scss'],
  templateUrl: './stats-card-back.component.html',
})
export class StatsCardBackComponent implements OnDestroy {

  private alive = true;
  
  chartData: number[];

  constructor(private statsBarData: StatsBarData,private service: DataService) {
    this.statsBarData.getStatsBarData()
      .pipe(takeWhile(() => this.alive))
      .subscribe((data) => {
        this.chartData = data;
      });
  }

  backenddata:any
  
  multi:any=[]
  
  ngOnInit(){
    this.retrieveDataOfProject();
    
  
    
    
  }
  retrieveDataOfProject(){
    this.service.getProjectVacancyChartData()
    .then(
      response => {
         console.log(response);
          this.multi=response.data
          
      }
    )

  }

  ngOnDestroy() {
    this.alive = false;
  }
  
  lineChartMulti: any[] =[
   
   
    {
      "name": "April",
      "value": 90,
      "extra": {
        "code": "fr"
      }
    },
    {
      "name": "May",
      "value": 80,
      "extra": {
        "code": "uk"
      }
    },
    {
      "name": "June",
      "value": 80,
      "extra": {
        "code": "uk"
      }
    },
    {
      "name": "July",
      "value": 80,
      "extra": {
        "code": "uk"
      }
    },

    {
      "name": "August",
      "value": 80,
      "extra": {
        "code": "us"
      }
    },
    
  ]
 
  

  lineChartView: any[] = [550, 400];

  // options
  lineChartShowXAxis = true;
  lineChartShowYAxis = true;
  lineChartGradient = false;
  lineChartShowLegend = false;
  lineChartShowXAxisLabel = false;
  lineChartXAxisLabel = 'Week';
  lineChartShowYAxisLabel = false;
  lineChartYAxisLabel = 'Application';
  
  lineChartColorScheme = {
      domain: ['#1CBCD8', '#FF8D60', '#FF586B', '#AAAAAA']
  };
  
  // line, area
  lineChartAutoScale = true;

}
