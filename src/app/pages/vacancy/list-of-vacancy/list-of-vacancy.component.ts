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

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      vacancyId: {
        title: 'ID',
        type: 'number',
      },
      jobTitle: {
        title: 'Job Title',
        type: 'string',
      },
      projectName: {
        title: 'Project Name',
        type: 'string',
      },
      posOpenDate: {
        title: 'Open Date',
        type: 'date',
      },
      posOnBoardDate:{
        title:'On Board Date',
        type: 'date'
      },
      jd:{
        title:'Job Description',
        type: 'string'
      },
      noOfVacancy:{
        title:'Number of Vacancy',
        type:'number'
      },
      shortSummary:{
        title:'Short Summary',
        type:'string'
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: DataService) {
  }

  ngOnInit(): void {
    this.retrieveData();
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
      console.log(event.data.vacancyId)
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
}
