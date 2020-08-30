import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CvComponent } from './cv.component';
import { ListOfCv } from './list-of-cv/list-of-cv.component';


const routes: Routes = [{
  path: '',
  component: CvComponent,
  children: [
     {
       path: 'list-of-cv',
       component: ListOfCv,
     },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CvRoutingModule { }

export const routedComponents = [
  ListOfCv
   
];
