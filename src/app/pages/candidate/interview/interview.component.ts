import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { DataService } from '../../../@core/utils/data.service';
import { TokenStorageService } from '../../../_services/token-storage.service';

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
    "level" : "Technical - 1",
    "hrEmail":""

  }
  constructor(private service:DataService,private tokenService:TokenStorageService) { 
  }

  ngOnInit(): void {
    console.log(this.rowData)
    this.service.getAllPanel().subscribe(data=>{
      this.panel = data
    })
    this.checkInterviewStatus()
  }

  checkInterviewStatus(){
    if(this.rowData.interviewStatus === 'Not scheduled any round')
    {
      this.heading = 'Schedule Technical - 1'
      this.buttonText = 'Schedule Technical - 1'
      this.interview.level = 'Technical - 1'
    }
    if(this.rowData.interviewStatus === 'Scheduled Technical - 1')
    this.heading = 'Technical - 1 result is pending'
    if(this.rowData.interviewStatus == 'Technical - 1 rejected')
    this.heading = 'Technical - 1 rejected'

    if(this.rowData.interviewStatus == 'Technical - 1 selected')
    {
      this.heading = 'Schedule Technical - 2'
      this.buttonText = 'Schedule Technical - 2'
      this.interview.level = 'Technical - 2'
    }
    if(this.rowData.interviewStatus === 'Scheduled Technical - 2')
    this.heading = 'Technical - 2 result is pending'
    if(this.rowData.interviewStatus == 'Technical - 2 rejected')
    this.heading = 'Technical - 2 rejected'

    if(this.rowData.interviewStatus == 'Technical - 2 selected')
    {
      this.heading = 'Schedule HR round'
      this.buttonText = 'Schedule HR round'
      this.interview.level = 'HR Round'
    }
    if(this.rowData.interviewStatus == 'Schedule HR round')
    this.heading = 'HR round result is pending'
    if(this.rowData.interviewStatus == 'HR round selected')
    this.heading = 'This candidate is selected'
    if(this.rowData.interviewStatus == 'HR round rejected')
    this.heading = 'HR round rejected'


  }

  scheduleInterview(dataFromUI)
  {
    this.interview.panelEmail = dataFromUI.form.value.panel
    this.interview.candidateEmail = this.rowData.email
    
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
    if(this.rowData.interviewStatus === 'Not scheduled any round')
      this.rowData.interviewStatus = 'Scheduled Technical - 1'
    
    if(this.rowData.interviewStatus == 'Technical - 1 selected')
      this.rowData.interviewStatus = 'Scheduled Technical - 2'
  
    if(this.rowData.interviewStatus == 'Technical - 2 selected')
       this.rowData.interviewStatus = 'Scheduled HR round'

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
      "yearOfExperience": 0
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

    var vacancyId = localStorage.getItem('vid')
    localStorage.removeItem('vid')
    this.service.updateCandidate(data, vacancyId)
    .then(
      response =>{
        console.log(response)
      }
    )
  }
  
}
