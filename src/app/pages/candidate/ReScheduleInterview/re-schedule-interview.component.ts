import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { DataService } from '../../../@core/utils/data.service';
import { LocalDataSource } from 'ng2-smart-table';
import { NgxPopoverCardComponent, NgxPopoverFormComponent } from '../../modal-overlays/popovers/popover-examples.component';
import { NbWindowService, NbDialogService } from '@nebular/theme';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';



@Component({
  selector: 'ngx-re-schedule-interview',
  templateUrl: './re-schedule-interview.component.html',
  styleUrls: ['./re-schedule-interview.component.scss']
})
export class ReScheduleInterviewComponent implements OnInit {

  
  selectedMode:string
  panel : any
  scheduledOn : any
  rowData : any
  time : any
  selectedPanel='';
  datetime

  interview = {
    "interviewId":"",
    "panelEmail" : "",
    "candidateEmail" : "",
    "scheduledOn" : "",
    "scheduledEndTime" : "",
    "level" : "Level-1",
    "hrEmail":""

  }
  constructor(private service:DataService,) { 
  }

  ngOnInit(): void {
    this.service.getAllPanel().subscribe(data=>{
      this.panel = data
    }) 
    this.selectedPanel=this.rowData.panelEmail
    console.log(this.selectedPanel) 

   this.datetime =new Date(this.rowData.scheduledOn).toLocaleTimeString();
    
    console.log(this.rowData)
  }

  scheduleInterview(dataFromUI)
  {
    console.log('-------------')
    console.log(dataFromUI.form.value)

    candidateEmail: "deshmukha816@gmail.com"
hrEmail: "akhilesh.deshmukh@gslab.com"
reason: "abc"
scheduledOn: "2020-08-06T06:34:00.000Z"
time: "12:04:00"

    
    this.interview.panelEmail = this.selectedPanel
    this.interview.candidateEmail = dataFromUI.form.value.candidateEmail
    this.interview.hrEmail= dataFromUI.form.value.hrEmail
    
      var time=dataFromUI.form.value.time
      let tt:[]= time.split(':')
    var abc=new Date(dataFromUI.form.value.scheduledOn)//.setTime(this.time)
    abc.setMinutes(tt.pop())
    abc.setHours(tt.pop())

    this.interview.scheduledOn=abc.toISOString();
    if(abc.getHours()<24)
    abc.setHours(abc.getHours()+1)
    else
    {
      abc.setHours(0)
      abc.setDate(abc.getDate()+1)
    }

    this.interview.scheduledEndTime=abc.toISOString();
    this.interview.interviewId=this.rowData.interviewId;
    console.log(this.interview)

    this.service.rescheduledMeeting(this.interview,dataFromUI.form.value.reason)


  }


}
