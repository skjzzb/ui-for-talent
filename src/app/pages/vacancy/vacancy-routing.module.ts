import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddVacancyComponent } from './new/add-vacancy.component';
import { VacancyComponent } from './vacancy.component';
// import { SmartTableComponent } from './smart-table/smart-table.component';
// import { TreeGridComponent } from './tree-grid/tree-grid.component';

const routes: Routes = [{
  path: '',
  component: VacancyComponent,
  children: [
    {
      path: 'add-vacancy',
      component: AddVacancyComponent,
    },
    // {
    //   path: 'tree-grid',
    //   component: TreeGridComponent,
    // },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VacancyRoutingModule { }

export const routedComponents = [
    AddVacancyComponent
];
