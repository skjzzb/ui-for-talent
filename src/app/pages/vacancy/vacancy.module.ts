import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbTreeGridModule, NbDialogModule } from '@nebular/theme';
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
  NbPopoverModule,
} from '@nebular/theme';

import { AddVacancyComponent } from './new/add-vacancy.component';
import { ThemeModule } from '../../@theme/theme.module';
import { VacancyRoutingModule, routedComponents } from './vacancy-routing.module';
import { VacancyComponent } from './vacancy.component';
import { ListOfVacancyComponent } from './list-of-vacancy/list-of-vacancy.component';
import { NgxPopoverCardComponent } from '../modal-overlays/popovers/popover-examples.component';

@NgModule({
  imports: [
    //NbDialogModule.forChild(),
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
    VacancyRoutingModule,
    Ng2SmartTableModule,
    NbPopoverModule,
    //AddVacancyComponent
  ],
  declarations: [
    // ...routedComponents,
    VacancyComponent,
    AddVacancyComponent,
    ListOfVacancyComponent,
  ],
})
export class VacancyModule { }
