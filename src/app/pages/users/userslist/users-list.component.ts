import {  Component,ViewEncapsulation, OnInit, Input, Output, EventEmitter, TemplateRef} from '@angular/core';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { DataService } from '../../../@core/utils/data.service';
import { NbWindowService, NbDialogService } from '@nebular/theme';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'button-view',
  template: `
  <div>
  <ng-template #dialog let-data let-ref="dialogRef">

  <div style="width: 120%;height: 100%;background-color: #fff;margin-top: auto; margin-left: auto; text-align: center;" >
  <div style="background-color: green;text-align: left;color: white; font-size: larger;"> Detail Summary</div>
  <br>
  <div >{{renderValue}}</div>
  <br>
  <button nbButton (click)="ref.close()">Close Dialog</button>
  </div>
</ng-template>
  <p>{{first3words}}
  <button (click)="onClick(dialog)">
  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-chevron-double-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"/>
    <path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"/>
  </svg>
  </button>
  </p></div>`,
})
export class ButtonViewComponent implements ViewCell, OnInit {
  renderValue: string;
  usingSplit:string[];
  first3words:string; 

  @Input() value: string;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  constructor(private windowService: NbWindowService,private dialogService: NbDialogService)
  {

  }

  ngOnInit() {
    this.renderValue = this.value.toString();
    this.usingSplit = this.value.split(' ');
    this.first3words=this.usingSplit[0]+' '+this.usingSplit[1]+' '+this.usingSplit[2]+' ';
  }

  onClick(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog, { context: this.renderValue });
  }
}




@Component({
  selector: 'nb-users-list',
  styleUrls: ['./users-list.component.scss'],
  templateUrl: './users-list.component.html',
  encapsulation: ViewEncapsulation.None
})
class UsersListComponent {

  usingSplit:[];
  userInfo : any 
  
  source = {
    "name" : "",
    "email" : "",
    "contactNo" : "",
    "role" : ""
  }
  rows = []

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
      username: {
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

  
  
  constructor(private dataService: DataService) {
  }

 

  ngOnInit(): void {
    let obResult = this.dataService.getListOfUsers();
    obResult.subscribe(data=>{
      this.userInfo = data
  
       for (let index = 0; index < this.userInfo.length; index++) {
           this.source.email =  this.userInfo[index].username
           this.source.name = this.userInfo[index].name
           this.source.role = this.userInfo[index].roles[0].name
          if(this.userInfo[index].profile != null)
          {
            this.source.contactNo =  this.userInfo[index].profile.contactNo
          } 
          console.log(this.source)
          this.rows.push(this.source)
       }
       console.log(this.rows)
       console.log(this.userInfo)
    })
  }

  
 
  
  }
  export {UsersListComponent}