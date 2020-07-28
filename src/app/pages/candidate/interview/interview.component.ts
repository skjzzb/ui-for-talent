import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { DataService } from '../../../@core/utils/data.service';
import { LocalDataSource } from 'ng2-smart-table';
import { NgxPopoverCardComponent, NgxPopoverFormComponent } from '../../modal-overlays/popovers/popover-examples.component';
import { NbWindowService, NbDialogService } from '@nebular/theme';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';



@Component({
  selector: 'ngx-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.scss']
})
export class InterviewComponent implements OnInit {

  selectedPanel : any
  selectedMode : any
  panel : any
  scheduledOn : any
  rowData : any

  interview = {
    "panelEmail" : "",
    "candidateEmail" : "",
    "scheduledOn" : "",
    "level" : "Level-1"
  }
  constructor(private service:DataService) { 
  }

  ngOnInit(): void {
    //console.log(this.rowData)
    this.service.getAllPanel().subscribe(data=>{
      this.panel = data
      //console.log(this.panel)
    })
    
  }

  scheduleInterview(dataFromUI)
  {

    this.interview.panelEmail = dataFromUI.form.value.panel
    this.interview.candidateEmail = this.rowData.email
    this.interview.scheduledOn = dataFromUI.form.value.scheduledOn
    console.log(this.interview)
  }


    
  
}
