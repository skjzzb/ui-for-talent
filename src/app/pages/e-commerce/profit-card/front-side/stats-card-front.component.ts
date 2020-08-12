import { Component,OnInit } from '@angular/core';
import { ProfitBarAnimationChartData } from '../../../../@core/data/profit-bar-animation-chart';
import { takeWhile } from 'rxjs/operators';
import { DataService } from '../../../../@core/utils/data.service';

@Component({
  selector: 'ngx-stats-card-front',
  styleUrls: ['./stats-card-front.component.scss'],
  templateUrl: './stats-card-front.component.html',
})
export class StatsCardFrontComponent {

  private alive = true;

  linesData: { firstLine: number[]; secondLine: number[] };

  constructor(private profitBarAnimationChartService: ProfitBarAnimationChartData,private service: DataService) {
    this.profitBarAnimationChartService.getChartData()
      .pipe(takeWhile(() => this.alive))
      .subscribe((linesData) => {
        this.linesData = linesData;
      });
  }
  multi:any[]
  ngOnInit(){
    this.retrieveDataOfVacancyChart();

  }

  retrieveDataOfVacancyChart(){
    this.service.getVacancyChartData()
    .then(
      response => {
         console.log(response);
          this.multi=response.data;
      }
    )

  }

 

  

  

  lineChartView: any[] = [550, 400];

  // options
  lineChartShowXAxis = true;
  lineChartShowYAxis = true;
  lineChartGradient = false;
  lineChartShowLegend = false;
  lineChartShowXAxisLabel = false;
  lineChartXAxisLabel = 'Week';
  lineChartShowYAxisLabel = false;
  lineChartYAxisLabel = 'Vacancy';
  
  lineChartColorScheme = {
      domain: ['#1CBCD8', '#FF8D60', '#FF586B', '#AAAAAA']
  };
  
  // line, area
  lineChartAutoScale = true;


  multi1 = [
   
  
    {
      "name": "April",
      "series": [
        {
          "name": "Vacancy",
          "value": 78
        },
        {
          "name": "Application",
          "value": 120
        },
        {
          "name": "Selected",
          "value": 30
        }
      ]
    },
  
    {
      "name": "May",
      "series": [
        {
          "name": "Vacancy",
          "value": 50
        },
        {
          "name": "Application",
          "value": 100
        },
        {
          "name": "Selected",
          "value": 20
        }
      ]
    },

    {
      "name": "June",
      "series": [
        {
          "name": "Vacancy",
          "value": 55
        },
        {
          "name": "Application",
          "value": 100
        },
        {
          "name": "Selected",
          "value": 20
        }
      ]
    },

    {
      "name": "July",
      "series": [
        {
          "name": "Vacancy",
          "value": 50
        },
        {
          "name": "Application",
          "value": 100
        },
        {
          "name": "Selected",
          "value": 20
        }
      ]
    },

    {
      "name": "August",
      "series": [
        {
          "name": "Vacancy",
          "value": 50
        },
        {
          "name": "Application",
          "value": 100
        },
        {
          "name": "Selected",
          "value": 20
        }
      ]
    }
  ]
   

}
