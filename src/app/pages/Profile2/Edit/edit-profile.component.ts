import {  Component,ViewEncapsulation} from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { DataService } from '../../../@core/utils/data.service';
import { error } from 'console';
import { NbWindowService } from '@nebular/theme';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'nb-edit-profile',
  styleUrls: ['./edit-profile.component.scss'],
  templateUrl: './edit-profile.component.html',
  encapsulation: ViewEncapsulation.None
})
class EditProfileComponent {
  
  url : any
  logindetails : any
  userdetails = {
    "id": 0,
    "username": "",
    "name": "",
    "password": "",
    "roles": [
        {
            "id": 0,
            "name": ""
        }
    ],
    "profile": {
        "profId": 0,
        "address": "",
        "city": "",
        "state": "",
        "country": "",
        "pinCode": "",
        "aboutMe": "",
        "contactNo": "",
        "profilePicture": null
    }
}
guserdetails = {
  "id": 0,
  "username": "",
  "name": "",
  "roles": [
      {
          "id": 0,
          "name": ""
      }
  ],
  "profile": {
      "profId": 0,
      "address": "",
      "city": "",
      "state": "",
      "country": "",
      "pinCode": "",
      "aboutMe": "",
      "contactNo": "",
      "profilePicture": null
  }
}  
info : any
info1 : any
email: any;
  
  constructor( private dataService : DataService, private windowService: NbWindowService, private dialog : MatDialog) { 
    
    }


  ngOnInit(): void {
   
    this.logindetails =  JSON.parse(sessionStorage.getItem('user_info'))
    if(localStorage.getItem('auth_app_token'))
    {
      this.email=localStorage.getItem('email');
      let reData=this.dataService.getGUserDetails(this.email)
      if(this.dataService.getGUserDetails(this.email))
      {
        this.dataService.getGUserDetails(this.email).subscribe(data =>{
          this.info1=data;
      if( this.info1.profile != null)
      {
        this.guserdetails.id = this.info1.id
        this.guserdetails.username = this.info1.username
        this.guserdetails.name = this.info1.name
        this.guserdetails.roles = this.info1.roles
       // this.userdetails.password = this.info1.password
        this.guserdetails.profile = this.info1.profile
      }

        })
      }
      else{
        


      }


    }
   // console.log(this.logindetails)
   
   
    let obResult = this.dataService.getUserDetails(this.logindetails.id)
    obResult.subscribe(data   =>{
      this.info =  data ;
      if( this.info.profile != null)
      {
        this.userdetails.id = this.info.id
        this.userdetails.username = this.info.username
        this.userdetails.name = this.info.name
        this.userdetails.roles = this.info.roles
        this.userdetails.password = this.info.password
        this.userdetails.profile = this.info.profile
      }
    })
    
  }

  onUpdate(){
    let obResult = this.dataService.addOrEditProfile(this.userdetails.profile,this.logindetails.id)
    obResult.subscribe(data=>{
      console.log(data)
    //  window.location.reload()
    })
    //this.windowService.open(EditProfileComponent);
    this.dialog.closeAll()
    this.dialog.open(EditProfileComponent)
  }
  gonUpdate(){
    let obResult = this.dataService.addOrEditProfile(this.userdetails.profile,this.logindetails.id)
    obResult.subscribe(data=>{
      console.log(data)
    //  window.location.reload()
    })
    //this.windowService.open(EditProfileComponent);
    this.dialog.closeAll()
    this.dialog.open(EditProfileComponent)
  }
  logintype()
  {
    if(localStorage.getItem('auth_app_token'))
    {
      return true;
    }
    else
    {
      return false;
    }
  }
  
  }
  export {EditProfileComponent}