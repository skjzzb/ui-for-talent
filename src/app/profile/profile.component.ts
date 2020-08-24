import { Component, OnInit, Input } from '@angular/core';
import { ViewCell, DefaultEditor } from 'ng2-smart-table'
import { DataService } from '../@core/utils/data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

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
      console.log(this.roleList)
    })
    
  }

  onSelectRole(){
    console.log(this.radioGroupValue)
    this.roleObj.id = this.radioGroupValue
    this.roleList.forEach(element => {
      if(element.id == this.radioGroupValue)
         this.roleObj.name = element.name
    });
    console.log(this.roleObj)
    let obResult = this.dataService.setRole(this.userId, this.roleObj)
    obResult.subscribe((data)=>{
      this.dialog.closeAll()
      Swal.fire(
       `${this.roleObj.name} is set successfully!`,
       '',
       'success'
     )
      //window.location.reload()
    })
  }

  
}
