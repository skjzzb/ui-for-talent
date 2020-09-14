import  Swal  from 'sweetalert2';
import { Component, OnInit, EventEmitter, Output, Input, TemplateRef } from '@angular/core';
import { DataService } from '../../../@core/utils/data.service';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { NgxPopoverCardComponent, NgxPopoverFormComponent } from '../../modal-overlays/popovers/popover-examples.component';
import { NbWindowService, NbDialogService } from '@nebular/theme';

import { ProfileComponent } from '../../../profile/profile.component';
import { Router } from '@angular/router';




@Component({
  selector: 'ngx-list-of-cv',
  templateUrl: './list-of-cv.component.html',
  styleUrls: ['./list-of-cv.component.scss']
})
export class ListOfCv implements OnInit {

  source: LocalDataSource = new LocalDataSource();

  constructor(private service:DataService) { 
  }

  ngOnInit(): void {

    this.retrieveData();
  
  }

  settings = {
    actions:{add:false,
             edit:false,
             delete:false},
     delete: {
       deleteButtonContent: '<i class="nb-trash"></i>',
       confirmDelete: true,
     },
    columns: {
      // id: {
      //   title: 'ID',
      //   type: 'number',
      // },
      folderName: {
        title: 'Folder Name',
        type: 'string',
      },
      noCV: {
        title: 'CV Count',
        type: 'number',
      },
    },
  };

  retrieveData()
  {
    this.service.getData()
    .then(
      response => {
          console.log(response);
          this.source.load(response.data);
      }
    )
  }

  /*onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }*/

   


  }


