import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddLevelComponent } from "./add/add-level.component";
import { LevelComponent } from "./level.component";

const routes: Routes = [{
  path: '',
  component: LevelComponent,
  children: [
    {
      path: 'add-level',
      component: AddLevelComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LevelRoutingModule { }

export const routedComponents = [
  AddLevelComponent
];
