import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditProfileComponent } from "./Edit/edit-profile.component";
import { Profile2Component } from "./profile2.component";

const routes: Routes = [{
  path: '',
  component: Profile2Component,
  children: [
    {
      path: 'edit-profile',
      component: EditProfileComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Profile2RoutingModule { }

export const routedComponents = [
  EditProfileComponent
];
