import {  Component,ViewEncapsulation,OnInit,TemplateRef} from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { DataService } from '../../../@core/utils/data.service';
import { error } from 'console';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NbWindowService, NbDialogService } from '@nebular/theme';

@Component({
  selector: 'nb-level',
  styleUrls: ['./add-level.component.scss'],
  templateUrl: './add-level.component.html',
  encapsulation: ViewEncapsulation.None
})
export class AddLevelComponent  {
level:string;
levelData:any;
renderValue:String;
id:any;


constructor(private service: DataService) {
  }


  addLevel(dataFromUI:any)
  {
   let level=dataFromUI.form.value;
   console.log(level);
   this.service.addLevelData(level)
    .subscribe(
      (response:any) => {
        this.level=response;
         console.log(response);
         dataFromUI.form.reset();
      }
    )
  }

  
}

  //export {AddLevelComponent}

