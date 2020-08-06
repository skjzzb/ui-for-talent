import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,private router: Router) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      if (this.isLoggedIn) {
        if(this.roles[0]=='ROLE_USER')
        this.router.navigate(['page']);
        else if(this.roles[0]=='ROLE_PANEL')
          {
            this.router.navigate(['pages']);
          }else if(this.roles[0]=='ROLE_HR')
          {
            this.router.navigate(['pages']);
          }else if(this.roles[0]=='ROLE_ADMIN')
          {
            this.router.navigate(['pages']);
          }
          else{
            this.router.navigate(['pages']);
          }
        //console.log('Not authenticated')
      }
    }
  }

  onSubmit() {
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        if (this.isLoggedIn) {
          if(this.roles[0]=='ROLE_USER')
          {
          this.router.navigate(['pages']);
          sessionStorage.setItem('user_info', JSON.stringify(data))
          }else if(this.roles[0]=='ROLE_PANEL')
          {
            this.router.navigate(['pages']);
          sessionStorage.setItem('user_info', JSON.stringify(data))
          }else if(this.roles[0]=='ROLE_HR')
          {
            this.router.navigate(['pages']);
          sessionStorage.setItem('user_info', JSON.stringify(data))
          }else if(this.roles[0]=='ROLE_ADMIN')
          {
            this.router.navigate(['pages']);
          sessionStorage.setItem('user_info', JSON.stringify(data))
          }
          else{
            this.router.navigate(['pages']);
          sessionStorage.setItem('user_info', JSON.stringify(data))
          }
        }
       // this.reloadPage();
      },
      err => {
        this.errorMessage = "The username or password enterd is incorrect";
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }
  logout() {
    this.tokenStorage.signOut();
    window.location.reload();
  }
}
