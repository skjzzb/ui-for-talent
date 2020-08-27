import { Component, OnInit, EventEmitter, Output, Input, ElementRef, ContentChildren } from '@angular/core';
import { DataService } from '../../../@core/utils/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PanelComponent } from './component/panel-component';
import { stringify } from 'querystring';


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
  sum:any;
  ratings:any;
  evaluation : any;
  interview_level:String;


  constructor( private service:DataService,
               private route :ActivatedRoute,
              ){
                this.ratings = [];
                this.evaluation = {
                  "averageRating": "string",
                  "candidate": 0,
                  "id": 0,
                  "interviewLevel": "string",
                  "question": "string"
                }
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
       this.interview_level = this.candidate.interviewStatus;
       this.interview_level = this.interview_level.toLowerCase().replace(/selected/gi,'').replace(/scheduled/gi,'')
                                         .replace('rejected ','').replace(/\s/g,'');
       console.log(this.interview_level);
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
  onSubmit(UIform,status)
  {
    //cadidate data part
    this.evaluation.interviewLevel = this.interview_level.concat(" ",status);
    this.evaluation.candidate = this.candidate.id;
    this.candidate.interviewStatus = this.interview_level.concat(" ",status);

    //evaluation part
    this.getRatings;

    console.log(this.ratings);

    var myJSON = JSON.stringify(this.ratings).replace(/"/g, '\'');
    console.log(myJSON);

    this.evaluation.question = myJSON;
    this.evaluation.averageRating = this.sum.reduce((a, b) => a + b) / this.sum.length;


    // console.log("str-->"+myJSON)
    // myJSON = myJSON.replace(/\s/g, '_');
    // myJSON = myJSON.replace(/:/g, '_');
    // myJSON = myJSON.replace(/[^a-zA-Z0-9/_/]/g,'');
    // console.log("new-->"+myJSON)
    console.log(this.evaluation);

    this.service.createEvaluationReport(this.evaluation).subscribe(
      result=>
      {
        console.log(result);
        this.service.updateCandidate(this.candidate,this.candidate.id).then(
          result=>{
            console.log(result);
          }
        )
      }
    );
  }

  getRatings($event:any)
  {

    if(this.ratings.length != 0)
    {
      console.log("concanated")
      this.sum = this.sum.concat(Object.values($event));
      console.log(this.sum);
      this.ratings = Object.assign(this.ratings,$event);
    }
    else
    {
      console.log("generated");
      this.sum = Object.values($event);
      console.log(this.sum);
      this.ratings = $event
    }
    // this.ratings =  $event;
  }

}
