import Swal from 'sweetalert2';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { DataService } from '../../../@core/utils/data.service';
import { LocalDataSource } from 'ng2-smart-table';
import { NbWindowService, NbDialogService } from '@nebular/theme';
import { InterviewComponent } from '../interview/interview.component';
import { Router } from '@angular/router'

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

  constructor(private windowService: NbWindowService, private dialogService: NbDialogService, private router: Router) {

  }

  ngOnInit() {
    this.renderValue = this.value.toString();
    console.log(this.rowData)
  }

  onClick() {
    console.log(this.rowData)
    this.router.navigate(['/pages/candidate/evaluation-report', JSON.stringify(this.rowData)]);
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

  constructor(private windowService: NbWindowService, private dialogService: NbDialogService) {

  }

  ngOnInit() {
    this.renderValue = this.value.toString();
    console.log(this.rowData)
    this.setButtonValue()
  }

  setButtonValue() {
    if (this.rowData.interviewStatus.includes("Scheduled") ||
      this.rowData.interviewStatus.includes("rejected") ||
      this.rowData.interviewStatus.includes("HR")
    )
      this.interviewButton = "View Status"
  }

  onClick() {
    console.log(this.rowData)
    this.CardComponent = InterviewComponent;
    this.dialogService.open(this.CardComponent, {
      context: {
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
  type: any;
  vacancy: any;
  color: string;
  candidateData: any
  rows: any[] = []

  settings = {
    actions: {
      add: false,
      edit: false
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
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
      technologyStack: {
        title: 'Technology Stack',
        type: 'string',
        filter: true,
        width: '20%',
      },
      yearOfExperience: {
        title: 'Year Of Experience',
        type: 'number',
        filter: true,
        width: '10%'
      },
      reqMatchingPercent: {
        title: 'Matching Percent',
        type: 'html',
        valuePrepareFunction: (value) => {
          if (value > 75) {
            this.color = 'text-success';
          } else if (value > 50) {
            this.color = 'text-warning';
          } else
            this.color = 'text-danger';

          return `<div class="` + this.color + `">${value}%</div>`
        },
        filter: true,
        sort: true,
        sortDirection: 'desc',
        width: '10%'
      },
      shortSummaryMatchingPercent: {
        title: ' Short Summeary Matching Percent',
        type: 'html',
        valuePrepareFunction: (value) => {
          if (value > 75) {
            this.color = 'text-success';
          } else if (value > 50) {
            this.color = 'text-warning';
          } else
            this.color = 'text-danger';

          return `<div class="` + this.color + `">${value}%</div>`
        },
        filter: true,
        sort: true,
        sortDirection: 'desc',
        width: '10%'
      },
      technologyStackMatchingPercent: {
        title: 'Technology Stack Matching Percent',
        type: 'html',
        valuePrepareFunction: (value) => {
          if (value > 75) {
            this.color = 'text-success';
          } else if (value > 50) {
            this.color = 'text-warning';
          } else
            this.color = 'text-danger';

          return `<div class="` + this.color + `">${value}%</div>`
        },
        filter: true,
        sort: true,
        sortDirection: 'desc',
        width: '10%'
      },
      setInterview: {
        title: 'Schedule Interview',
        type: 'custom',
        renderComponent: ButtonViewComponent,
        onComponentInitFunction(instance) {
          instance.save.subscribe(row => {
          });
        },
        filter: false,
      },
      evaluationReport: {
        title: 'Interview Evaluation Report',
        type: 'custom',
        renderComponent: InterviewReportButtonViewComponent,
        onComponentInitFunction(instance) {
          instance.save.subscribe(row => {
          });
        },
        filter: false,

      },
      finalStatus: {
        title: 'Final Status',
        type: 'string',
        filter: true,
      }
    },
    pager:
    {
      perPage: 4
    }
  };

  source: LocalDataSource = new LocalDataSource();
  isProjectSelected = false

  constructor(private service: DataService) {
  }

  allProjects: any
  allPositions: any
  selectedProject: any
  candidatesByProject: any
  selectedPosition: any
  candidatesByPosition: any

  ngOnInit(): void {

    this.service.getAllProject().subscribe(data => {
      this.allProjects = data
    })

    this.color = 'text-danger'
  }

  onSelectProject() {
    console.log(this.selectedProject)
    this.service.getCandidateByProjectName(this.selectedProject)
      .subscribe(data => {
        this.candidatesByProject = data
        console.log(this.candidatesByProject)
      })

    this.service.getAllPositions().subscribe(data => {
      this.allPositions = data
    })

    this.isProjectSelected = true
  }

  onSelectPosition() {
    this.source = new LocalDataSource()
    if (this.candidatesByProject != null &&
      this.candidatesByProject[`${this.selectedPosition}`] != undefined) {
      this.candidatesByPosition = this.candidatesByProject[`${this.selectedPosition}`]
      this.source.load(this.candidatesByPosition)
    }
    console.log(this.candidatesByPosition)
  }

  onUpdateRecord(event) {
    console.log("working...." + event.newData.vacancy.vacancyId)
    var data = {
      "id": event.newData.id,
      "candidateName": event.newData.candidateName,
      "contactNo": event.newData.contactNo,
      "email": event.newData.email,
      "technologyStack": event.newData.technologyStack,
      "reqMatchingPercent": event.newData.reqMatchingPercent,
      "yearOfExperience": event.newData.yearOfExperience,
      "shortSummaryMatchingPercent": event.newData.shortSummaryMatchingPercent,
      "technologyStackMatchingPercent": event.newData.technologyStackMatchingPercent,
      "interviewStatus": event.newData.interviewStatus,
      "finalStatus": event.newData.finalStatus,
      "employmentStatus": event.newData.employmentStatus,
      "resumeURL": event.newData.resumeURL
    };
    Swal.fire({
      title: 'Are you sure?',
      text: "Record is updated!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Update it!'
    })
    this.service.updateCandidate(data, event.newData.vacancy.vacancyId)
      .then(
        response => {
          event.confirm.resolve();
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
        this.service.DeteteCandidate(event.data.id)
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
    var info = event.data;
    console.log(info);
    this.service.createNewCandidate(info)
      .subscribe(
        response => {
          console.log(response)
        }
      )
  }
}
