import { DataService } from './../../../@core/utils/data.service';
import { AuthService } from './../../../_services/auth.service';
//
import { NbAuthService, NbAuthOAuth2Token ,NbTokenLocalStorage, NbTokenStorage,NbAuthTokenParceler} from '@nebular/auth';
import { HttpClient } from '@angular/common/http';
import {  NbAuthResult } from '@nebular/auth';


//
import { LogoutComponent } from './../../../logout/logout.component';
import { TokenStorageService } from './../../../_services/token-storage.service';
import { Component, OnDestroy, OnInit, Inject } from "@angular/core";
import { NB_WINDOW, NbWindowService,  } from '@nebular/theme';
import { filter } from 'rxjs/operators';
import {
  NbMediaBreakpointsService,
  NbMenuService,
  NbSidebarService,
  NbThemeService,
} from "@nebular/theme";

import { UserData } from "../../../@core/data/users";
import { LayoutService } from "../../../@core/utils";
import { map, takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { ProfileComponent } from "../../../profile/profile.component";
import { EditProfileComponent } from '../../../pages/Profile2/Edit/edit-profile.component';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: "ngx-header",
  styleUrls: ["./header.component.scss"],
  templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;
//add
acesstoken: any;
atoken: any;
role: String;

tookn: String;
tokn: String[];

token: NbAuthOAuth2Token;
item=[];
//end
  items = [
    { title: 'Profile' },
    { title: 'Logout' },
  ];

  themes = [
    {
      value: "default",
      name: "Light",
    },
    {
      value: "dark",
      name: "Dark",
    },
    {
      value: "cosmic",
      name: "Cosmic",
    },
    {
      value: "corporate",
      name: "Corporate",
    }
  ];

  currentTheme = "default";
  email:String;
  uname:String;
  nam:String;
  photo:String;
  userMenu = [{ title: "Profile" }, { title: "Log out" }];
  googleurl ="https://www.googleapis.com/oauth2/v2/userinfo?access_token=";
  key ='auth_app_token';
  constructor(
    private parceler: NbAuthTokenParceler,
    private gauthService: AuthService,
    private dataService : DataService,
    private authService: NbAuthService,
    private http: HttpClient,
    private tokenStorageService: TokenStorageService,
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private userService: UserData,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private dialog: MatDialog,
    private nbMenuService: NbMenuService, 
    private windowService: NbWindowService,
    @Inject(NB_WINDOW) private window
  ) {}
   user1 ={
    'username':"",
    'name':""
  }
 
  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;
//Start
    this.acesstoken =  JSON.parse(localStorage.getItem(this.key));
    //console.log(this.acesstoken.value);
    //console.log(this.acesstoken);
    if(localStorage.getItem(this.key))
    {
     this.atoken=this.acesstoken.value;
    this.acesstoken=(this.atoken.toString());
  
    this.tookn=this.atoken.toString();
    this.tokn=this.tookn.split(":");
    this.tokn=this.tokn[1].split('"')
  
    //var tempArray: DataResponse[] = [];
    
     // console.log(this.tokenStorageService.getUser)
    this.googleurl=this.googleurl+this.tokn[1]
    console.log(this.googleurl);
  
   // console.log(this.http.get('https://www.googleapis.com/oauth2/v1/userinfo?alt=json'))
//    this.http.get(this.googleurl, {observe: 'response'}).pipe(
//     map(this.extractData),
//     catchError(this.handleError)
//   );
// }
    this.http.get(this.googleurl).toPromise().then(data=>{
      console.log(data);

      for (let key in data) {
        if (data.hasOwnProperty(key))
        {
           this.item.push(data[key]);   
        }
        else{
          this.lgout();

        }  
        }
      console.log(this.item[0])
      console.log(this.item[1])
      console.log(this.item[2])
    
        localStorage.setItem('email', this.item[1]);
        localStorage.setItem('name', this.item[3]);
        localStorage.setItem('profile', this.item[6]);

       this.uname=localStorage.getItem('email');
  this.nam=localStorage.getItem('name');

  this.photo=localStorage.getItem('profile');
      

      }
    );
  
    this.email=localStorage.getItem('email');
    this.nam=localStorage.getItem('name');
    console.log(this.email);
    console.log(this.nam);
  
this.dataService.getGUserDetails(this.email).toPromise().then(data=>{
   console.log(data)
});

//console.log(this.dataService.getGUserDetails(this.email))
if(!this.dataService.getGUserDetails(this.email).toPromise().then(data=>{ return data;}))
{
  console.log(this.user1.name.toString()+''+this.user1.username.toString());
  
  
    this.gauthService.gregister(this.email,this.nam).subscribe(
      data => {
        console.log(data);
        // this.isSuccessful = true;
        // this.isSignUpFailed = false;
      },
      err => {
        // this.errorMessage = err.error.message;
        // this.isSignUpFailed = true;
      }
    );
    }   
    else
    {

      console.log('Else is Running')
    }
    }
    ///End
    this.user =  JSON.parse(sessionStorage.getItem('user_info'))
    if(!localStorage.getItem(this.key))
    { this.role=this.user.roles[0];
   
    }
    // this.userService
    //   .getUsers()
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((users: any) => (this.user = users.nick));

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService
      .onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (isLessThanXl: boolean) => (this.userPictureOnly = isLessThanXl)
      );

    this.themeService
      .onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$)
      )
      .subscribe((themeName) => (this.currentTheme = themeName));

      this.nbMenuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'my-context-menu'),
        map(({ item: { title } }) => title),
      )
      .subscribe((title ) => 
      {
        if(title === 'Profile')
        {
        this.dialog.open(EditProfileComponent)
       // this.windowService.open(EditProfileComponent);
      }
        else{
          if(localStorage.getItem(this.key))
          {
             this.lgout();
             Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Google Logout',
              showConfirmButton: false,
              
              timer: 3500,  
          });
          }
          else
          {
             this.logout();
             Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Logout Sucess',
              showConfirmButton: false,
              timer: 3500,
              
            })

          }
        }   
      });
  
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }
  logintype()
  {
    if(localStorage.getItem(this.key))
    {
      return true;
    }
    else
    {
      return false;
    }
  }
  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, "menu-sidebar");
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  logout() {
    this.tokenStorageService.signOut();
    window.sessionStorage.clear();
    window.location.reload();
   // setTimeout(function(){window.location.reload(); }, 3000);

    



  }
  lgout() {
    this.authService.logout('google')
      .pipe(takeUntil(this.destroy$))
      .subscribe((authResult: NbAuthResult) => {
      });
      window.localStorage.clear();

      window.location.reload();

  }
}