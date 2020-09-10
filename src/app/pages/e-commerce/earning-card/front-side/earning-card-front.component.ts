import { Component, Input,OnInit , TemplateRef, ViewChild} from '@angular/core';
import {NbDialogService} from '@nebular/theme';
import { NbThemeService } from '@nebular/theme';
import { interval } from 'rxjs';
import { switchMap, takeWhile } from 'rxjs/operators';
import { LiveUpdateChart, EarningData } from '../../../../@core/data/earning';
import { DataService } from '../../../../@core/utils/data.service';
import * as Chart from 'chart.js';
import { LocalDataSource } from 'ng2-smart-table';
@Component({
  selector: 'ngx-earning-card-front',
  styleUrls: ['./earning-card-front.component.scss'],
  templateUrl: './earning-card-front.component.html',
  styles: [`
    nb-card {
      max-width: 800px;
      max-height: 44.25rem;
    }
  `],
})
export class EarningCardFrontComponent implements OnInit {
  tech : any;
  selectedItem = '';
  subtechnology:any[];
  source: LocalDataSource = new LocalDataSource();

  pieChartOptions = {
    responsive: true,
    animateRotate : true,
    animateScale : false,
    circumference : 2 * Math.PI,
    rotation:-0.5 * Math.PI

}

pieChartLabels =  ['1-5', '6-10', '11-15', '16 Above'];

// CHART COLOR.
pieChartColor:any = [
    {
        backgroundColor: [
          'rgba(249, 71, 33, 0.8)',
          'rgba(46,33,249,0.9)',
          'rgba(8, 171, 40, 0.9)',
          'rgba(247, 212, 13, 0.9)'
        ]
    }
]

pieChartData:any = [
    { 
        data: [20,30,50,30]
    }
];

  constructor(private service: DataService){

  }
  ngOnInit(): void {
    this.retrieveData();
  }

  retrieveData()
  {
    this.service.getAllSubTechnologyData()
    .then(
      response => {
          this.subtechnology=response.data;
      }
    )
  }

 
  arr :any;
  onSelectTechnology(){
    console.log(this.selectedItem);
    let ObResult = this.service.getExperienceOfCandidateFromSubtechnology(this.selectedItem);
    ObResult.subscribe(data1=>{
      this.tech = data1;
    console.log(this.tech);
    this.arr=Object.values(data1);
    console.log(this.arr);
    this.pieChartData.push({data : this.arr});
    this.pieChartColor.push({ 
      backgroundColor: [
      'rgba(249, 71, 33, 0.8)',
      'rgba(46,33,249,0.9)',
      'rgba(8, 171, 40, 0.9)',
      'rgba(247, 212, 13, 0.9)'
      ]
  });
  
  })
  }

  
}