import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../../@core/utils/data.service';
import { NbStepperComponent ,NbDialogService} from '@nebular/theme';
import { AfterViewInit } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { ReScheduleInterviewComponent } from '../candidate/ReScheduleInterview/re-schedule-interview.component';



@Component({
  selector: 'ngx-ecommerce',
  templateUrl: './e-commerce.component.html',
  styleUrls: ['e-commerce.component.scss'],
})

export class ECommerceComponent implements OnInit {
  logindetails: any
  level: any
  status: any
  vacancyId: Number
  lvl: any[] = []
  stat: any[] = []
  completed=false;
  selectedLevel: any
  vacancyData: any
  currentRole: String
  studentID: Number
  nStudentID: Number
  indexValue: Number;
  interviewTime: string
  interviewID: Number
  meetLink: String
  candidateIID:Number
  users: { id: Number, name: string, title: string, expanded: false }[] = [];
  notAceeppted: { id: Number, name: string, title: string, expanded: false }[] = [];
  rowData:any



  @ViewChild('item', { static: true }) accordion;

  @ViewChild('stepper') stepper: NbStepperComponent;
  @ViewChild('stepper') private myStepper: MatStepper;
  @ViewChild('btn') fileInput: ElementRef;


  linearMode = true;


  toggleLinearMode() {
    this.linearMode = !this.linearMode;
  }
  interviewData: any;
  candData: any
  confirmedScheduledInterview: any[] = []
  scheduledInterview: any[] = []
  selectedItemNgModel = '1';
  panalResponse: String;
  panalEmail: String
  candidatRespose: String
  selectedActivityIndex: Number
  studentName: any[] = []
  selectIndex: Number

  listtype = [
    { id: 1, name: 'Aceppted' },
    { id: 2, name: 'Not Aceppted' },
    //{ id: 3, name: 'Pavilnys', disabled: true }
  ];
  selectedCityId: number = null;
  CardComponent

  constructor(private service: DataService,private router:Router,private dialogService: NbDialogService) { }
  ngOnInit(): void {
    this.selectedCityId = this.listtype[0].id;

    this.logindetails = JSON.parse(sessionStorage.getItem('user_info'))
    console.log(this.logindetails.roles)
    this.currentRole = this.logindetails.roles[0];
    this.acccptedStatus();

  }

  acccptedStatus() {

    this.service.getAllConfirmedScheduledInterview().subscribe(data => {
      this.interviewData = data
      this.interviewData.forEach(element => {
        var source = {
          "calEventId": "",
          "candidateEmail": "",
          "candidateId": 0,
          "candidateResponseStatus": "",
          "hrEmail": "",
          "interviewId": 0,
          "interviewStatus": "",
          "level": "",
          "panelEmail": "",
          "panelResponseStatus": "",
          "scheduledEndTime": "",
          "scheduledOn": "",
          "vacancyId": null,
          "meetLink": "",
          "expanded": false

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
        source.meetLink = element.meetLink
        this.meetLink = element.meetLink
        this.studentID = element.candidateId
        this.interviewTime = element.scheduledOn
        this.level = element.level
        this.vacancyId = element.vacancyId
        this.interviewID = element.interviewId
        console.log(this.vacancyId)

        if (element.candidateResponseStatus == "accepted") {
          this.status = 1;
        }
        else {
          this.status = 0;
        }
        // console.log(typeof(this.candidateData))
        let obResult = this.service.getCandidateById(this.studentID)
        obResult.subscribe(data1 => {
          this.candData = data1
          console.log(this.candData)

          //this.users.name = data.candidateName;
          let name = this.candData.candidateName;

          let title = element.scheduledOn.substring(0, 10) + " " + element.scheduledOn.substring(11, 19);
          let exp = false;
          let id = element.interviewId;

          this.users.push({ id: id, name: name, title: title, expanded: false });
        })
        this.interviewTime = element.scheduledOn
        this.confirmedScheduledInterview.push(source)
      })
      this.users = [];
      this.lvl = []
      console.log(this.confirmedScheduledInterview)
      console.log(this.studentName)
    })

  }
  notAcceptedStatus() {
    this.service.getListOfInterview()
      .then(
        response => {
          console.log(response.data)
          console.log(response.data[0].scheduledOn.substring(0, 10))
          response.data.forEach(element => {
            var source = {
              "calEventId": "",
              "candidateEmail": "",
              "candidateId": 0,
              "candidateResponseStatus": "",
              "hrEmail": "",
              "interviewId": 0,
              "interviewStatus": "",
              "level": "",
              "panelEmail": "",
              "panelResponseStatus": "",
              "scheduledEndTime": "",
              "scheduledOn": "",
              "vacancyId": 0,
              "meetLink": ""
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
            source.scheduledEndTime = element.scheduledEndTime.substring(12, 19)
            source.scheduledOn = element.scheduledOn.substring(0, 10)
            source.vacancyId = element.vacancyId
            source.meetLink = element.meetLink
            this.nStudentID = element.candidateId
            this.panalEmail = element.panelEmail
            this.panalResponse = element.panelResponseStatus
            this.candidatRespose = element.candidateResponseStatus
            // this.retrieveLevelData(element.vacancyId,element.level)

            this.scheduledInterview.push(source)
            console.log(this.scheduledInterview)

            let noAceepted = this.service.getCandidateById(this.nStudentID)
            noAceepted.subscribe(data => {
              this.candData = data
              console.log(data)
              //this.users.name = data.candidateName;
              let name = this.candData.candidateName;

              let title = element.scheduledOn.substring(0, 10) + " " + element.scheduledOn.substring(11, 19)
              let id = element.interviewId

              this.notAceeppted.push({ id: id, name: name, title: title, expanded: false });
            })
          });
        }
      )
    this.notAceeppted = []


  }
  onClick()
  {
  //  console.log(this.rowData)
    // this.router.navigate(['/pages/candidate/evaluation-report',JSON.stringify(this.rowData)]);
let candData;
    this.service.getCandidateById(this.candidateIID).subscribe(data=>{
        candData=data;
        this.router.navigate(['/pages/candidate/evaluation-report',JSON.stringify(candData)],
        { queryParams: { page: 1 } });
    })

  }
  onReschedule()
  {
    console.log('Reschedule clicked')
    console.log(this.rowData)
    //let rowData;
    this.CardComponent = ReScheduleInterviewComponent;
    this.dialogService.open(this.CardComponent, {context: {
      rowData: this.rowData,
    }
  })
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
    this.meetLink=candidateInfo.meetLink
    this.candidateIID=candidateInfo.candidateId;

    console.log(this.meetLink)
    this.retrieveLevelData(candidateInfo.vacancyId,candidateInfo.level)
    console.log(this.level)
    //this.displayStepper(candidateInfo.vacancyId,candidateInfo.level)
    // document.getElementById("btn").click();

    this.level=""


  })

  }
   not_availableClick(id) {
    let candidateInfo;
    console.log("Hello not")
    console.log(id)
    console.log(this.users)
    let interviewCandidate = this.service.getInterviewByInterviewId(id);
      interviewCandidate.subscribe(data => {
      candidateInfo = data;
      this.rowData=candidateInfo
      console.log(candidateInfo)

      this.panalResponse = candidateInfo.panelResponseStatus
      this.candidatRespose = candidateInfo.candidateResponseStatus
      console.log(candidateInfo.level)
      console.log(candidateInfo.level)
      this.meetLink = candidateInfo.meetLink
      console.log(this.meetLink)
      console.log(this.lvl)
     this.retrieveLevelData(candidateInfo.vacancyId, candidateInfo.level)
      // this.displayStepper(candidateInfo.vacancyId,candidateInfo.level)



      this.level = ""


    })

  }
  goForward(){

    this.stepper.next();
   // document.getElementById("btn").click()

}
    retrieveLevelData(id, level) {

     this.service.getVacancyById(id).subscribe(

      data => {

        this.vacancyData = data
        this.lvl = this.vacancyData.levelList.split(",")


        for (let index = 0; index < this.lvl.length; index++) {
          this.lvl[index] = this.lvl[index].trim()

          console.log("Dispaly Stepper" + this.lvl[index] + "----" + level + "---" + index)

          this.completed=true;

          if (this.lvl[index] == level) {
            this.indexValue = index;
            this.completed=false;
            //this.lvl[this.lvl.length]=index;
            this.stat[index]=this.completed

              for(let i=index+1;i<this.lvl.length;i++)
              {
                this.stat[i]=this.completed
              }

            console.log("the Complleted valus is "+this.completed +" inde is "+index)

            break;


          }

          this.stat[index]=this.completed


          console.log("the Complleted valus is "+this.completed +" inde is "+index)




          console.log("Go forward method called" + this.lvl[index]);
        }
       // this.lvl[this.lvl.length]=this.completed;
      //  this.stepper.next();
      //  this.stepper.next();
        console.log("the Complleted valus is "+this.completed)

        console.log(this.lvl + " LVL OBJ")
        console.log(this.stat + " Stat OBJ")



      }
    )


    this.lvl = []
  }



}
