import {  Component,ViewEncapsulation} from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { DataService } from '../../../@core/utils/data.service';
import { error } from 'console';


@Component({
  selector: 'nb-edit-profile',
  styleUrls: ['./edit-profile.component.scss'],
  templateUrl: './edit-profile.component.html',
  encapsulation: ViewEncapsulation.None
})
class EditProfileComponent {
  
  url : any
  logindetails : any
  userdetails : any

  constructor( private dataService : DataService) {   }


  ngOnInit(): void {
    this.logindetails =  JSON.parse(sessionStorage.getItem('user_info'))
    console.log(this.logindetails)
   
   
    let obResult = this.dataService.getUserDetails(this.logindetails.id)
    obResult.subscribe(data =>{
     // console.log(data)
      this.userdetails = data;
      console.log(this.userdetails)
    })
    
  }
 
  onUpdate(){
    let obResult = this.dataService.addOrEditProfile(this.userdetails.profile,this.logindetails.id)
    obResult.subscribe(data=>{
      window.location.reload()
    })

  }
  
  }

  
  export {EditProfileComponent}