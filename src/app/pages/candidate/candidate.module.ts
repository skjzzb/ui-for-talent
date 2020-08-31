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
import { CandidateRoutingModule, routedComponents } from './candidate-routing.module';
import { CandidateComponent } from './candidate.component';
import { ListOfCandidateComponent } from './list-of-candidate/list-of-candidate.component';
import { InterviewComponent } from './interview/interview.component';
import { ListOfInterviewComponent } from './list-of-interview/list-of-interview.component';
import { ReScheduleInterviewComponent } from './ReScheduleInterview/re-schedule-interview.component';
import { EvaluationReportComponent } from './evaluation-report/evaluation-report';
import { PanelComponent } from './evaluation-report/component/panel/panel-component';
import { ListOfConfirmedInterviewComponent } from './list-of-confirmed-interview/list-of-confirmed-interview.component';
import { ReportComponent } from './evaluation-report/component/reports/reports-component';
import { ResumeComponent } from './evaluation-report/component/resume/resume.component';


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
    CandidateRoutingModule,
    Ng2SmartTableModule,
    // AddVacancyComponent
  ],
  declarations: [
    // ...routedComponents,
    CandidateComponent,
    ListOfCandidateComponent,
    InterviewComponent,
    ListOfInterviewComponent,
    ReScheduleInterviewComponent,
    EvaluationReportComponent,
    PanelComponent,
    ListOfConfirmedInterviewComponent,
    ReportComponent,
    ResumeComponent
  ]
})
export class CandidateModule { }
