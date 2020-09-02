import { NgModule } from '@angular/core';
import { NbMenuModule, NbWindowModule, NbListModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { VacancyModule } from './vacancy/vacancy.module';
import { CandidateModule } from './candidate/candidate.module';
import { UploadResumeModule } from './uploadResume/uploadresume.module';
import { LevelModule } from './level/level.module'

import { Profile2Module } from './Profile2/profile2.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { from } from 'rxjs';
import { UsersModule } from './users/users.module';
import { CvModule } from './cv/cv.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    NbListModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    VacancyModule,
    LevelModule,
    CandidateModule,
    UploadResumeModule,
    Profile2Module,
    UsersModule,
    CvModule,
    NbWindowModule
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
