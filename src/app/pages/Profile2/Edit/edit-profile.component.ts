import {  Component,ViewEncapsulation} from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { DataService } from '../../../@core/utils/data.service';
import { error } from 'console';
import { NbWindowService } from '@nebular/theme';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';



@Component({
  selector: 'nb-edit-profile',
  styleUrls: ['./edit-profile.component.scss'],
  templateUrl: './edit-profile.component.html',
  encapsulation: ViewEncapsulation.None
})
class EditProfileComponent {
  
  url : any
  logindetails : any
  profile:String;
  glogindetails : any

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
      "profilePicture": ""
  }
}  
info : any
info1 : any
email: any;
  
  constructor( private dataService : DataService, private windowService: NbWindowService, private dialog : MatDialog,private sanitizer: DomSanitizer) { 
    
    }


  ngOnInit(): void {
    this.profile=localStorage.getItem('profile');
   
    this.logindetails =  JSON.parse(sessionStorage.getItem('user_info'))
    this.glogindetails=this.dataService.getGUserDetails(this.email);
  //  console.log(this.glogindetails);
    if(localStorage.getItem('auth_app_token'))
    {
      this.email=localStorage.getItem('email');
      let reData=this.dataService.getGUserDetails(this.email)
      if(this.dataService.getGUserDetails(this.email))
      {
        this.dataService.getGUserDetails(this.email).subscribe(data =>{
          this.info1=data;
          console.log(data);
          this.glogindetails.id = this.info1.id
        this.glogindetails.username = this.info1.username
        this.glogindetails.name = this.info1.name
      if( this.info1.profile != null)
      {
        this.guserdetails.id = this.info1.id
        this.guserdetails.username = this.info1.username
        this.guserdetails.name = this.info1.name
        this.guserdetails.roles = this.info1.roles
       // this.userdetails.password = this.info1.password
        this.guserdetails.profile = this.info1.profile
        this.guserdetails.profile.profilePicture=localStorage.getItem('profile');
      }
        })
      }
      else{
        


      }
    }
    if (this.logindetails != null)
    {
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
  }

  getProfilePhoto()
  {
    let profId=13
    this.dataService.getUserProfilePhoto(profId)
    .then(
      response => {
        //let TYPED_ARRAY = new Uint8Array(response.data);
        //const STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY);
        //let base64String = btoa(STRING_CHAR);
        //this.url = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + base64String);
        //let objectURL = 'data:image/png;base64,' + response.data;
        //this.url = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          this.url=response.data;
          //console.log(this.url)
      }
    )
  }

  onUpdate(){
    let obResult = this.dataService.addOrEditProfile(this.userdetails.profile,this.logindetails.id)
    obResult.subscribe(data=>{
      this.dialog.closeAll()
      this.dialog.open(EditProfileComponent)
    })
  }
  gonUpdate(){
    let obResult = this.dataService.gaddOrEditProfile(this.guserdetails.profile,this.glogindetails.id)
    obResult.subscribe(data=>{
      this.dialog.closeAll()
      this.dialog.open(EditProfileComponent)
    })
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