import {  Component,ViewEncapsulation, OnInit} from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { DataService } from '../../../@core/utils/data.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'nb-add-vacancy',
  styleUrls: ['./add-vacancy.component.scss'],
  templateUrl: './add-vacancy.component.html',
  encapsulation: ViewEncapsulation.None
})
class AddVacancyComponent implements OnInit{
  selectedItem = '';
  selectedItem1='';
  selectedProject:string;
  selectedtechnology:string[];
  source: LocalDataSource = new LocalDataSource();
  technology:[];
  subtechnology:any[];
  vacancy:any[];
  ClickedSubtechnology;
  ClickedLevel;
  jd=null;
  level:any[];
  levelList=null;
 // description:any;
  data:any;
  //selectedsubbtechnology:any[];
  
  constructor(private router:Router ,private service: DataService,private location: Location) {
  }

  ngOnInit(): void {
    this.retrieveData();
    this.retrieveLevelData();
    //this.retrieveAllSubTechnologyData();
  }

  retrieveData()
  {
    this.service.getTechnologyData()
    .then(
      response => {
          this.technology=response.data;
      }
    )
  }

  retrieveLevelData(){
      this.service.getLevelData()
    .subscribe(
      (response:any) => {
          this.level=response;
          console.log(response);
      }
    )
  }

  retrieveAllSubTechnologyData()
  {
    this.service.getSubTechnologyData(this.selectedItem)
    .then(
      response => {
          this.subtechnology=response.data;
      }
    )
    console.log(this.subtechnology)
  }

  onClickSubtechnology()
  {
    if(this.jd==null || this.jd=='')
    {
      this.jd=this.ClickedSubtechnology
      console.log(this.jd);
    }else
    {
      let flag;
      let usingSplit=this.jd.split(', ');
      for (let index = 0; index < usingSplit.length; index++) 
      {
        if(this.ClickedSubtechnology==usingSplit[index])
        {
          if(this.ClickedSubtechnology==usingSplit[0])
          { if(usingSplit.length==1)
            this.jd=this.jd.replace(this.ClickedSubtechnology.toString(),'');
            else
            this.jd=this.jd.replace(this.ClickedSubtechnology.toString()+', ','');
            flag=true;
            break
          }else
          {
            console.log('inside true..')
            flag=true;
            break
          }

        }else
        {
          flag=false
        }
      }

      console.log(flag)
      if(flag==true)
        {
          this.jd=this.jd.replace(', '+this.ClickedSubtechnology.toString(),'');
        }else
        {
          this.jd=this.jd.concat(', '+this.ClickedSubtechnology.toString());
        }
    }
  }

   onSelectLevel(){
 
      if(this.levelList==null || this.levelList=='')
    {
      this.levelList=this.ClickedLevel
      console.log(this.ClickedLevel);
    }else
    {
      let flag;
      let usingSplit=this.levelList.split(', ');
      console.log(usingSplit);
      for (let index = 0; index < usingSplit.length; index++) 
      {
        if(this.ClickedLevel==usingSplit[index])
        {
          if(this.ClickedLevel==usingSplit[0])
          { if(usingSplit.length==1)
            this.levelList=this.levelList.replace(this.ClickedLevel.toString(),'');
            else
            this.levelList=this.levelList.replace(this.ClickedLevel.toString()+', ','');
            flag=true;
            break
          }else
          {
            console.log('inside true..')
            flag=true;
            break
          }

        }else
        {
          flag=false
        }
      }

      console.log(flag)
      if(flag==true)
        {
          this.levelList=this.levelList.replace(', '+this.ClickedLevel.toString(),'');
        }else
        {
          this.levelList=this.levelList.concat(', '+this.ClickedLevel.toString());
        }
    }
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

   

  addVacancy(dataFromUI:any)
  {
    //this.ngOnInit();
  let vacancy=dataFromUI.form.value;
  //vacancy.jd=vacancy.jd.toString()
  console.log(vacancy);
   this.service.addVacancy(vacancy)
   .then(
     Response => {
      if (window.confirm("vacancy is added. do you want to add more record ?"))
      {
        this.selectedItem=null;
        //this.selectedtechnology=null;
        this.ClickedSubtechnology=null;
        this.ClickedLevel=null;
        dataFromUI.form.reset();
      }else
      {
        this.router.navigate(['/pages/vacancy/list-of-vacancy']);
      }
      //this.ngOnDestroy()
      //this.ngOnInit()
      //window.location.reload()
    }
   )
  } 
  }

  export {AddVacancyComponent}
