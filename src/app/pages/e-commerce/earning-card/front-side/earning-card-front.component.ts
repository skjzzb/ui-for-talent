import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { interval , Subscription } from 'rxjs';
import { switchMap, takeWhile } from 'rxjs/operators';
import { LiveUpdateChart, EarningData } from '../../../../@core/data/earning';
import { DataService } from '../../../../@core/utils/data.service';

@Component({
  selector: 'ngx-earning-card-front',
  styleUrls: ['./earning-card-front.component.scss'],
  templateUrl: './earning-card-front.component.html',
})
export class EarningCardFrontComponent implements OnDestroy, OnInit {
  private alive = true;

  constructor(private service:DataService){

  }

  selectedTechnology: string = 'Java'
  technologies: string[] =['Java', 'Angular', 'MySql'];

  //@Input() selectedCurrency: string = 'Bitcoin';

  //intervalSubscription: Subscription;
  /*currencies: string[] = ['Java', 'Angular', 'MySql'];
  currentTheme: string;
  earningLiveUpdateCardData: LiveUpdateChart;
  liveUpdateChartData: { value: [string, number] }[];

  constructor(private themeService: NbThemeService,
              private earningService: EarningData) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.currentTheme = theme.name;
      });
  }

  ngOnInit() {
    this.getEarningCardData(this.selectedCurrency);
  }

  changeCurrency(currency) {
    if (this.selectedCurrency !== currency) {
      this.selectedCurrency = currency;

      this.getEarningCardData(this.selectedCurrency);
    }
  }

  private getEarningCardData(currency) {
    this.earningService.getEarningCardData(currency)
      .pipe(takeWhile(() => this.alive))
      .subscribe((earningLiveUpdateCardData: LiveUpdateChart) => {
        this.earningLiveUpdateCardData = earningLiveUpdateCardData;
        this.liveUpdateChartData = earningLiveUpdateCardData.liveChart;

        this.startReceivingLiveData(currency);
      });
  }

  startReceivingLiveData(currency) {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }

    this.intervalSubscription = interval(200)
      .pipe(
        takeWhile(() => this.alive),
        switchMap(() => this.earningService.getEarningLiveUpdateCardData(currency)),
      )
      .subscribe((liveUpdateChartData: any[]) => {
        this.liveUpdateChartData = [...liveUpdateChartData];
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }*/
  multi:any[]
  ngOnInit() {
    this.retrieveDataOfExperience();
  }
  
  retrieveDataOfExperience(){
    this.service.getExperiece()
    .then(
      response => {
         console.log(response);
          this.multi=response.data;
      }
    )

  }

  changeTechnology(technology){
    if(this.selectedTechnology !== technology)
    {
      this.selectedTechnology = technology
    }
    if(this.selectedTechnology === "Angular")
    {
      this.chartData = this.dataForAngular
    }
    if(this.selectedTechnology === "MySql")
    {
      this.chartData = this.dataForMySql
    }
    if(this.selectedTechnology === "Java")
    {
      this.chartData = this.dataForJava
    }
  }


  ngOnDestroy() {
    this.alive = false;
  }
  

  dataForJava =[
   
   
    {
      "name": "0-5 Years",
      "value": 90,
      "extra": {
        "code": "fr"
      }
    },
    {
      "name": "5-8 Years",
      "value": 80,
      "extra": {
        "code": "uk"
      }
    },
    {
      "name": "8-15 Years",
      "value": 23,
      "extra": {
        "code": "uk"
      }
    },
    {
      "name": "15-20 Years",
      "value": 15,
      "extra": {
        "code": "uk"
      }
    }


    
  ]
  dataForAngular =[
   
   
    {
      "name": "0-5 Years",
      "value": 50,
      "extra": {
        "code": "fr"
      }
    },
    {
      "name": "5-8 Years",
      "value": 150,
      "extra": {
        "code": "uk"
      }
    },
    {
      "name": "8-15 Years",
      "value": 75,
      "extra": {
        "code": "uk"
      }
    },
    {
      "name": "15-20 Years",
      "value": 45,
      "extra": {
        "code": "uk"
      }
    }


    
  ]
  dataForMySql =[
   
   
    {
      "name": "0-5 Years",
      "value": 200,
      "extra": {
        "code": "fr"
      }
    },
    {
      "name": "5-8 Years",
      "value": 50,
      "extra": {
        "code": "uk"
      }
    },
    {
      "name": "8-15 Years",
      "value": 225,
      "extra": {
        "code": "uk"
      }
    },
    {
      "name": "15-20 Years",
      "value": 75,
      "extra": {
        "code": "uk"
      }
    }


    
  ]

  chartData=this.dataForJava;

  lineChartView: any[] = [550, 100];

  // options
  lineChartShowXAxis = true;
  lineChartShowYAxis = true;
  lineChartGradient = false;
  lineChartShowLegend = false;
  lineChartShowXAxisLabel =false;
  lineChartXAxisLabel = 'Year';
  lineChartShowYAxisLabel = false;
  lineChartYAxisLabel = 'candidate';
  
  lineChartColorScheme = {
      domain: ['#1CBCD8', '#FF8D60', '#FF586B', '#AAAAAA']
  };

}
