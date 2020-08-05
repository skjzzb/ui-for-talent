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

  
  constructor(private service:DataService) {
    console.log('----------------')

  }

  ngOnInit(): void {
   
    
  }

}
