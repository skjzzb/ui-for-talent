import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CandidateComponent } from './candidate.component';
import { ListOfCandidateComponent } from './list-of-candidate/list-of-candidate.component';
import { InterviewComponent } from './interview/interview.component';
import { ListOfInterviewComponent } from './list-of-interview/list-of-interview.component';


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
    ListOfInterviewComponent
];
