import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { DataService } from '../../../../@core/utils/data.service';

@Component({
  selector: 'panel',
  templateUrl: './panel-component.html',
  styleUrls: ['./panel-component.scss']
})
export class PanelComponent implements OnInit  {
  @Input() opened = false;
  @Input() title: string;
  // @Output() toggle: EventEmitter<any> = new EventEmitter<any>();
  @Output() getObject = new EventEmitter<any>();
  @Output() rating_out = new EventEmitter<any>();

  concepts:any;
  questions:any;
  ratings:any;

  constructor(private service:DataService){
    this.ratings=[];
    }

  ngOnInit(): void {
    console.log("welcome to panel!!");
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

  addRatings(data:any)
  {
    this.opened = !this.opened;
    console.log(data);
    this.ratings = data.form.value;
    this.rating_out.emit(this.ratings);
  }
}

