import { AuthService } from './../_services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NbAuthService } from '@nebular/auth';

import { tap } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate() {
    if(!this.authService.isLogin())
    {
      this.router.navigate(['auth/login']);
    }
    return this.authService.isLogin();
    
    // return this.authService.isLogin()
    //   .pipe(
    //     tap(authenticated => {
    //       if (!authenticated) {
    //         this.router.navigate(['auth/login']);
    //         console.log('Not authenticated')
    //       }
    //       console.log(' authenticated')
    //     }),
    //   );
  }
}