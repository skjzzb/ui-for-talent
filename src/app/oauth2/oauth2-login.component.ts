import { Router } from '@angular/router';
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, OnDestroy } from '@angular/core';
import { NbAuthOAuth2Token, NbAuthResult, NbAuthService } from '@nebular/auth';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'nb-playground-auth',
  styleUrls: ['./oauth2-login.component.css'],
  templateUrl: './oauth2-login.component.html',
  
})
export class OAuth2LoginComponent implements OnDestroy {

  token: NbAuthOAuth2Token;

  private destroy$ = new Subject<void>();

  constructor(private authService: NbAuthService,private router: Router) {
    this.authService.onTokenChange()
      .pipe(takeUntil(this.destroy$))
      .subscribe((token: NbAuthOAuth2Token) => {
        this.token = null;
        if (token && token.isValid()) {
          this.token = token;
        }
      });
      this.login();
  }

  login() {
    this.authService.authenticate('google')
      .pipe(takeUntil(this.destroy$))
      .subscribe((authResult: NbAuthResult) => {
        this.router.navigate(['/pages']);
      });
  }

  logout() {
    this.authService.logout('google')
      .pipe(takeUntil(this.destroy$))
      .subscribe((authResult: NbAuthResult) => {
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
