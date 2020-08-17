import { Component, OnInit ,ViewChild} from '@angular/core';
import { DataService } from '../../@core/utils/data.service';

@Component({
  selector: 'ngx-ecommerce',
  templateUrl: './e-commerce.component.html',
  styleUrls: ['e-commerce.component.scss'],
})
export class ECommerceComponent {
  logindetails : any
  currentRole:String
  users: { name: string, title: string ,expanded: boolean }[] = [
    { name: 'Carla Espinosa', title: 'Nurse' ,expanded:false},
    { name: 'Bob Kelso', title: 'Doctor of Medicine',expanded:false },
    { name: 'Janitor', title: 'Janitor',expanded:false },
    { name: 'Perry Cox', title: 'Doctor of Medicine' ,expanded:false},
    { name: 'Ben Sullivan', title: 'Carpenter and photographer' ,expanded:false},
  ];
  @ViewChild('item', { static: true }) accordion;
  linearMode = true;
 

  toggleLinearMode() {
    this.linearMode = !this.linearMode;
  }
  interviewData: any;
  confirmedScheduledInterview:any[] = []
constructor(private service : DataService)
{}
ngOnInit(): void {
  this.logindetails =  JSON.parse(sessionStorage.getItem('user_info'))
  console.log(this.logindetails.roles)
  this.currentRole=this.logindetails.roles[0];
    // if(this.logindetails.roles[0]=='ROLE_USER')
    // {
    //   this.currentRole='ROLE_USER'

    // }else if(this.logindetails.roles[0]=='ROLE_PANEL')
    // {
    //   this.currentRole='ROLE_PANEL'

    // }else if(this.logindetails.roles[0]=='ROLE_HR')
    // {
    //   this.currentRole='ROLE_HR'

    // }else if(this.logindetails.roles[0]=='ROLE_ADMIN')
    // {
    //   this.currentRole='ROLE_ADMIN'

    // }
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

        this.confirmedScheduledInterview.push(source)

      })
      console.log(this.confirmedScheduledInterview)
    })

  
}
}