import  Swal  from 'sweetalert2';
import { Component, OnInit, EventEmitter, Output, Input, TemplateRef } from '@angular/core';
import { DataService } from '../../../@core/utils/data.service';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { NgxPopoverCardComponent, NgxPopoverFormComponent } from '../../modal-overlays/popovers/popover-examples.component';
import { NbWindowService, NbDialogService } from '@nebular/theme';
import { ReScheduleInterviewComponent } from '../ReScheduleInterview/re-schedule-interview.component';

@Component({
  selector: 'ngx-list-of-confirmed-interview',
  templateUrl: './list-of-confirmed-interview.component.html',
  styleUrls: ['./list-of-confirmed-interview.component.scss']
})
export class ListOfConfirmedInterviewComponent implements OnInit {

  scheduledInterview:any[] = []
  //source: LocalDataSource = new LocalDataSource();
  source :  any;
 
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
      meetLink : {
        title:'Meeting Link',
        type:'html',
        valuePrepareFunction: (value) => {
          return `<a href="${value}">Join Meeting</a>`
        },
        filter: false,
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
    this.service.getAllConfirmedScheduledInterview()
    .subscribe(
     response => {
       console.log(response)
        var data : any
        data = response
        data.forEach(element => {
           var source = {
             "calEventId": "",
             "candidateEmail" : "",
             "candidateId": 0,
             "candidateResponseStatus": "",
             "hrEmail" : "",
             "interviewId": 0,
             "interviewStatus": "",
             "level": "",
             "panelEmail": "",
             "panelResponseStatus": "",
             "scheduledEndTime": "",
             "scheduledOn": "",
             "vacancyId": 0,
             "meetLink" : "",
           }
 
           source.calEventId = element.calEventId
           source.candidateEmail = element.candidateEmail
           source.candidateId = element.candidateId
           source.candidateResponseStatus = element.candidateResponseStatus
           source.hrEmail = element.hrEmail
           source.interviewId = element.interviewId
           source.interviewStatus = element.interviewStatus
           source.level = element.level
           source.panelEmail = element.panelEmail
           source.panelResponseStatus = element.panelResponseStatus
           source.scheduledEndTime = element.scheduledEndTime.substring(12,19)
           source.scheduledOn = element.scheduledOn.substring(0,10)
           source.vacancyId = element.vacancyId
           source.meetLink = element.meetLink
           this.scheduledInterview.push(source)
         });
         this.source=this.scheduledInterview
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


