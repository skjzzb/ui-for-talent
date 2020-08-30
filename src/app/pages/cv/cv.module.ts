import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbTreeGridModule,NbTreeGridRowToggleComponent } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';

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
  NbAccordionModule,

} from '@nebular/theme';


import { ThemeModule } from '../../@theme/theme.module';
import { CvRoutingModule } from './cv-routing.module';
import { ListOfCv } from './list-of-cv/list-of-cv.component';
import { CvComponent } from './cv.component';


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
    NbTreeGridModule,
    NbUserModule,
    RouterModule,
    NbTreeGridModule,
    NbAccordionModule,
    MultiSelectModule,
    ThemeModule,
    ReactiveFormsModule,
    FormsModule,
    // VacancyComponent,
    CvRoutingModule,
    Ng2SmartTableModule,
    // AddVacancyComponent
  ],
  declarations: [
    // ...routedComponents,
    CvComponent,
    ListOfCv
  ]
})
export class CvModule { }
