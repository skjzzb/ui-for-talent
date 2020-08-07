import  Swal  from 'sweetalert2';
import { Component, OnInit, EventEmitter, Output, Input, TemplateRef } from '@angular/core';
import { DataService } from '../../../@core/utils/data.service';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { NgxPopoverCardComponent, NgxPopoverFormComponent } from '../../modal-overlays/popovers/popover-examples.component';
import { NbWindowService, NbDialogService } from '@nebular/theme';

import { ProfileComponent } from '../../../profile/profile.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ReScheduleInterviewComponent } from '../ReScheduleInterview/re-schedule-interview.component';
@Component({
  selector: 'button-view',
  template: `
  <div>
<style>
.button {
  background-color: #008CBA; /* Blue */
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  height: 50px;
  width: 150px;
}
.button2 {border-radius: 4px;}
</style>
  <button  class="button button2" (click)="onClick()"> Reschedule Interview
  </button>
 </div>`,
})
export class ButtonViewComponent implements ViewCell, OnInit {
  
  renderValue: string;
  CardComponent

  @Input() value: string;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  constructor(private windowService: NbWindowService,private dialogService: NbDialogService)
  {
    
  }

  ngOnInit() {
    console.log(this.rowData)
    console.log("------------")
    console.log(this.value)
    this.renderValue = this.value.toString();
  }

  onClick()
  {
    //console.log(this.rowData)
    this.CardComponent = ReScheduleInterviewComponent;
    this.dialogService.open(this.CardComponent, {context: {
      rowData: this.rowData,
    },
  });
  
  }
  
}

@Component({
  selector: 'ngx-list-of-interview',
  templateUrl: './list-of-interview.component.html',
  styleUrls: ['./list-of-interview.component.scss']
})
export class ListOfInterviewComponent implements OnInit {

  source: LocalDataSource = new LocalDataSource();
  settings = {
    actions:{add:false,
            edit: false},
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      hrEmail: {
        title: 'Organizer',
        type: 'string',
        filter: true
      },
      panelEmail: {
        title: 'Panel Email',
        type: 'string',
        filter: true
      },
      candidateEmail: {
        title: 'Candidate Email',
        type: 'string',
        filter: true
      },
      scheduledOn:{
        title:'Scheduled On',
        type: 'date',
        filter: true,   
      },
      scheduledEndTime:{
        title:'Time',
        type: 'date',
        filter: true,
      },
      level:{
        title:'Level',
        type: 'string',
        filter: true,
      },
      calEventId : {
        title:'Calender EventId',
        type: 'string',
        filter: true,
      },
      panelResponseStatus : {
        title:'Panel Response Status',
        type: 'string',
        filter: true,
      },
      candidateResponseStatus : {
        title:'Candidate Response Status',
        type: 'string',
        filter: true,
      },
      reScheduleInterview:{
        title:'Re-Schedule Interview',
        type:'custom',
        renderComponent:ButtonViewComponent,
        onComponentInitFunction(instance) {
         instance.save.subscribe(row => {
         });
       },width:'20%',
       filter:false,
       },
   
    },
    pager:
    {
    perPage: 4
    }
  };


  constructor(private service:DataService) { 
  }

  ngOnInit(): void {
   this.service.getListOfInterview()
   .then(
    response => {
      console.log(response.data)
        this.source=response.data
       }
  )

  }

  onDeleteConfirm(event): void {
    if (Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })) {
     console.log(event.data.interviewId)
      this.service.DeteteInterview(event.data.interviewId)
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


