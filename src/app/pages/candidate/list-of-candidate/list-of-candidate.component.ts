import  Swal  from 'sweetalert2';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { DataService } from '../../../@core/utils/data.service';
import { LocalDataSource } from 'ng2-smart-table';
import { NgxPopoverCardComponent, NgxPopoverFormComponent } from '../../modal-overlays/popovers/popover-examples.component';
import { NbWindowService, NbDialogService } from '@nebular/theme';
import { InterviewComponent } from '../interview/interview.component';
import { ProfileComponent } from '../../../profile/profile.component';
import { ShowcaseDialogComponent } from '../../modal-overlays/dialog/showcase-dialog/showcase-dialog.component';
import { EvaluationReportComponent } from '../evaluation-report/evaluation-report';
import {Router, NavigationExtras} from '@angular/router'

@Component({
  selector: 'interview-report-button-view',
  template: `
  <div>
  <script src="https://kit.fontawesome.com/a076d05399.js"></script>
  <style>
.button {
  background-color: #4CAF50; /* Green */
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

  <button class="button button2" type="button" (click)="onClick()">
  <i class="fas fa-clock"></i> &nbsp;
  Evaluation Report
  </button>
  </div>`,
})
export class InterviewReportButtonViewComponent implements OnInit {
  renderValue: string;
  CardComponent
  interviewButton = "Schedule Interview"
  colour = "#008CBA"

  @Input() value: string;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  constructor(private windowService: NbWindowService,private dialogService: NbDialogService,private router:Router)
  {

  }

  ngOnInit() {
    this.renderValue = this.value.toString();
    console.log(this.rowData)
  }


  onClick()
  {
    //const navigationExtras: NavigationExtras = {state: {example: 'This is an example'}};
    //this.router.navigate(['/pages/candidate/evaluation-report'], navigationExtras);
     this.router.navigate(['/pages/candidate/evaluation-report',JSON.stringify(this.rowData)]);
  //   console.log(this.rowData)
  //   this.CardComponent = EvaluationReportComponent;
  //   this.dialogService.open(this.CardComponent, {context: {
  //     rowData: this.rowData,
  //   },
  // });
  }

}
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

  <button class="button button2" type="button" (click)="onClick()"> {{interviewButton}}
  </button>
  </div>`,
})
export class ButtonViewComponent implements OnInit {
  renderValue: string;
  CardComponent
  interviewButton = "Schedule Interview"


  @Input() value: string;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  constructor(private windowService: NbWindowService,private dialogService: NbDialogService)
  {

  }

  ngOnInit() {
    this.renderValue = this.value.toString();
    console.log(this.rowData)
    this.setButtonValue()
  }

  setButtonValue(){
    if(this.rowData.interviewStatus.includes("Scheduled") ||
    this.rowData.interviewStatus.includes("rejected")||
    this.rowData.interviewStatus.includes("HR round selected")
      )
      this.interviewButton = "View Status"
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
  candidateData : any
  rows:any[] = []

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
        filter: true
      },
      contactNo: {
        title: 'Contact Number',
        type: 'string',
        filter: true
      },
      email: {
        title: 'Email',
        type: 'string',
        filter: true
      },
      technologyStack:{
        title:'Technology Stack',
        type: 'string',
        filter: true,
        width:'20%',
      },
      yearOfExperience:{
        title:'Year Of Experience',
        type: 'number',
        filter: true,
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
        filter: true,
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
        filter: true,
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
        filter: true,
        sort:true,
        sortDirection:'desc',
        width:'10%'
      },
      interviewStatus:{
        title:'Interview Status',
        type : 'string',
        filter: true
        //width:'20%'

      },
      setInterview:{
        title:'Schedule Interview',
        type:'custom',
        renderComponent:ButtonViewComponent,
        onComponentInitFunction(instance) {
         instance.save.subscribe(row => {
         });
       },
       filter:false,
       },
       evaluationReport:{
        title:'Interview Evaluation Report',
        type:'custom',
        renderComponent:InterviewReportButtonViewComponent,
        onComponentInitFunction(instance) {
         instance.save.subscribe(row => {
         });
       },
       filter:false,

       },
       finalStatus : {
        title:'Final Status',
        type : 'string',
        filter: true,
       }
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
    this.color='text-danger'
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
        this.candidateData = response.data
          localStorage.setItem('vid', this.type)
          this.copydata();
          }
    )
    console.log(this.source)
  }

  copydata()
  {
    this.candidateData.forEach(element => {

      var source = {
        "candidateName" : "",
        "contactNo" : "",
        "email" : "",
        "employmentStatus" : "",
        "id" : 0,
        "interviewStatus" : "",
        "reqMatchingPercent" : 0,
        "shortSummaryMatchingPercent" : 0,
        "technologyStack" : "",
        "technologyStackMatchingPercent" : "",
        "yearOfExperience" : "",
        "finalStatus" : ""
      }

      source.candidateName =  element.candidateName
      source.contactNo = element.contactNo
      source.email = element.email
      source.employmentStatus = element.employmentStatus
      source.id = element.id
      source.interviewStatus = element.interviewStatus
      source.reqMatchingPercent = element.reqMatchingPercent
      source.shortSummaryMatchingPercent = element.shortSummaryMatchingPercent
      source.technologyStack = element.technologyStack
      source.technologyStackMatchingPercent = element.technologyStackMatchingPercent
      source.yearOfExperience = element.yearOfExperience
      source.finalStatus = element.finalStatus;

      if(element.interviewStatus == null)
      {
        source.interviewStatus =  'Not scheduled any round'
      }
      this.rows.push(source)
    });
    console.log(this.source)
  this.source.load(this.rows)
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
                  "technologyStackMatchingPercent" : event.newData.technologyStackMatchingPercent,
                  "interviewStatus" :  event.newData.interviewStatus,
                  "finalStatus" : event.newData.finalStatus
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
