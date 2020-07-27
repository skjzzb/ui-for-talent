import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadresumeComponent } from './uploadresume.component';
import { UploadMultipleResumeComponent } from './upload-multiple-resume/upload-multiple-resume.component';

const routes: Routes = [{
  path: '',
  component: UploadresumeComponent,
  children: [
    {
      path: 'upload-resume',
      component: UploadMultipleResumeComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UploadResumeRoutingModule { }

export const routedComponents = [
  UploadMultipleResumeComponent
];
