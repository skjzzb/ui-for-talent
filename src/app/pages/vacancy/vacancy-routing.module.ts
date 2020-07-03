import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddVacancyComponent } from './new/add-vacancy.component';
import { VacancyComponent } from './vacancy.component';
import { ListOfVacancyComponent } from './list-of-vacancy/list-of-vacancy.component';
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
     {
       path: 'list-of-vacancy',
       component: ListOfVacancyComponent,
     },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VacancyRoutingModule { }

export const routedComponents = [
    AddVacancyComponent,
    ListOfVacancyComponent
];
