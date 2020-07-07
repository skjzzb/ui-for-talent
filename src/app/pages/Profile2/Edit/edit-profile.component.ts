import {  Component,ViewEncapsulation} from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';


@Component({
  selector: 'nb-edit-profile',
  styleUrls: ['./edit-profile.component.scss'],
  templateUrl: './edit-profile.component.html',
  encapsulation: ViewEncapsulation.None
})
class EditProfileComponent {
  
  url : any
  userdetails : any

  constructor() {   }


  ngOnInit(): void {
    this.userdetails =  JSON.parse(sessionStorage.getItem('user_info'))
    console.log(this.userdetails)
  }
 
  }

  
  export {EditProfileComponent}