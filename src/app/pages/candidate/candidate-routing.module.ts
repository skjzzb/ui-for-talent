import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CandidateComponent } from './candidate.component';
import { ListOfCandidateComponent } from './list-of-candidate/list-of-candidate.component';
import { InterviewComponent } from './interview/interview.component';
import { ListOfInterviewComponent } from './list-of-interview/list-of-interview.component';
import { ReScheduleInterviewComponent } from './ReScheduleInterview/re-schedule-interview.component';
import { EvaluationReportComponent } from './evaluation-report/evaluation-report';
import { ListOfConfirmedInterviewComponent } from './list-of-confirmed-interview/list-of-confirmed-interview.component';


const routes: Routes = [{
  path: '',
  component: CandidateComponent,
  children: [
     {
       path: 'list-of-candidate',
       component: ListOfCandidateComponent,
     },
     {
      path: 'interview',
      component: InterviewComponent,
    },
    {
      path: 'list-of-interview',
      component: ListOfInterviewComponent,
    },
    {
      path: 're-schedule-interview',
      component: ReScheduleInterviewComponent,
      
    },
    {
      path: 'evaluation-report/:rowData',
      component: EvaluationReportComponent,
    },
    {
      path : 'list-of-confirmed-interview',
      component : ListOfConfirmedInterviewComponent
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CandidateRoutingModule { }

export const routedComponents = [
    ListOfCandidateComponent,
    InterviewComponent,
    ListOfInterviewComponent,
    ReScheduleInterviewComponent,
    EvaluationReportComponent,
    ListOfConfirmedInterviewComponent
];
