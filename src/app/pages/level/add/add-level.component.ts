import {  Component,ViewEncapsulation} from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { DataService } from '../../../@core/utils/data.service';
import { error } from 'console';
import { NbWindowService } from '@nebular/theme';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

@Component({
  selector: 'nb-level',
  styleUrls: ['./add-level.component.scss'],
  templateUrl: './add-level.component.html',
  encapsulation: ViewEncapsulation.None
})
export class AddLevelComponent {
level:string;

constructor(private service: DataService) {
  }
  ngOnInit(): void {}

  addLevel(dataFromUI:any)
  {
   let level=dataFromUI.form.value;
   console.log(level);
   this.service.addLevelData(level)
    .subscribe(
      response => {
         console.log(response)
      }
    )
  }
}
  //export {AddLevelComponent}

