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

  ngOnInit(){
    this.retrieveData();
  }

  retrieveData(){
    this.service.getMonthApplication()
    .then(
      response => {
         console.log(response);
          
      }
    )

  }


  lineChartMulti =[
    {
      "name": "February",
      "value": 20,
      "extra": {
        "code": "de"
      }
    },
    {
      "name": "March",
      "value": 30,
      "extra": {
        "code": "us"
      }
    },
    {
      "name": "April",
      "value": 12,
      "extra": {
        "code": "fr"
      }
    },
    {
      "name": "May",
      "value": 20,
      "extra": {
        "code": "uk"
      }
    },
    {
      "name": "June",
      "value": 12,
      "extra": {
        "code": "uk"
      }
    },
    {
      "name": "July",
      "value": 10,
      "extra": {
        "code": "uk"
      }
    }
    
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
  lineChartYAxisLabel = 'Vacancy';
  
  lineChartColorScheme = {
      domain: ['#1CBCD8', '#FF8D60', '#FF586B', '#AAAAAA']
  };
  
  // line, area
  lineChartAutoScale = true;


  multi = [
   
  
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
