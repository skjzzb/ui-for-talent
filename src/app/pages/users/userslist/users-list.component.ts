import {  Component,ViewEncapsulation, OnInit, Input, Output, EventEmitter, TemplateRef} from '@angular/core';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { DataService } from '../../../@core/utils/data.service';
import { NbWindowService, NbDialogService } from '@nebular/theme';
import { MatDialog } from '@angular/material/dialog';
import { ProfileComponent } from '../../../profile/profile.component';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'button-view',
  template: `
  <div>
  <ng-template #dialog let-data let-ref="dialogRef">
  <div style="width: 120%;height: 100%;background-color: #fff;margin-top: auto; margin-left: auto; text-align: center;" >
  <div style="background-color: green;text-align: left;color: white; font-size: larger;"> Assign Role </div>
  <br>
  
 <input name="role" type="radio" value="1" (change)="onItemChange($event.target.value)"/> ROLE_USER <br>
 <input name="role" type="radio" value="2" (change)="onItemChange($event.target.value)"/> ROLE_MODERATOR  <br>
 <input name="role" type="radio" value="3" (change)="onItemChange($event.target.value)"/> ROLE_ADMIN <br>
 <input name="role" type="radio" value="4" (change)="onItemChange($event.target.value)"/> ROLE_HR  <br>
 <input name="role" type="radio" value="5" (change)="onItemChange($event.target.value)"/> ROLE_PANEL  <br>
  <br>
  <button style="border-radius: 4px"  type="click" (click)="onSelectRole()">Set Role</button>
  <hr>
  </div>
</ng-template>
<style>
.button {
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  cursor: pointer;
  height: 35px;
  width: 100px;
}
.button2 {border-radius: 4px;}
</style>
  <p>{{renderValue}}
  <br>
  <button  class="button button2" (click)="onClick(dialog)"> Change Role
  </button>
  </p></div>`,
})
export class ButtonViewComponent implements ViewCell, OnInit {
  renderValue: string;
  @Input() value: string;
  @Input() rowData: any;
  @Output() save: EventEmitter<any> = new EventEmitter();

  userId : any
  roleList : any
  radioGroupValue : any

  roleObj = {
    "id" : 0,
    "name" : ""
  }
 name : any
 existingRole : any
  user : any


  

  constructor(private windowService: NbWindowService, private dataService : DataService,
              private router:Router, private dialog : MatDialog,
              private dialogService: NbDialogService)
  {

  }

  ngOnInit() {
    this.renderValue = this.value.toString();
    this.userId = this.rowData.userId
  }

  onClick(dialog: TemplateRef<any>) {
    //this.dialogService.open(dialog, { context: this.renderValue });
    sessionStorage.setItem('userId_from_userlist',`${this.userId}` )
    this.dialog.open(ProfileComponent)
  }

  // onSelectRole(){
  //   console.log(this.roleObj.id)
  //   if(this.roleObj.id == 1)
  //    {
  //      console.log("hfdgsjfgsdh")
  //      this.roleObj.name = 'ROLE_USER'
  //    }
  //    if(this.roleObj.id == 2)
  //    {
  //     this.roleObj.name = 'ROLE_MODERATOR'
  //    }
  //    if (this.roleObj.id == 3)
  //    {
  //     this.roleObj.name = 'ROLE_ADMIN'
  //    }
  //    if (this.roleObj.id == 4)
  //    {
  //     this.roleObj.name = 'ROLE_HR'
  //    }
  //    if (this.roleObj.id == 5)
  //    {
  //     this.roleObj.name = 'ROLE_PANEL'
  //    }
  //    console.log(this.roleObj)
    
  //    let obResult = this.dataService.setRole(this.userId, this.roleObj)
  //    obResult.subscribe((data)=>{
  //      console.log(data)
  //      alert(`${this.roleObj.name} is set successfully..`)
  //    })
  // }
  
//   onItemChange(value){
//     this.roleObj.id = value
//  }
  
}




@Component({
  selector: 'nb-users-list',
  styleUrls: ['./users-list.component.scss'],
  templateUrl: './users-list.component.html',
  encapsulation: ViewEncapsulation.None
})
export class UsersListComponent implements OnInit{

  usingSplit:[];
  userInfo : any;

  rows:any[] = []

  settings = {
 //   hideSubHeader: true,
   actions:{add:false,
             edit:false},
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
      // role: {
      //   title: 'Role',
      //   type: 'string',
      //   //width:'10%'
      // },
      role:{
        title:'Role',
        type:'custom',
        renderComponent:ButtonViewComponent,
        onComponentInitFunction(instance) {
         instance.save.subscribe(row => {
           //alert(`${row.shortSummary} `)
         });
       },width:'20%',
       filter:false,
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
        "userId" : 0
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

  onDeleteConfirm(event): void {
      /*if (Swal.fire({
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
      }))*/
      {
     console.log(event.data.userId)
       /* this.dataService.deleteUser(event.data.id)
        .then(
          response => {
             console.log(response);
             event.confirm.resolve();
          }
        )
      } else {
        event.confirm.reject();
      }*/
      let obResult1 = this.dataService.deleteUser(event.data.userId);
      obResult1.subscribe(data=>{
      this.userInfo = data
      console.log(this.userInfo)
    }) 
    }
  }
  }
 // export {UsersListComponent}
