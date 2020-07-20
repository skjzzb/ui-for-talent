import { Component, OnInit, Input } from '@angular/core';
import { ViewCell, DefaultEditor } from 'ng2-smart-table'
import { DataService } from '../@core/utils/data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit  {

  constructor(private dataService : DataService, private router:Router , private dialog : MatDialog) {
  }

  userId : any
  roleList : any
  radioGroupValue : any

  roleObj = {
    "id" : 0,
    "name" : ""
  }
 name : any
 existingRole : any
  user : any

  ngOnInit() {
    this.userId = JSON.parse(sessionStorage.getItem('userId_from_userlist'))

    let obResult = this.dataService.getListOfAllRoles()
    obResult.subscribe((data)=>{
      this.roleList = data
    })
    
  }

  onSelectRole(){
    this.roleObj.id = this.radioGroupValue
    if(this.radioGroupValue == "1")
     {
       this.roleObj.name = 'ROLE_USER'
     }
     if(this.radioGroupValue == "2")
     {
      this.roleObj.name = 'ROLE_MODERATOR'
     }
     if (this.radioGroupValue == "3")
     {
      this.roleObj.name = 'ROLE_ADMIN'
     }
     if (this.radioGroupValue == "4")
     {
      this.roleObj.name = 'ROLE_HR'
     }
     if (this.radioGroupValue == "5")
     {
      this.roleObj.name = 'ROLE_PANEL'
     }
     console.log(this.roleObj)

     let obResult = this.dataService.setRole(this.userId, this.roleObj)
     obResult.subscribe((data)=>{
       console.log(data)
       alert(`${this.roleObj.name} is set successfully..`)
       window.location.reload()
     })
     this.dialog.closeAll()
   
    // this.router.navigate(['/pages/users']);
  }
}
