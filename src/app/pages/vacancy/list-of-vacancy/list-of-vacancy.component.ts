import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { DataService } from '../../../@core/utils/data.service';
import { NbWindowService, NbDialogService } from '@nebular/theme';
import { NgxPopoverCardComponent } from '../../modal-overlays/popovers/popover-examples.component';
import Swal from 'sweetalert2';
//import { NgxPopoverCardComponent } from './popover-examples.component';

@Component({
  selector: 'button-view',
  template: `
  <div>
  <p>{{first3words}}
  <button type="button" (click)="onClick()">
  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-chevron-double-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"/>
    <path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"/>
  </svg>
  </button>
  </p></div>`,
})
export class ButtonViewComponent implements OnInit {
  renderValue: string;
  usingSplit:string[];
  first3words:string; 

  CardComponent

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

  onClick()
  {
    this.CardComponent = NgxPopoverCardComponent;
    this.dialogService.open(this.CardComponent, {context: {
      renderValue: this.renderValue,
    },
  });
  
  }

//   onClick(dialog: TemplateRef<any>) {  dialog

//     <ng-template #dialog let-data let-ref="dialogRef">

//   <div style="width: 120%;height: 100%;background-color: #fff;margin-top: auto; margin-left: auto; text-align: center;" >
//   <div style="background-color: green;text-align: left;color: white; font-size: larger;"> Detail Summary</div>
//   <br>
//   <div >{{renderValue}}</div>
//   <br>
//   <button nbButton (click)="ref.close()">Close Dialog</button>
//   </div>
// </ng-template>

//     this.dialogService.open(dialog, { context: this.renderValue });
//   }
}


@Component({
  selector: 'ngx-list-of-vacancy',
  templateUrl: './list-of-vacancy.component.html',
  styleUrls: ['./list-of-vacancy.component.scss']
})
export class ListOfVacancyComponent implements OnInit {

  usingSplit:[];

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
      projectName: {
        title: 'Project',
        type: 'string',
        //width:'10%'
      },
      jobTitle: {
        title: 'Title',
        type: 'string',
        //width:'10%'
      },
      noOfVacancy:{
        title:'Vacancy',
        type:'number',
        //width:'10%'
      },
      experienceRequired:{
        title:'Experience',
        type:'number'
      },
      posOpenDate: {
        title: 'Open Date',
        type: 'date',
        //width:'10%'
      },
      posOnBoardDate:{
        title:'On Board Date',
        type: 'date',
        //width:'10%'
      },
      jd:{
        title:'Job Description',
        type: 'string',
        //width:'10%'
      },
      levelList :{
        title:'Interview Levels',
        type:'string'
      },
      shortSummary:{
         title:'Summary',
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

  constructor(private service: DataService) {
  }

  ngOnInit(): void {
    this.retrieveData();
  }

  onSelectTechnology()
  {
    console.log('working...')
  }

  retrieveData()
  {
    this.service.getVacancyData()
     .then(
       response => {
          console.log(response);
           this.source.load(response.data);
       }
     )
    }

  onDeleteConfirm(event): void {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.service.DeteteVacancy(event.data.vacancyId)
      .then(
        response => {
           console.log(response);
           event.confirm.resolve();
           Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      )  
      }
    })
  }

 
  updateRecord(event) {
    //this.ngOnInit();
     var data = {"vacancyId" : event.newData.vacancyId,
                 "jobTitle" : event.newData.jobTitle,
                 "projectName" : event.newData.projectName,
                 "posOpenDate" : event.newData.posOpenDate,
                  "posOnBoardDate" : event.newData.posOnBoardDate,
                  "jd" : event.newData.jd,
                  "noOfVacancy" : event.newData.noOfVacancy,
                  "shortSummary" : event.newData.shortSummary,
                  "experienceRequired":event.newData.experienceRequired,
                  "levelList" : event.newData.levelList
                };
                console.log(data)

         this.service.updateVacancy(data,event.newData.vacancyId)
         .then(
           response => {
              console.log(response);
              event.confirm.resolve();
           }
         )
        
  }

}