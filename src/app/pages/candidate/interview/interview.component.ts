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

  selectedPanel : any
  selectedMode : any
  panel : any
  scheduledOn : any
  rowData : any
  time : any
  heading : any
  buttonText : any
  interview = {
    "panelEmail" : "",
    "candidateEmail" : "",
    "scheduledOn" : "",
    "scheduledEndTime" : "",
    "level" : "",
    "hrEmail":""

  }
  level : any
  selectedLevel : any
  constructor(private service:DataService,private tokenService:TokenStorageService, private fb: FormBuilder) { 
  }

  ngOnInit(): void {
    console.log(this.rowData)
    this.service.getAllPanel().subscribe(data=>{
      this.panel = data
    })
   // this.checkInterviewStatus()
    this.retrieveLevelData()
  }

  // checkInterviewStatus(){
  //   if(this.rowData.interviewStatus === 'Not scheduled any round')
  //   {
  //     this.heading = 'Schedule Technical - 1'
  //     this.buttonText = 'Schedule Technical - 1'
  //     this.interview.level = 'Technical - 1'
  //   }
  //   if(this.rowData.interviewStatus === 'Scheduled Technical - 1')
  //   this.heading = 'Technical - 1 result is pending'
  //   if(this.rowData.interviewStatus == 'Technical - 1 rejected')
  //   this.heading = 'Technical - 1 rejected'

  //   if(this.rowData.interviewStatus == 'Technical - 1 selected')
  //   {
  //     this.heading = 'Schedule Technical - 2'
  //     this.buttonText = 'Schedule Technical - 2'
  //     this.interview.level = 'Technical - 2'
  //   }
  //   if(this.rowData.interviewStatus === 'Scheduled Technical - 2')
  //   this.heading = 'Technical - 2 result is pending'
  //   if(this.rowData.interviewStatus == 'Technical - 2 rejected')
  //   this.heading = 'Technical - 2 rejected'

  //   if(this.rowData.interviewStatus == 'Technical - 2 selected')
  //   {
  //     this.heading = 'Schedule HR round'
  //     this.buttonText = 'Schedule HR round'
  //     this.interview.level = 'HR Round'
  //   }
  //   if(this.rowData.interviewStatus == 'Scheduled HR round')
  //   this.heading = 'HR round result is pending'
  //   if(this.rowData.interviewStatus == 'HR round selected')
  //   this.heading = 'This candidate is selected'
  //   if(this.rowData.interviewStatus == 'HR round rejected')
  //   this.heading = 'HR round rejected'
  // }

  checkIfInterviewIsScheduled(){
    if(this.rowData.interviewStatus.includes("Scheduled") ||
       this.rowData.interviewStatus.includes("rejected")||
       this.rowData.interviewStatus.includes("HR round selected")
       )
       {
         if(this.rowData.interviewStatus.includes("Scheduled"))
         this.heading = 'Interview result is pending'
         if(this.rowData.interviewStatus.includes("rejected"))
         this.heading = 'This candidated is rejected'
         if(this.rowData.interviewStatus == 'HR round selected')
         this.heading = 'This candidate is selected'

        return true;
       }
  }

  scheduleInterview(dataFromUI)
  {
    this.interview.panelEmail = dataFromUI.form.value.panel
    this.interview.candidateEmail = this.rowData.email
    this.interview.level = this.selectedLevel
    
    console.log(this.interview.hrEmail)
      var time=dataFromUI.form.value.time
      let tt:[]= time.split(':')
    var abc=new Date(dataFromUI.form.value.scheduledOn)//.setTime(this.time)
    abc.setMinutes(tt.pop())
    abc.setHours(tt.pop())

    this.interview.scheduledOn=abc.toISOString();
    if(abc.getHours()<24)
    abc.setHours(abc.getHours()+1)
    else
    {
      abc.setHours(0)
      abc.setDate(abc.getDate()+1)
    }
    this.interview.scheduledEndTime=abc.toISOString();

    var gmail;
    var user=this.tokenService.getUser()
    if(user==null)
    {
     gmail=localStorage.getItem("email");
    }else
    {
    gmail = user.username;
    }
    this.interview.hrEmail=gmail;
    console.log(this.interview)
    this.service.setMeeting(this.interview)
    .then(
      response =>{
        window.location.reload()
      }
    )
    this.changeInterviewStatus()
  }
  changeInterviewStatus()
  {
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
      "finalStatus" : ""
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

    var vacancyId = localStorage.getItem('vid')
    localStorage.removeItem('vid')
    this.service.updateCandidate(data, vacancyId)
    .then(
      response =>{
        console.log(response)
      }
    )
  }

  onSelectLevel(){
    console.log(this.selectedLevel)
  }
 
  vacancyData : any
  retrieveLevelData(){
    this.service.getLevelData()
  .subscribe(
    (response:any) => {
        this.level=response;
        console.log(response);
    }
  )
  var vacancyId = localStorage.getItem('vid')
  this.service.getVacancyById(vacancyId).subscribe(
  data =>{
    this.vacancyData = data
    console.log(this.vacancyData.levelList)
    this.level = this.vacancyData.levelList.split(",")
    
  }
) 

  
}

 
  
}
