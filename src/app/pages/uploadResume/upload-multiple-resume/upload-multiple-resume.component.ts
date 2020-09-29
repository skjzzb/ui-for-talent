import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../@core/utils/data.service';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-upload-multiple-resume',
  templateUrl: './upload-multiple-resume.component.html',
  styleUrls: ['./upload-multiple-resume.component.scss']
})
export class UploadMultipleResumeComponent implements OnInit {
  vacancy : any
  listOfFileName: any[] = [];

  listOfFiles: File[] = [];
  resume: {
    fileName: any
  }
  settings = {
    actions: { edit: false, add: false },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
      position: 'right'
    },
    columns: {
      name: {
        title: 'File Name',
        type: 'text',
        filter: false,
        width: "80%"
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();

  allProjects: any
  allPositions: any
  selectedProject: any
  selectedPosition: any
  isProjectSelected = false

  constructor(private service: DataService) { }

  ngOnInit(): void {
    this.service.getAllProject().subscribe(data => {
      this.allProjects = data
    })
  }

  onSelectProject() {
    this.service.getAllPositions().subscribe(data => {
      this.allPositions = data
    })
    this.isProjectSelected = true
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



  onSelectPosition() {
    console.log(`Selected Project ${this.selectedProject}, Selected Position ${this.selectedPosition}`)
    this.service.getVacancyByProjectAndPosition(this.selectedProject, this.selectedPosition)
    .subscribe(data=>{
      this.vacancy = data
    })
  }

  onFileSelect(files: FileList) {
    var file: File;
    file = files.item(0)
    this.listOfFiles.push(file)
    console.log(this.listOfFiles)

    var temp = {
      "name": ""
    }
    let id = this.vacancy.vacancyId;
    temp.name = id + "_" + file.name;
    this.listOfFileName.push(temp)
    this.source.load(this.listOfFileName)
    console.log(this.source)
    console.log(temp.name);


  }

  onDeleteConfirm(event): void {
    var data = { "name": event.data.name };
    let newList: any[] = [];
    let newListOfName: any[] = [];
    this.listOfFiles.forEach(element => {
      let n = element.name;
      if (n == data.name) {

      } else {
        newList.push(element)
        var temp = {
          "name": ""
        }

        temp.name = element.name;
        newListOfName.push(temp)
      }
    })

    this.listOfFiles = newList
    this.listOfFileName = newListOfName
    this.source.load(this.listOfFileName)
  }

  submitFile() {
    console.log(this.vacancy.vacancyId)
    console.log(this.listOfFiles)

    let formData = new FormData();
    this.listOfFiles.forEach(file => {
      formData.set('file',file);
      this.service.uploadFile(formData).subscribe(
        result =>
        {
          console.log(result)
        }
      );
    });

    // this.service.addMultipleResume(this.vacancy.vacancyId, this.listOfFiles)
  }

}

