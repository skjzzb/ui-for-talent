import {  Component,ViewEncapsulation} from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { DataService } from '../../../@core/utils/data.service';

@Component({
  selector: 'nb-add-vacancy',
  styleUrls: ['./add-vacancy.component.scss'],
  templateUrl: './add-vacancy.component.html',
  encapsulation: ViewEncapsulation.None
})
class AddVacancyComponent {
  selectedItem = '2';
  selectedtechnology:any[];
  source: LocalDataSource = new LocalDataSource();
  technology:[];
  subtechnology:any[];
  selectedsubbtechnology:any[];
  
  constructor(private service: DataService) {
  }

  ngOnInit(): void {
    this.retrieveData();
    //this.retrieveAllSubTechnologyData();
  }

  retrieveData()
  {
    this.service.getTechnologyData()
    .then(
      response => {
          console.log(response);
          this.technology=response.data;
      }
    )
    console.log(this.technology)
  }

  retrieveAllSubTechnologyData()
  {
    this.service.getSubTechnologyData(this.selectedItem)
    .then(
      response => {
          console.log(response);
          this.subtechnology=response.data;
      }
    )
    console.log(this.subtechnology)
  }

  onSelectTechnology()
  {
     
    //for(var subtech of this.subtechnology)
    //{ 
      //if(this.selectedItem==subtech.technologyId)
      //{
      
        //let sb:{};
        //sb["0"]=subtech.technologyId;
        //sb["1"]=subtech.technologyName;
        //this.selectedsubbtechnology.map(subtech => this.selectedsubbtechnology.push(subtech))
       // this.selectedsubbtechnology.push(subtech);
        //this.selectedsubbtechnology.push(subtech.subTechnologyName);
        
       // this.selectedsubbtechnology.push(Object.assign({}, subtech));
      // console.log(subtech)
  //    }
  this.retrieveAllSubTechnologyData(); 
    }
  }

  export {AddVacancyComponent}