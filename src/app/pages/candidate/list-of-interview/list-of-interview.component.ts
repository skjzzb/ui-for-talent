import  Swal  from 'sweetalert2';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { DataService } from '../../../@core/utils/data.service';
import { LocalDataSource } from 'ng2-smart-table';
import { NgxPopoverCardComponent, NgxPopoverFormComponent } from '../../modal-overlays/popovers/popover-examples.component';
import { NbWindowService, NbDialogService } from '@nebular/theme';
import { InterviewComponent } from '../interview/interview.component';
import { ProfileComponent } from '../../../profile/profile.component';




@Component({
  selector: 'ngx-list-of-interview',
  templateUrl: './list-of-interview.component.html',
  styleUrls: ['./list-of-interview.component.scss']
})
export class ListOfInterviewComponent implements OnInit {
/* Long InterviewId;

 String panelEmail;
 
 String candidateEmail;
 
 String hrEmail;
 
 String scheduledOn;
 
 String scheduledEndTime;
 
 String level;
 
 String calEventId;
 
 String panelResponseStatus;
 
 String candidateResponseStatus;
 */
source : any
  settings = {
    actions:{add:false},
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
        type: 'string',
        filter: true,   
      },
      scheduledEndTime:{
        title:'Time',
        type: 'string',
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

      }
   
    },
    pager:
    {
    perPage: 4
    }
  };


  constructor(private service:DataService) { 
  }

  ngOnInit(): void {
   
  }

  onDeleteConfirm(event): void {
  }

}
