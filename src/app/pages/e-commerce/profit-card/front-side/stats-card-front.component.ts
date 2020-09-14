import { Component,OnInit,TemplateRef, ViewChild} from '@angular/core';
import {NbDialogService} from '@nebular/theme';
import { ProfitBarAnimationChartData } from '../../../../@core/data/profit-bar-animation-chart';
import { takeWhile } from 'rxjs/operators';
import { DataService } from '../../../../@core/utils/data.service';
import * as Chart from 'chart.js';
import { MAT_RIPPLE_GLOBAL_OPTIONS } from '@angular/material/core';
import { ThemeService } from 'ng2-charts';

@Component({
  selector: 'ngx-stats-card-front',
  styleUrls: ['./stats-card-front.component.scss'],
  templateUrl: './stats-card-front.component.html',
  styles: [`
  nb-card {
    /**
     * This is the max-width value of the Bootstrap giant modal
     * Using it here ensures the modal will properly adjust it's width to the content
     */
    max-width: 800px;
    /**
     * This is the height value of NbComponentSize 'giant'
     * By setting max-height of the modal card to this value, we ensure the modal will properly adjust it's height
     * to the content
     */
    max-height: 44.25rem;
  }
`],
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
      
      const sortObject = o => Object.keys(o).sort().reduce((r, k) => (r[k] = o[k], r), {})
      console.log(sortObject);

      this.info = Object.entries(result);
     this.arr=Object.values(result);
    
      let name = []= this.arr;
    
      this.barChartData.push({data : name,label : 'No. Of Application'});
      this.colors.push({ backgroundColor: 'rgba(50,136,203)'});
    });
  }
}
