import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { DataService } from '../../../@core/utils/data.service';
import { type } from 'os';

@Component({
  selector: 'ngx-list-of-vacancy',
  templateUrl: './list-of-vacancy.component.html',
  styleUrls: ['./list-of-vacancy.component.scss']
})
export class ListOfVacancyComponent implements OnInit {

  usingSplit:[];

  settings = {
    //mode:"external",
    actions:{add: false,},
    // readmore:{
    //    custom:[
    //   {
    //    name: 'yourAction',
    //    title: '<i class="ion-document" title="YourAction"></i>',
    //    filter:false,
    //  },
    //  ],
    //  position:'right',
    // },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave:true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      // vacancyId: {
      //   title: 'ID',
      //   type: 'number',
      //   filter:false,
      //   editable:false,
      // },
      jobTitle: {
        title: 'Job Title',
        type: 'string',
        //width:'10%'
      },
      projectName: {
        title: 'Project Name',
        type: 'string',
        //width:'10%'
      },
      posOpenDate: {
        title: 'Open Date',
        type: 'date',
        //width:'10%'
      },
      posOnBoardDate:{
        title:'On Board Date',
        type: 'date',
        //width:'10%'
      },
      jd:{
        title:'Job Description',
        type: 'string',
        //width:'10%'
      },
      noOfVacancy:{
        title:'Vacancy',
        type:'number',
        //width:'10%'
      },
      experienceRequired:{
        title:'Experience Required',
        type:'number'
      },
      //shortSummary:{
      //   title:'Summary',
      //   type:'html',
      //   valuePrepareFunction: (value) => {
      //   // this.usingSplit = value.split(' ');
      //   // let x=0,y=1,z=2;
      //    return `<div>${value}</div>`
      //   //return `<div>${this.usingSplit[x]} ${this.usingSplit[y]} ${this.usingSplit[z]} <i (click)="onSelectTechnology()" class="nb-edit"></i> </div>`
      //    //return `<div><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-chevron-double-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"/><path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"/></svg> </div>`
      //},
      //  filter:false,
      //  width:'40%' 
      //},
    },
    pager:
    {
    perPage: 5
    }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: DataService) {
  }

  ngOnInit(): void {
    this.retrieveData();
  }

  onSelectTechnology()
  {
    console.log('working...')
  }

  retrieveData()
  {
    this.service.getVacancyData()
     .then(
       response => {
          console.log(response);
           this.source.load(response.data);
       }
     )
    }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
     // console.log(event.data.vacancyId)
      this.service.DeteteVacancy(event.data.vacancyId)
      .then(
        response => {
           console.log(response);
           event.confirm.resolve();
        }
      )
    } else {
      event.confirm.reject();
    }
  }

 
  updateRecord(event) {
    //this.ngOnInit();
     var data = {"vacancyId" : event.newData.vacancyId,
                 "jobTitle" : event.newData.jobTitle,
                 "projectName" : event.newData.projectName,
                 "posOpenDate" : event.newData.posOpenDate,
                  "posOnBoardDate" : event.newData.posOnBoardDate,
                  "jd" : event.newData.jd,
                  "noOfVacancy" : event.newData.noOfVacancy,
                  "shortSummary" : event.newData.shortSummary,
                  "experienceRequired":event.newData.experienceRequired,
                };
                console.log(data)

         this.service.updateVacancy(data,event.newData.vacancyId)
         .then(
           response => {
              console.log(response);
              event.confirm.resolve();
           }
         )
        
  }

}