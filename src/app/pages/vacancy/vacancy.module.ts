import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbTreeGridModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { RouterModule } from '@angular/router';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule, NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
} from '@nebular/theme';

import { AddVacancyComponent } from './new/add-vacancy.component';
import { ThemeModule } from '../../@theme/theme.module';
import { VacancyRoutingModule, routedComponents } from './vacancy-routing.module';
import { VacancyComponent } from './vacancy.component';

@NgModule({
  imports: [
    CommonModule,
    NbActionsModule,
    NbButtonModule,
    NbCardModule,
    NbCheckboxModule,
    NbDatepickerModule, NbIconModule,
    NbInputModule,
    NbRadioModule,
    NbSelectModule,
    NbUserModule,
    RouterModule,
    NbTreeGridModule,
    ThemeModule,
    // VacancyComponent,
    VacancyRoutingModule,
    Ng2SmartTableModule,
    // AddVacancyComponent
  ],
  declarations: [
    // ...routedComponents,
    VacancyComponent,
    AddVacancyComponent
  ],
})
export class VacancyModule { }
