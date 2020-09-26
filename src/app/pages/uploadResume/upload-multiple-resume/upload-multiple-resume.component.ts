import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../@core/utils/data.service';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-upload-multiple-resume',
  templateUrl: './upload-multiple-resume.component.html',
  styleUrls: ['./upload-multiple-resume.component.scss']
})
export class UploadMultipleResumeComponent implements OnInit {
  vacancy
  vacancyId
  listOfFileName:any[]=[];
  formData = new FormData();
  listOfFiles:File[]=[];
  resume:{
    fileName:any
  }
  settings = {
    actions:{edit:false,add:false},
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
      position: 'right'
    },
    columns: {
      name: {
        title: 'File Name',
        type: 'text',
        filter:false,
        width: "80%"
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service:DataService) { }

  ngOnInit(): void {
    this.retrieveData();
  }

  retrieveData()
  {
    this.service.getVacancyData()
     .then(
       response => {
          this.vacancy=response.data
          console.log("vacancy: ",this.vacancy)
          }
     )
    }

    onFileSelect(files:FileList)
    {
       var file:File;
       file=files.item(0)
       console.log("file"+files.item(0));
       this.listOfFiles.push(file)
       console.log("list",this.listOfFiles)

       var temp = {
        "name" : ""
      }
      let id=this.vacancyId;
        temp.name=id + "_"+file.name;
        this.listOfFileName.push(temp)
        this.source.load(this.listOfFileName)
        // console.log(this.source)
        // console.log(temp.name);


    }

    onDeleteConfirm(event): void {
      var data = {"name" : event.data.name};
      let newList:any[]=[];
      let newListOfName:any[]=[];
     this.listOfFiles.forEach(element => {
      let n=element.name;
      if(n==data.name)
      {

      }else{
        newList.push(element)
        var temp = {
          "name" : ""
        }

          temp.name=element.name;
          newListOfName.push(temp)
      }
     })

     this.listOfFiles=newList
     this.listOfFileName=newListOfName
     this.source.load(this.listOfFileName)
    }

    submitFile()
    {
      console.log(this.vacancyId)
      // console.log(this.listOfFiles)
      // this.formData.append('files',this.listOfFiles)
      for (let i = 0; i < this.listOfFiles.length; i++) {
        this.formData.append(this.listOfFiles[i].name, this.listOfFiles[i])
        console.log(this.listOfFiles[i])
      }
      console.log("formdata",this.formData)
      this.service.addMultipleResume(this.vacancyId,this.formData)
    }

  }

