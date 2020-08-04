import { Component, OnDestroy } from '@angular/core';
import { StatsBarData } from '../../../../@core/data/stats-bar';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'ngx-stats-card-back',
  styleUrls: ['./stats-card-back.component.scss'],
  templateUrl: './stats-card-back.component.html',
})
export class StatsCardBackComponent implements OnDestroy {

  private alive = true;

  chartData: number[];

  constructor(private statsBarData: StatsBarData) {
    this.statsBarData.getStatsBarData()
      .pipe(takeWhile(() => this.alive))
      .subscribe((data) => {
        this.chartData = data;
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }

  lineChartMulti =[
   
   
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
