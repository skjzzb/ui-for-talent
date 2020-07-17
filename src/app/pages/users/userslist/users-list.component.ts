import {  Component,ViewEncapsulation, OnInit, Input, Output, EventEmitter, TemplateRef} from '@angular/core';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { DataService } from '../../../@core/utils/data.service';
import { NbWindowService, NbDialogService } from '@nebular/theme';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'nb-users-list',
  styleUrls: ['./users-list.component.scss'],
  templateUrl: './users-list.component.html',
  encapsulation: ViewEncapsulation.None
})
class UsersListComponent {

  usingSplit:[];
  userInfo : any;

  rows:any[] = []

  settings = {
    actions:{add: false},
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
      name: {
        title: 'Name',
        type: 'string',
        //width:'10%'
      },
      email: {
        title: 'Email',
        type: 'string',
        //width:'10%'
      },
      contactNo: {
        title: 'Contact No',
        type: 'string',
        //width:'10%'
      },
      role: {
        title: 'Role',
        type: 'string',
        //width:'10%'
      },
    },
    pager:
    {
    perPage: 5
    }
  };

  source: LocalDataSource = new LocalDataSource();
  
  constructor(private dataService: DataService) {
  }

 

  ngOnInit(): void {
    let obResult = this.dataService.getListOfUsers();
    obResult.subscribe(data=>{
      this.userInfo = data
      //console.log(this.userInfo)
      this.copydata()
    })
    //console.log(this.userInfo)
    
  }

  copydata()
  {
    this.userInfo.forEach(element => {

      var source = {
        "name" : "",
        "email" : "",
        "contactNo" : "",
        "role" : ""
      }

      source.email =  element.username
      source.name = element.name
      source.role = element.roles[0].name
     if(element.profile != null)
     {
       source.contactNo =  element.profile.contactNo
     } 
     //console.log(this.source)
     this.rows.push(source)
   });
  console.log(this.rows)
  this.source.load(this.rows)
  }
  }
  export {UsersListComponent}