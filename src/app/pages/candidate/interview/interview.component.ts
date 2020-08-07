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

  interview = {
    "panelEmail" : "",
    "candidateEmail" : "",
    "scheduledOn" : "",
    "scheduledEndTime" : "",
    "level" : "Level-1",
    "hrEmail":""

  }
  constructor(private service:DataService,private tokenService:TokenStorageService) { 
  }

  ngOnInit(): void {
    //console.log(this.rowData)
    this.service.getAllPanel().subscribe(data=>{
      this.panel = data
      //console.log(this.panel)
    })
    
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
  }
  
}
