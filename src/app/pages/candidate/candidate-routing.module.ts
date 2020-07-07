import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CandidateComponent } from './candidate.component';
import { ListOfCandidateComponent } from './list-of-candidate/list-of-candidate.component';


const routes: Routes = [{
  path: '',
  component: CandidateComponent,
  children: [
     {
       path: 'list-of-candidate',
       component: ListOfCandidateComponent,
     },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CandidateRoutingModule { }

export const routedComponents = [
    ListOfCandidateComponent
];
