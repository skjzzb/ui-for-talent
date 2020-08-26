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
  vacancyId:Number
  lvl : any[] = []
  selectedLevel : any
  vacancyData : any
  currentRole:String
  studentID:Number
  nStudentID:Number
  indexValue:Number;
  interviewTime:string
  interviewID:Number
  users: {id:Number, name: string, title: string ,expanded: false }[]=[];
  notAceeppted: { id:Number,name: string, title: string ,expanded: false }[]=[];

  @ViewChild('item', { static: true }) accordion;

  linearMode = true;
 

  toggleLinearMode() {
    this.linearMode = !this.linearMode;
  }
  interviewData: any;
  candData:any
  confirmedScheduledInterview:any[] = []
  scheduledInterview:any[] = []
  selectedItemNgModel='1';
  panalResponse:String;
  panalEmail:String
  candidatRespose:String

  studentName:any[]=[]

  listtype = [
    { id: 1, name: 'Aceppted' },
    { id: 2, name: 'Not Aceppted' },
    //{ id: 3, name: 'Pavilnys', disabled: true }
];
selectedCityId: number = null;
constructor(private service : DataService)
{}
ngOnInit(): void {
  this.selectedCityId = this.listtype[0].id;

  this.logindetails =  JSON.parse(sessionStorage.getItem('user_info'))
  console.log(this.logindetails.roles)
  this.currentRole=this.logindetails.roles[0];
  this.acccptedStatus();
}
acccptedStatus()
{

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
      this.vacancyId=element.vacancyId
      this.interviewID=element.interviewId
      console.log(this.vacancyId)
    
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
   let name=this.candData.candidateName;
   
   let title=element.scheduledOn.substring(0,10)+" "+element.scheduledOn.substring(11,19);
   let exp=false;
   let id=element.interviewId;
  
   this.users.push({id:id,name:name,title:title,expanded:false});
   
 })

 
 
// this.studentName=userData.glogindetails;
//this.users.push({name: data.candidateName,title:});


      this.interviewTime=element.scheduledOn
      this.confirmedScheduledInterview.push(source)

    })
    this.users=[];
    this.lvl=[]
    console.log(this.confirmedScheduledInterview)
    console.log(this.studentName)
  })

}
notAcceptedStatus(){
  this.service.getListOfInterview() 
  .then(
   response => {
     console.log(response.data)
       console.log (response.data[0].scheduledOn.substring(0,10))
       response.data.forEach(element => {
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
           "vacancyId": 0,
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
         source.scheduledEndTime = element.scheduledEndTime.substring(12,19)
         source.scheduledOn = element.scheduledOn.substring(0,10)
         source.vacancyId = element.vacancyId
         this.nStudentID=element.candidateId
         this.panalEmail=element.panelEmail
         this.panalResponse=element.panelResponseStatus
         this.candidatRespose=element.candidateResponseStatus
        // this.retrieveLevelData(element.vacancyId,element.level)

         this.scheduledInterview.push(source)
console.log(this.scheduledInterview)
         
       let noAceepted = this.service.getCandidateById(this.nStudentID)
       noAceepted.subscribe(data   =>{
    this.candData=data
   console.log(data)
      //this.users.name = data.candidateName;
    let name=this.candData.candidateName;
    
    let title=element.scheduledOn.substring(0,10)+" "+element.scheduledOn.substring(11,19)
    let id=element.interviewId
   
    this.notAceeppted.push({id:id,name:name,title:title,expanded:false});
    
  })

       });

      // this.source=this.scheduledInterview
      }
 )
 this.notAceeppted=[]


}
availableClick(id)
{
  let candidateInfo;
console.log("Hello Saurabh")
console.log(id)
console.log(this.users)
let interviewCandidate=this.service.getInterviewByInterviewId(id);
interviewCandidate.subscribe(data =>{
   candidateInfo =data;
  console.log(candidateInfo)


  console.log(candidateInfo.level)
  this.retrieveLevelData(candidateInfo.vacancyId,candidateInfo.level)
  console.log(this.level)

  this.level=""

})


}
not_availableClick(id)
{
  let candidateInfo;
console.log("Hello not")
console.log(id)
console.log(this.users)
let interviewCandidate=this.service.getInterviewByInterviewId(id);
interviewCandidate.subscribe(data =>{
   candidateInfo =data;
  console.log(candidateInfo)

  this.panalResponse=candidateInfo.panelResponseStatus
  this.candidatRespose=candidateInfo.candidateResponseStatus 
  console.log(candidateInfo.level)
  this.retrieveLevelData(candidateInfo.vacancyId,candidateInfo.level)
  console.log(this.level)

  this.level=""

})
}
retrieveLevelData(id,level)
{
  console.log(id)
  this.service.getVacancyById(id).subscribe(
    data =>{
      this.vacancyData = data
      this.lvl = this.vacancyData.levelList.split(",")
      for (let index = 0; index < this.lvl.length; index++) {
        this.lvl[index] = this.lvl[index].trim()
        if(this.lvl[index]==level)
        {
          this.indexValue=index;
        }
        console.log(this.lvl[index]);
      }
      console.log(this.indexValue+" index value is")

    }
  )
  this.lvl=[]

  console.log(id)

}

}
