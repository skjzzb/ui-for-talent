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


import { EditProfileComponent } from './Edit/edit-profile.component';
import { ThemeModule } from '../../@theme/theme.module';
import { Profile2RoutingModule, routedComponents } from './profile2-routing.module';
import { Profile2Component } from './profile2.component';

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
    Profile2RoutingModule,
    Ng2SmartTableModule,

  ],
  declarations: [
    Profile2Component,
    EditProfileComponent
  ]
})
export class Profile2Module { }
