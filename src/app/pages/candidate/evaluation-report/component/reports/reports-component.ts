import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { DataService } from '../../../../../@core/utils/data.service';

@Component({
  selector: 'ngx-report',
  templateUrl: './reports-component.html',
  styleUrls: ['./reports-component.scss']
})
export class ReportComponent implements OnInit {

  id:any;
  report: any;
  selectedLevel:any;
  questions:any;
  selectedReport:any;
  status:any;
  isReportPresent:boolean = true;

  constructor(protected dialogRef: NbDialogRef<any>,private service:DataService) {

    this.status = " ";
    this.selectedReport = {
      "id": 0,
      "question": " ",
      "averageRating": " ",
      "interviewLevel": " ",
      "candidateId": 0,
      "feedback": " "
    }
  }

  ngOnInit(): void {
    console.log("repo"+this.id);
    this.service.getEvaluationBycandidateId(this.id).subscribe
    ( result=>
      {
        // document.getElementById("btn").click();
        console.log(result);
        this.report = result;
        // this.selectedLevel = this.report.interviewLevel;

      })
  }

  onSelectLevel()
  {
    console.log(this.selectedLevel);
    var i: any;
    var report:any;
     for (i in this.report)
     {
      //  console.log(JSON.parse(this.report[i]));
       console.log(this.report[i])
       console.log(this.report[i].id)
       if(this.report[i].id == this.selectedLevel)
       {
         console.log(this.report[i])
         report = this.report[i];
       }
     }
    console.log(report);
    this.selectedReport = report;

    //status
    var str = this.selectedReport.interviewLevel.toUpperCase();
    var index = 0 ;
    if(str.includes('SELECTED'))
         index = str.indexOf("SELECTED");
    else
         index = str.indexOf("REJECTED");
    this.status = str.slice(index);
    console.log(this.selectedReport);

    //questions
    var keypoints = JSON.parse(report.question);
    console.log(keypoints);
    const objectArray = Object.entries(keypoints);
    this.questions = objectArray
              .map(([key, value]) => {
                  return {"question" : key ,"ratings": value};
                })


    console.log(this.questions);
  }

  close()
  {
    this.dialogRef.close();
  }


}
