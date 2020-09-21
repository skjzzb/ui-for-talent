import { Component, OnInit, EventEmitter, Output, Input, ElementRef, ContentChildren } from '@angular/core';
import { DataService } from '../../../@core/utils/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PanelComponent } from './component/panel/panel-component';
import { stringify } from 'querystring';
import { NbComponentStatus, NbDialogService } from '@nebular/theme';
import { ReportComponent } from './component/reports/reports-component';
import { NbToastrService } from '@nebular/theme';


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
  report:any;
  flag : boolean;

  constructor( private service:DataService,
               private route :ActivatedRoute,
               private dialogService: NbDialogService,
               private toastrService: NbToastrService
              )
  {
    this.ratings = [];
    this.interview_level = "";
    this.flag = true;
    this.evaluation = {
      "averageRating": "string",
      "candidateId": 0,
      "feedback": "string",
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
       let int_lvl = this.candidate.interviewStatus;
       int_lvl = int_lvl.toLowerCase().replace(/selected/gi,'').replace(/scheduled/gi,'')
                                         .replace('rejected ','').replace(/\s/g,'');
      this.interview_level = int_lvl.charAt(0).toUpperCase() + int_lvl.slice(1);
      int_lvl = this.interview_level.toLowerCase();
      this.flag = int_lvl.includes("hr")  ? false : true;
      if(!this.flag)
        this.technologies = ["Soft Skill"]
       console.log(this.interview_level + " " + this.flag);
    })

    this.service.getQuestionsForHr()
    .subscribe( result =>
      {
        console.log(result);
      })
  }

  getResume()
  {

  }

  getEvaluation()
  {
      this.dialogService.open(ReportComponent, {context: {
        id : this.candidate.id,
      }}
      );
  }

  getObject($event:any)
  {
    this.questions = $event;
  }

  showToast(duration,status: NbComponentStatus) {
    let index = 0;
    this.toastrService.success(status,
      'Evaluation submited successfully!!',
      { duration });
  }

  onSubmit(UIform,status)
  {
    //cadidate data part
    this.evaluation.interviewLevel = this.interview_level.concat(" ",status);
    this.evaluation.candidateId = this.candidate.id;
    this.candidate.interviewStatus = this.interview_level.concat(" ",status);

    //evaluation part
    this.getRatings;
    this.evaluation.feedback = UIform.form.value.evaluation;
    console.log(this.ratings);

    // var myJSON = JSON.stringify(this.ratings).replace(/"/g, '\'');
    // console.log(myJSON);

    this.evaluation.question = JSON.stringify(this.ratings);
    let avg = this.sum.reduce((a, b) => a + b) / this.sum.length;
    this.evaluation.averageRating = avg.toFixed(2);

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
        this.service.updateCandidate(this.candidate,this.candidate.vacancy.vacancyId).then(
          result=>{
            console.log(result);
            this.showToast(2000,'success');
            this.refreshForm(UIform);
          }
        )
      }
    );
  }
  refreshForm(dataFromUI)
  {
    dataFromUI.reset();
    this.ratings = null;
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
