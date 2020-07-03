
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'



import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { VacancyModule } from './pages/vacancy/vacancy.module'
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './services/auth-guard.service';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from "@nebular/theme";
// material
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatRadioModule } from "@angular/material/radio";
import { ProfileComponent } from "./profile/profile.component";
 import { RouterModule } from '@angular/router';
import { MatIconModule } from "@angular/material/icon";
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [AppComponent, ProfileComponent, LoginComponent, RegisterComponent, LogoutComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    //material
    MatDialogModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatMenuModule,
    MatRadioModule,
    MatIconModule,
    VacancyModule,
    FormsModule,
    ReactiveFormsModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: "AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY",
    }),
    
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    // RouterModule.forRoot([
    // {path:"profile",component :ProfileComponent},
    // ])
  ],
  providers: [
    // ...
    AuthGuard,authInterceptorProviders
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
