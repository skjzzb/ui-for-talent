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
  </ng-template>
<style>
.button {
  background-color: #008CBA; /* Blue */
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
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
    perPage: 3
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
      }))
      {
     console.log(event.data.userId)
      let obResult1 = this.dataService.deleteUser(event.data.userId);
      obResult1.subscribe(data=>{
      this.userInfo = data
      console.log(this.userInfo)
    }) 
    }
  }
  }
 // export {UsersListComponent}
