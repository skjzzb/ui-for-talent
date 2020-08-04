import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbTreeGridModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { RouterModule } from '@angular/router';
import { MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
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


import { UploadMultipleResumeComponent } from './upload-multiple-resume/upload-multiple-resume.component';
import { UploadResumeRoutingModule } from './uploadresume-routing.module';
import { UploadresumeComponent } from './uploadresume.component';

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
    MultiSelectModule,
    FormsModule,
    UploadResumeRoutingModule,
    Ng2SmartTableModule,

  ],
  declarations: [
    UploadMultipleResumeComponent,
    UploadresumeComponent
  ]
})
export class UploadResumeModule { }
 