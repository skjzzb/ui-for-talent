import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';

import { TrafficList } from '../../../../@core/data/traffic-list';
import {  Project } from '../../../../@core/data/project-vacancy';
import { DataService } from '../../../../@core/utils/data.service';


@Component({
  selector: 'ngx-traffic-front-card',
  styleUrls: ['./traffic-front-card.component.scss'],
  templateUrl: './traffic-front-card.component.html',
})
export class TrafficFrontCardComponent implements OnDestroy, OnInit {

  private alive = true;

//    project1:Project = {
//     name:"CVproccing",
//     noOfVacancy:20,
//     totalApplication:50,
//     selectedLevel1:20,
//     selectedLevel2:15,
//     selectedLevel3:10,
//     offered:5
//   };

//   project10 = {
//     name:"Avaya",
//     noOfVacancy:20,
//     totalApplication:6,
//     selectedLevel1:20,
//     selectedLevel2:15,
//     selectedLevel3:10,
//     offered:5
//   };
//   project9 = {
//     name:"CVproccing",
//     noOfVacancy:20,
//     totalApplication:6,
//     selectedLevel1:20,
//     selectedLevel2:15,
//     selectedLevel3:10,
//     offered:5
//   };
//   project8 = {
//     name:"CVproccing",
//     noOfVacancy:20,
//     totalApplication:50,
//     selectedLevel1:20,
//     selectedLevel2:15,
//     selectedLevel3:10,
//     offered:5
//   };
//   project7 = {
//     name:"CVproccing",
//     noOfVacancy:20,
//     totalApplication:50,
//     selectedLevel1:20,
//     selectedLevel2:15,
//     selectedLevel3:10,
//     offered:5
//   };
//   project6 = {
//     name:"CVproccing",
//     noOfVacancy:20,
//     totalApplication:50,
//     selectedLevel1:20,
//     selectedLevel2:15,
//     selectedLevel3:10,
//     offered:5
//   };
//  projectDetail:Project[]=[this.project1,this.project10,this.project6,this.project7,this.project8,this.project9]
  
  level : any
  positions : any
  vacancyDetails = [{
    "position" : "",
    "applications" : "-",
    "aptitude" : "-",
    "hr" : "-",
    "telephonic" : "-",
    "technical_1" : "-",
    "technical_2" : "-",
    "manager" : "-",
    "skype" : "-",
    "technical_3" : "-"
  }]

  @Input() frontCardData: TrafficList;

  currentTheme: string;
  constructor(private themeService: NbThemeService, private dataService : DataService) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.currentTheme = theme.name;
    });
  }
  
  ngOnInit(): void {
     this.dataService.getLevelData().subscribe((data)=>{
       this.level = data
     })

     this.dataService.getAllPositions().subscribe((data)=>{
       this.positions = data
       this.positions.forEach(element => {
         var pos = {
          "position" : "",
          "applications" : "-",
          "aptitude" : "-",
          "hr" : "-",
          "telephonic" : "-",
          "technical_1" : "-",
          "technical_2" : "-",
          "manager" : "-",
          "skype" : "-",
          "technical_3" : "-"
         }
         pos.position = element.name

         this.vacancyDetails.push(pos)
       });
       this.vacancyDetails.shift()
     })
  }

  trackByDate(_, item) {
    return item.date;
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
