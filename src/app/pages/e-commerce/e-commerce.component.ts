import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-ecommerce',
  templateUrl: './e-commerce.component.html',
})
export class ECommerceComponent {
  logindetails : any
  currentRole:String
constructor()
{}
ngOnInit(): void {
  this.logindetails =  JSON.parse(sessionStorage.getItem('user_info'))
  console.log(this.logindetails.roles)

    if(this.logindetails.roles[0]=='ROLE_USER')
    {
      this.currentRole='ROLE_USER'

    }else if(this.logindetails.roles[0]=='ROLE_PANEL')
    {
      this.currentRole='ROLE_PANEL'

    }else if(this.logindetails.roles[0]=='ROLE_HR')
    {
      this.currentRole='ROLE_HR'

    }else if(this.logindetails.roles[0]=='ROLE_ADMIN')
    {
      this.currentRole='ROLE_ADMIN'

    }

  
}
}