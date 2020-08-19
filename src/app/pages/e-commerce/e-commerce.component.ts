import { Component, OnInit ,ViewChild} from '@angular/core';
import { DataService } from '../../@core/utils/data.service';

@Component({
  selector: 'ngx-ecommerce',
  templateUrl: './e-commerce.component.html',
  styleUrls: ['e-commerce.component.scss'],
})

export class ECommerceComponent {
  logindetails : any
  level:any
  status:any


  currentRole:String
  studentID:Number
  interviewTime:string
  users: { name: string, title: string ,expanded: false }[]=[];
  @ViewChild('item', { static: true }) accordion;
  linearMode = true;
 

  toggleLinearMode() {
    this.linearMode = !this.linearMode;
  }
  interviewData: any;
  candData:any
  confirmedScheduledInterview:any[] = []
  studentName:any[]=[]
constructor(private service : DataService)
{}
ngOnInit(): void {
  this.logindetails =  JSON.parse(sessionStorage.getItem('user_info'))
  console.log(this.logindetails.roles)
  this.currentRole=this.logindetails.roles[0];
    
    this.service.getAllConfirmedScheduledInterview().subscribe(data =>{
      this.interviewData = data
      this.interviewData.forEach(element => {
        var source = {
          "calEventId": "",
          "candidateEmail" : "",
          "candidateId": 0,
          "candidateResponseStatus": "",
          "hrEmail" : "",
          "interviewId": 0,
          "interviewStatus": "",
          "level": "",
          "panelEmail": "",
          "panelResponseStatus": "",
          "scheduledEndTime": "",
          "scheduledOn": "",
          "vacancyId": null,
          "expanded" : false

        }

        source.calEventId = element.calEventId
        source.candidateEmail = element.candidateEmail
        source.candidateId = element.candidateId
        source.candidateResponseStatus = element.candidateResponseStatus
        source.hrEmail = element.hrEmail
        source.interviewId = element.interviewId
        source.interviewStatus = element.interviewStatus
        source.level = element.level
        source.panelEmail = element.panelEmail
        source.panelResponseStatus = element.panelResponseStatus
        source.scheduledEndTime = element.scheduledEndTime
        source.scheduledOn = element.scheduledOn
        source.vacancyId = element.vacancyId
        this.studentID=element.candidateId
        this.interviewTime=element.scheduledOn
        this.level=element.level
        if(element.candidateResponseStatus=="accepted")
        {
          this.status=1;
        }
        else{
          this.status=0;
        }

    
    //console.log(this.candidateData)
   // console.log(typeof(this.candidateData))
   let obResult = this.service.getCandidateById(this.studentID)
   obResult.subscribe(data   =>{
     this.candData=data
    
       //this.users.name = data.candidateName;
     console.log(this.candData.candidateName)
     let name=this.candData.candidateName;
     
     let title=this.interviewTime.toString();
     let exp=false;
     console.log(name)
     console.log(title)
     this.users.push({name:name,title:title,expanded:false});
     
   })
   
// this.studentName=userData.glogindetails;
 //this.users.push({name: data.candidateName,title:});


        this.interviewTime=element.scheduledOn
        this.confirmedScheduledInterview.push(source)

      })
      console.log(this.confirmedScheduledInterview)
      console.log(this.studentName)
    })

  
}

}
