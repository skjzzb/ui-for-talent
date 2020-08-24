import { Component, OnInit, EventEmitter, Output, Input, ElementRef, ContentChildren } from '@angular/core';
import { DataService } from '../../../@core/utils/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
  selector: 'ngx-evaluation-report',
  templateUrl: './evaluation-report.html',
  styleUrls: ['./evaluation-report.scss']
})
export class EvaluationReportComponent implements OnInit {
  candidate: any;
  vacancy : any;
  technologies : any[];
  concepts: Observable<any>;
  questions: any;
  groups:any;

  constructor(private service:DataService,
              private router: Router,
              private route :ActivatedRoute,
              private elementRef:ElementRef){
              }

  ngOnInit(): void {
    this.candidate = JSON.parse(this.route.snapshot.params["rowData"]);
    this.vacancy = this.candidate.vacancy;
    console.log(this.candidate);

    var list = this.vacancy.jd.replace(/\s/g, '').split(",");
    console.log("list"+list);
    this.service.getTechnologyForPanel(list)
    .then(result=>
     {
       console.log(result.data)
       this.technologies = result.data;
       //  for( var i = 0 ; i<this.technologies.length;i++)
      //  {
      //    this.service.getConceptById(this.technologies[i]).then
      //    (result=>
      //      {
      //        console.log(result);
      //        this.concepts = result.data;
      //       this.questions =  this.concepts.map(element=>
      //         {
      //           console.log( element.question.split(","));
      //           return {"concept":element.concept,"question" :element.question.split(",")};
      //         })
      //         console.log(this.questions);
      //      })
      //   }
    })
  }

  getObject($event:any)
  {
    this.questions = $event;
  }
  onSubmit(UIform)
  {
    console.log(UIform.form.value);
    // console.log(this.ratings);
  }


}

@Component({
  selector: 'panel',
  template: `
  <div class="card card-info">
    <div class="card-header" (click)="toggle(title)">
      {{title}}
    </div>
      <div class="card-body" *ngIf="opened">
      <div class="row" *ngFor="let q of questions"  >
                <label class="label">{{q.concept}}</label>

        <div class="col-md-4" *ngFor="let que of q.question" >
                <label class="label">{{que}}</label>
              <input type="number"
                    [ngModel]="ratings[que]"
                     nbInput
                     name="que"
                    >
                  </div>
          </div>
    </div>
  <div>
  `
})
export class PanelComponent {
  @Input() opened = false;
  @Input() title: string;
  // @Output() toggle: EventEmitter<any> = new EventEmitter<any>();
  @Output() getObject = new EventEmitter<any>();

  concepts:any;
  questions:any;
  ratings:any;
  constructor(private service:DataService){
    this.ratings=[];
    }

  toggle(title)
  {
    this.opened = !this.opened;
    this.service.getConceptById(title).subscribe
    (result=>
      {
        console.log(result);
        this.concepts = result;
       this.questions =  this.concepts.map(element=>
         {
           console.log( element.question.split(","));
          return {"concept":element.concept,"question" :element.question.split(",")};
         })
         console.log(this.questions);
         this.getObject.emit(this.questions);
      })
    console.log(title)
  }
}

