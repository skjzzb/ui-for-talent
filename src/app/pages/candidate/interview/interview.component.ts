import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { DataService } from '../../../@core/utils/data.service';
import { TokenStorageService } from '../../../_services/token-storage.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.scss']
})
export class InterviewComponent implements OnInit {

  selectedPanel: any
  selectedMode: any
  panel: any
  scheduledOn: any
  rowData: any
  time: any
  heading: any
  buttonText: any
  interview = {
    "panelEmail": "",
    "candidateEmail": "",
    "scheduledOn": "",
    "scheduledEndTime": "",
    "level": "",
    "hrEmail": "",
    "candidateId": "",
    "vacancyId": ""

  }
  level: any[] = []
  selectedLevel: any
  vacancyData: any
  listOfHr: any
  constructor(private service: DataService, private tokenService: TokenStorageService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    console.log(this.rowData)
    this.service.getAllPanel().subscribe(data => {
      this.panel = data
    })

    this.service.getAllhr().subscribe(data => {
      this.listOfHr = data;
    })
    this.retrieveLevelData()
  }

  checkIfInterviewIsScheduled() {
  
    if(this.rowData.interviewStatus.includes("Scheduled") ||
       this.rowData.interviewStatus.includes("rejected")||
       this.rowData.interviewStatus.includes("HR")
       )
       {
          this.heading = `${this.rowData.interviewStatus}`  
          return true;
       }
       return false;
    // if (this.rowData.interviewStatus.includes("Scheduled") ||
    //   this.rowData.interviewStatus.includes("rejected") ||
    //   this.rowData.interviewStatus.includes("HR round selected")
    // ) {
    //   if (this.rowData.interviewStatus.includes("Scheduled")
    //   ) { this.heading = `${this.rowData.interviewStatus}` }
    //   if (this.rowData.interviewStatus.includes("rejected")) 
    //   { this.heading = `${this.rowData.interviewStatus}` }
    //   if (this.rowData.interviewStatus.includes("HR"))
    //     this.heading = `${this.rowData.interviewStatus}`

    //   return true;
    // }
  }

  scheduleInterview(dataFromUI) {
    var vacancyId = this.rowData.vacancy.vacancyId
    this.interview.panelEmail = dataFromUI.form.value.panel
    this.interview.candidateEmail = this.rowData.email
    this.interview.level = this.selectedLevel
    this.interview.candidateId = this.rowData.id
    this.interview.vacancyId = vacancyId

    console.log(this.interview.hrEmail)
    var time = dataFromUI.form.value.time
    let tt: [] = time.split(':')
    var abc = new Date(dataFromUI.form.value.scheduledOn)//.setTime(this.time)
    abc.setMinutes(tt.pop())
    abc.setHours(tt.pop())

    this.interview.scheduledOn = abc.toISOString();
    if (abc.getHours() < 24)
      abc.setHours(abc.getHours() + 1)
    else {
      abc.setHours(0)
      abc.setDate(abc.getDate() + 1)
    }
    this.interview.scheduledEndTime = abc.toISOString();

    var gmail;
    var user = this.tokenService.getUser()
    if (user == null) {
      gmail = localStorage.getItem("email");
    } else {
      gmail = user.username;
    }
    this.interview.hrEmail = gmail;
    console.log(this.interview)
    this.service.setMeeting(this.interview)
      .then(
        response => {
          // window.location.reload()
          this.changeInterviewStatus()
        }
      )

  }
  changeInterviewStatus() {
    console.log(`Scheduled ${this.interview.level}`)
    this.rowData.interviewStatus = `Scheduled ${this.interview.level}`
    this.updateCandidateStatus()
  }

  updateCandidateStatus() {
    var data = {
      "candidateName": "",
      "contactNo": "",
      "email": "",
      "id": 0,
      "interviewStatus": "",
      "reqMatchingPercent": 0,
      "shortSummaryMatchingPercent": 0,
      "technologyStack": "",
      "technologyStackMatchingPercent": 0,
      "yearOfExperience": 0,
      "finalStatus": "",
      "employmentStatus" : "",
      "resumeURL" : ""
    }

    data.candidateName = this.rowData.candidateName
    data.contactNo = this.rowData.contactNo
    data.email = this.rowData.email
    data.id = this.rowData.id
    data.interviewStatus = this.rowData.interviewStatus
    data.reqMatchingPercent = this.rowData.reqMatchingPercent
    data.shortSummaryMatchingPercent = this.rowData.shortSummaryMatchingPercent
    data.technologyStack = this.rowData.technologyStack
    data.technologyStackMatchingPercent = this.rowData.technologyStackMatchingPercent
    data.yearOfExperience = this.rowData.yearOfExperience
    data.finalStatus = this.rowData.finalStatus
    data.employmentStatus = this.rowData.employmentStatus
    data.resumeURL = this.rowData.resumeURL

    var vacancyId = this.rowData.vacancy.vacancyId

    this.service.updateCandidate(data, vacancyId)
      .then(
        response => {
          console.log(response)
        }
      )
  }

  onSelectLevel() {
    this.selectedLevel = this.selectedLevel.trim()
    if (this.selectedLevel == 'HR')
      this.panel = this.listOfHr
  }


  retrieveLevelData() {
    var vacancyId = this.rowData.vacancy.vacancyId;
    this.service.getVacancyById(vacancyId).subscribe(
      data => {
        this.vacancyData = data
        this.level = this.vacancyData.levelList.split(",")
        for (let index = 0; index < this.level.length; index++) {
          this.level[index] = this.level[index].trim()
        }
      }
    )
  }



}
