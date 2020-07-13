import  Swal  from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../@core/utils/data.service';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-list-of-candidate',
  templateUrl: './list-of-candidate.component.html',
  styleUrls: ['./list-of-candidate.component.scss']
})
export class ListOfCandidateComponent implements OnInit {
  type:any;
  vacancy:any;
  color:string;


  settings = {
    actions:{add:false},
     edit: {
       editButtonContent: '<i class="nb-edit"></i>',
       saveButtonContent: '<i class="nb-checkmark"></i>',
       cancelButtonContent: '<i class="nb-close"></i>',
       confirmSave:true,
     },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      // id: {
      //   title: 'ID',
      //   type: 'number',
      //   filter: false
      // },
      candidateName: {
        title: 'Candidate Name',
        type: 'string',
        filter: false
      },
      contactNo: {
        title: 'Contact Number',
        type: 'string',
        filter: false
      },
      email: {
        title: 'Email',
        type: 'string',
        filter: false
      },
      technologyStack:{
        title:'Technology Stack',
        type: 'string',
        filter: false
      },
      yearOfExperience:{
        title:'Year Of Experience',
        type: 'number',
        filter: false
      },
      reqMatchingPercent:{
        title:'Matching Percent',
        type: 'html',
        valuePrepareFunction: (value) => {
          if(value>75)
          {
            this.color='text-success';
          }else if(value>50)
          {
            this.color='text-warning';
          }else
          this.color='text-danger';

          return `<div class="`+this.color+`">${value}%</div>`
        },
        filter: false,
        sort:true,
        sortDirection:'desc'
      },
    },
    pager:
    {
    perPage: 5
    }
  };


  source: LocalDataSource = new LocalDataSource();

  constructor(private service:DataService) { 
  }

  ngOnInit(): void {
    this.retrieveData();
    this.color='text-danger';
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
    onSelectVacancy()
    {
      this.service.getCandidateByVacancyId(this.type)
      .then(
        response => {
           this.source.load(response.data);
           }
      )  
      console.log(this.source)
    }

    onUpdateRecord(event) {
      //this.ngOnInit();
      console.log("working..")
        var data = {"id" : event.newData.id,
                    "candidateName" : event.newData.candidateName,
                    "contactNo" : event.newData.contactNo,
                    "email" : event.newData.email,
                     "technologyStack" : event.newData.technologyStack,
                     "reqMatchingPercent" : event.newData.reqMatchingPercent,
                   };
                   console.log(data)
            this.service.updateCandidate(data)
            .then(
              response => {
                 console.log(response);
                 event.confirm.resolve();
              }
            )          
    }

    onDeleteConfirm(event): void {
      if (Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })) {
       console.log(event.data.id)
        this.service.DeteteCandidate(event.data.id)
        .then(
          response => {
             console.log(response);
             event.confirm.resolve();
          }
        )
      } else {
        event.confirm.reject();
      }
    }
  
}
