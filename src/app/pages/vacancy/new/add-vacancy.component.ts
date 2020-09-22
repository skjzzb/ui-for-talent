import {  Component,ViewEncapsulation, OnInit} from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { DataService } from '../../../@core/utils/data.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { type } from 'os';
import { async } from 'rxjs/internal/scheduler/async';
import { defer } from 'rxjs';
import { version } from 'process';
import  Swal  from 'sweetalert2';

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
  selectedPosition: string
  
 // description:any;
  data:any;
  //selectedsubbtechnology:any[];
  
  constructor(private router:Router ,private service: DataService,private location: Location) {
  }
  project = []
  position : any
  ngOnInit(): void {
    this.retrieveData();
    this.retrieveLevelData();
    //this.retrieveAllSubTechnologyData();

    this.service.getAllProject().subscribe((data)=>{
      var proj : any
      proj = data
      console.log(proj)
      proj.forEach(element => {
        if(element.status == "ACTIVE")
          this.project.push(element)
      });
    })

    this.service.getAllPositions().subscribe(data =>[
      this.position = data
    ])
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

    checked = false;

    toggle(checked: boolean) {
      this.checked = checked;
      console.log(this.checked)
    }


  addVacancy(dataFromUI:any)
  {
  let vacancy=dataFromUI.form.value;
  if(this.checked)
  {
    this.shareOnFb(vacancy)
  }
  
  console.log(vacancy);
   this.service.addVacancy(vacancy)
   .then(
     Response => {
      // if (window.confirm("vacancy is added. do you want to add more record ?"))
      // {
      //   this.selectedItem=null;
      //   //this.selectedtechnology=null;
      //   this.ClickedSubtechnology=null;
      //   this.ClickedLevel=null;
      //   dataFromUI.form.reset();
      // }else
      // {
      //   this.router.navigate(['/pages/vacancy/list-of-vacancy']);
      // }
      
      Swal.fire({
        title: 'Opportunity is created. Do you want to add more record ?',
        showCancelButton: true,
        confirmButtonText: `Yes`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.selectedItem=null;
          this.ClickedSubtechnology=null;
          this.ClickedLevel=null;
          dataFromUI.form.reset();
        } 
        else{
          this.router.navigate(['/pages/vacancy/list-of-vacancy']);
        }
      })
    }
   )
  } 
 
  shareOnFb(vacancy: any) {
    this.service.postOnFb(vacancy).subscribe((data) => {
      // console.log(data)
    })
  }

  }

  export {AddVacancyComponent}
