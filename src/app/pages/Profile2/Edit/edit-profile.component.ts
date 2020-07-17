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
  
info : any
  
  constructor( private dataService : DataService, private windowService: NbWindowService, private dialog : MatDialog) { 
    
    }


  ngOnInit(): void {
   
    this.logindetails =  JSON.parse(sessionStorage.getItem('user_info'))
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
  
  }
  export {EditProfileComponent}