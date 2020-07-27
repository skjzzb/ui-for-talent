import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-popover-tabs',
  template: `
    <nb-tabset>
      <nb-tab tabTitle="What's up?">
        <div class="p-4">
          Such a wonderful day!
        </div>
      </nb-tab>
      <nb-tab tabTitle="Second Tab">
        <div class="p-4">
          Indeed!
        </div>
      </nb-tab>
    </nb-tabset>
  `,
})
export class NgxPopoverTabsComponent {
}

@Component({
  selector: 'ngx-popover-form',
  template: `
    <div class="p-4">
      <form>
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Recipients">
        </div>
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Subject">
        </div>
        <div class="form-group">
          <textarea class="form-control" placeholder="Message"></textarea>
        </div>
        <button type="submit" class="btn btn-primary w-100">Send</button>
      </form>
    </div>
  `,
})
export class NgxPopoverFormComponent implements OnInit {
  rowData : any

  constructor(){
   
  }
  ngOnInit(): void {
     console.log(this.rowData)
  }
}

@Component({
  selector: 'ngx-popover-card',
  template: `
    <nb-card class="popover-card">
      <nb-card-header status="warning">
       Short Summary
      </nb-card-header>
      <nb-card-body>
      {{renderValue}}
      </nb-card-body>
    </nb-card>
  `,
  styles: [`
    nb-card {
      margin: 0;
      max-width: 20rem;
    }
  `],
})
export class NgxPopoverCardComponent {
   renderValue: any;
  
constructor()
{
console.log(this.renderValue);
}


  }
