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


import { AddLevelComponent } from './Add/add-level.component';
import { ThemeModule } from '../../@theme/theme.module';
import { LevelRoutingModule, routedComponents } from './level-routing.module';
import { LevelComponent } from './level.component';

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
    LevelRoutingModule,
    Ng2SmartTableModule,
  //  NbSidebarModule,
   // NbLayoutModule,
  //  LevelComponent,
   //AddLevelComponent
  ],
  declarations: [
    LevelComponent,
    AddLevelComponent
  ]
})
export class LevelModule { }
