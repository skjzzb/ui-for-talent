import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbTreeGridModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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

import { ThemeModule } from '../../@theme/theme.module';
import { CandidateRoutingModule, routedComponents } from './candidate-routing.module';
import { CandidateComponent } from './candidate.component';
import { ListOfCandidateComponent } from './list-of-candidate/list-of-candidate.component';

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
    ReactiveFormsModule,
    FormsModule,
    // VacancyComponent,
    CandidateRoutingModule,
    Ng2SmartTableModule,
    // AddVacancyComponent
  ],
  declarations: [
    // ...routedComponents,
    CandidateComponent,
    ListOfCandidateComponent
  ]
})
export class CandidateModule { }
