import  Swal  from 'sweetalert2';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { DataService } from '../../../@core/utils/data.service';
import { LocalDataSource } from 'ng2-smart-table';
import { NgxPopoverCardComponent, NgxPopoverFormComponent } from '../../modal-overlays/popovers/popover-examples.component';
import { NbWindowService, NbDialogService } from '@nebular/theme';
import { InterviewComponent } from '../interview/interview.component';
import { ProfileComponent } from '../../../profile/profile.component';

@Component({
  selector: 'button-view',
  template: `
  <div>
  <style>
.button {
  background-color: #008CBA; /* Blue */
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  height: 50px;
  width: 150px;
}
.button2 {border-radius: 4px;}
</style>
  <button class="button button2" type="button" (click)="onClick()"> Schedule Interview
  </button>
  </div>`,
})
export class ButtonViewComponent implements OnInit {
  renderValue: string;
  CardComponent

  @Input() value: string;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  constructor(private windowService: NbWindowService,private dialogService: NbDialogService)
  {
    
  }

  ngOnInit() {
    this.renderValue = this.value.toString();
  }

  onClick()
  {
    console.log(this.rowData)
    this.CardComponent = InterviewComponent;
    this.dialogService.open(this.CardComponent, {context: {
      rowData: this.rowData,
    },
  });
  
  }

}



@Component({
  selector: 'ngx-list-of-candidate',
  templateUrl: './list-of-candidate.component.html',
  styleUrls: ['./list-of-candidate.component.scss']
})
export class ListOfCandidateComponent implements OnInit {
  type:any;
  vacancy:any;
  color:string;


  settings = {
    actions:{add:false},
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
      // id: {
      //   title: 'ID',
      //   type: 'number',
      //   filter: false
      // },
      candidateName: {
        title: 'Candidate Name',
        type: 'string',
        filter: false
      },
      contactNo: {
        title: 'Contact Number',
        type: 'string',
        filter: false
      },
      email: {
        title: 'Email',
        type: 'string',
        filter: false
      },
      technologyStack:{
        title:'Technology Stack',
        type: 'string',
        filter: false,
        width:'20%',
      },
      yearOfExperience:{
        title:'Year Of Experience',
        type: 'number',
        filter: false,
        width:'10%'
      },
      reqMatchingPercent:{
        title:'Matching Percent',
        type: 'html',
        valuePrepareFunction: (value) => {
          if(value>75)
          {
            this.color='text-success';
          }else if(value>50)
          {
            this.color='text-warning';
          }else
          this.color='text-danger';

          return `<div class="`+this.color+`">${value}%</div>`
        },
        filter: false,
        sort:true,
        sortDirection:'desc',
        width:'10%'
      },
      shortSummaryMatchingPercent:{
        title:' Short Summeary Matching Percent',
        type: 'html',
        valuePrepareFunction: (value) => {
          if(value>75)
          {
            this.color='text-success';
          }else if(value>50)
          {
            this.color='text-warning';
          }else
          this.color='text-danger';

          return `<div class="`+this.color+`">${value}%</div>`
        },
        filter: false,
        sort:true,
        sortDirection:'desc',
        width:'10%'
      },
      technologyStackMatchingPercent:{
        title:'Technology Stack Matching Percent',
        type: 'html',
        valuePrepareFunction: (value) => {
          if(value>75)
          {
            this.color='text-success';
          }else if(value>50)
          {
            this.color='text-warning';
          }else
          this.color='text-danger';

          return `<div class="`+this.color+`">${value}%</div>`
        },
        filter: false,
        sort:true,
        sortDirection:'desc',
        width:'10%'
      },
      setInterview:{
        title:'Schedule Interview',
        type:'custom',
        renderComponent:ButtonViewComponent,
        onComponentInitFunction(instance) {
         instance.save.subscribe(row => {
         });
       },width:'20%',
       filter:false,
       },
    },
    pager:
    {
    perPage: 4
    }
  };


  source: LocalDataSource = new LocalDataSource();

  constructor(private service:DataService) { 
  }

  ngOnInit(): void {
    this.retrieveData();
    this.color='text-danger';
  }

  retrieveData()
  {
    this.service.getVacancyData()
     .then(
       response => {
          this.vacancy=response.data
          }
     )
    }
    onSelectVacancy()
    {
      this.service.getCandidateByVacancyId(this.type)
      .then(
        response => {
           this.source.load(response.data);
           console.log(response.data)
           }
      )  
      console.log(this.source)
    }

    onUpdateRecord(event) {
      //this.ngOnInit();
      console.log("working...."+this.type)
        var data = {"id" : event.newData.id,
                    "candidateName" : event.newData.candidateName,
                    "contactNo" : event.newData.contactNo,
                    "email" : event.newData.email,
                     "technologyStack" : event.newData.technologyStack,
                     "reqMatchingPercent" : event.newData.reqMatchingPercent,
                    "yearOfExperience" : event.newData.yearOfExperience,
                    "shortSummaryMatchingPercent" : event.newData.shortSummaryMatchingPercent,
                    "technologyStackMatchingPercent" : event.newData.technologyStackMatchingPercent
                    };
            this.service.updateCandidate(data,this.type)
            .then(
              response => {
                 event.confirm.resolve();
              }
            )          
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
      })) {
       console.log(event.data.id)
        this.service.DeteteCandidate(event.data.id)
        .then(
          response => {
             console.log(response);
             event.confirm.resolve();
          }
        )
      } else {
        event.confirm.reject();
      }
    }
  
}
