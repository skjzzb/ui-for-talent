import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbTreeGridModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { RouterModule } from '@angular/router';
import { MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
} from '@nebular/theme';



import { ThemeModule } from '../../@theme/theme.module';


import { UsersListComponent } from './userslist/users-list.component';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';

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
    NbUserModule,
    RouterModule,
    NbTreeGridModule,
    ThemeModule,
    ReactiveFormsModule,
    MultiSelectModule,
    FormsModule,
    UsersRoutingModule,
    Ng2SmartTableModule,

  ],
  declarations: [
    UsersComponent, 
    UsersListComponent
  ]
})
export class UsersModule { }
 