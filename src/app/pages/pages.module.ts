import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { VacancyModule } from './vacancy/vacancy.module'
import { CandidateModule } from './candidate/candidate.module'
import { Profile2Module } from './Profile2/profile2.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { from } from 'rxjs';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    VacancyModule,
    CandidateModule,
    Profile2Module
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
