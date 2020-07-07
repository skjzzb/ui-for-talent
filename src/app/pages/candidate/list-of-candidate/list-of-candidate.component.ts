import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../@core/utils/data.service';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-list-of-candidate',
  templateUrl: './list-of-candidate.component.html',
  styleUrls: ['./list-of-candidate.component.scss']
})
export class ListOfCandidateComponent implements OnInit {

  type = 'month';
  types = ['week', 'month', 'year'];
  vacancy:any;
  source: LocalDataSource = new LocalDataSource();

  constructor(private service:DataService) { 
  }

  ngOnInit(): void {
    this.retrieveData();
    
  }

  retrieveData()
  {
    this.service.getVacancyData()
     .then(
       response => {
          this.vacancy=response.data
          }
     )
    }
}
