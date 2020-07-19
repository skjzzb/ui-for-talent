import {  Component,ViewEncapsulation, OnInit, Input, Output, EventEmitter, TemplateRef} from '@angular/core';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { DataService } from '../../../@core/utils/data.service';
import { NbWindowService, NbDialogService } from '@nebular/theme';
import { MatDialog } from '@angular/material/dialog';
import { ProfileComponent } from '../../../profile/profile.component';
import Swal from 'sweetalert2'

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
 //   hideSubHeader: true,
    actions:{
      custom: [
        {
          name: 'yourAction',
          title: '<i class="ion-person" title="YourAction"></i>'
        },
      ],
      add: false,
      edit: false,
      delete: false
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
  
  constructor(private dataService: DataService ,  private windowService: NbWindowService, 
              private dialog : MatDialog) {  }

  ngOnInit(): void {
    let obResult = this.dataService.getListOfUsers();
    obResult.subscribe(data=>{
      this.userInfo = data
      console.log(this.userInfo)
      this.copydata()
    }) 
  }

  copydata()
  {
    this.userInfo.forEach(element => {

      var source = {
        "name" : "",
        "email" : "",
        "contactNo" : "",
        "role" : "",
        "userId" : ""
      }

      source.email =  element.username
      source.name = element.name
      source.role = element.roles[0].name
      source.userId = element.id
     if(element.profile != null)
     {
       source.contactNo =  element.profile.contactNo
     } 
     this.rows.push(source)
   });
  this.source.load(this.rows)
  }

  onCustomAction(event) {
    sessionStorage.setItem('userId_from_userlist',`${event.data.userId}` )
    alert(`Name : ${event.data.name} , Existing Role : ${event.data.role} `)
    this.dialog.open(ProfileComponent)
  }

  }
  export {UsersListComponent}