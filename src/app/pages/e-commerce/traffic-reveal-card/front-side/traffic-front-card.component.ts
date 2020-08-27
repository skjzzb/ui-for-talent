import { Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
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
  @Input() selectedProject: string = '';
  @Output() projectChange = new EventEmitter<string>();
  projects : any
  candidates : any
  helper : any
  ngOnInit(): void {
     this.dataService.getLevelData().subscribe((data)=>{
       this.level = data
     })
     this.dataService.getAllProject().subscribe((data)=>{
      this.projects = data;
      this.selectedProject = this.projects[0].name
      this.fillAllData(this.selectedProject)
    })
    this.dataService.getAllCandidate().subscribe(data=>{
      this.candidates = data
    })
     this.dataService.getAllPositions().subscribe((data)=>{
       this.positions = data
       this.positions.forEach(element => {
         var pos = {
          "position" : "",
          "applications" : "0",
          "aptitude" : "0",
          "hr" : "0",
          "telephonic" : "0",
          "technical_1" : "0",
          "technical_2" : "0",
          "manager" : "0",
          "skype" : "0",
          "technical_3" : "0"
         }
         pos.position = element.name

         this.vacancyDetails.push(pos)
       });
       this.vacancyDetails.shift()
     })
  }

  fillAllData(projName)
  {
    this.dataService.getCountOfCandidateByProjectName(projName)
    .subscribe(data =>{
      this.helper = data
      console.log(this.helper)

      for (let index = 0; index < this.helper.positionName.length; index++) {
        
        this.vacancyDetails.forEach(element => {
          if(element.position == this.helper.positionName[index])
          {
            element.position = this.helper.positionName[index]
            element.aptitude = "0"
            element.telephonic = "0"
            element.skype = "0"
            element.applications = this.helper.application[index]
            element.technical_1 = this.helper.tech1[index]
            element.technical_2 = this.helper.tech2[index]
            element.technical_3 = this.helper.tech3[index]
            element.manager = this.helper.manager[index]
            element.hr = this.helper.hr[index]
          }
        });
        
      }
    })

  }
  
  changeProject(project): void {
    this.selectedProject = project;
    console.log(this.selectedProject)
    this.projectChange.emit(project)
    this.fillAllData(this.selectedProject); 
  }

  trackByDate(_, item) {
    return item.date;
  }

  
  ngOnDestroy() {
    this.alive = false;
  }
}
