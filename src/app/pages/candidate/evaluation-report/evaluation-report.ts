import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { DataService } from '../../../@core/utils/data.service';
import { TokenStorageService } from '../../../_services/token-storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';

interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

// interface FSEntry {
//   name: string;
//   size: string;
//   kind: string;
//   items?: number;
// }

interface FSEntry {
  name: string;
  size: string;
  kind: string;
  items?: number;
}

@Component({
  selector: 'ngx-evaluation-report',
  templateUrl: './evaluation-report.html',
  styleUrls: ['./evaluation-report.scss']
})
export class EvaluationReportComponent implements OnInit {
  candidate: any;
  vacancy : any;
  technologies : any[];
  concepts: any[];
  questions: any;
  ratings:any;
  flag=false;
  demo="kake"
  customColumn = 'name';
  defaultColumns = [ 'size', 'kind', 'items' ];
  allColumns = [ this.customColumn, ...this.defaultColumns ];

  dataSource: NbTreeGridDataSource<FSEntry>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  constructor(private service:DataService,
              private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>,
              private router: Router,
              private route :ActivatedRoute){

                this.ratings= [];
                this.flag=false;
                this.dataSource = this.dataSourceBuilder.create(this.data);
              }

 x = 0
  ngOnInit(): void {
   // this.example = this.route.snapshot.params['rowData'];
   // console.log(this.route.snapshot.params['rowData'])
    this.candidate = JSON.parse(this.route.snapshot.params["rowData"]);
    this.vacancy = this.candidate.vacancy;
    console.log(this.candidate.email)
    console.log(this.candidate);

    var list = this.vacancy.jd.replace(/\s/g, '').split(",");
    console.log("list"+list);
    this.service.getTechnologyForPanel(list)
    .then(result=>
     {
       console.log(result.data)
       this.technologies = result.data;
       for( var i = 0 ; i<this.technologies.length;i++)
       {
         this.service.getConceptById(this.technologies[i]).then
         (result=>
           {
             console.log(result);
             this.concepts = result.data;
            
            this.questions =  this.concepts.map(element=>
              {
                console.log( element.question.split(","));
                return {"concept":element.concept,"question" :element.question.split(",")};
              })
              console.log(this.questions);
           })
        }
     })
  }
  opened(){
    console.log('Hello fromabh')
  }
  onSubmit(UIform)
  {
    console.log(UIform.form.value);
    console.log(this.ratings);
  }
clickme()
{
  this.flag = true;
}


updateSort(sortRequest: NbSortRequest): void {
  this.sortColumn = sortRequest.column;
  this.sortDirection = sortRequest.direction;
}

getSortDirection(column: string): NbSortDirection {
  if (this.sortColumn === column) {
    return this.sortDirection;
  }
  return NbSortDirection.NONE;
}

private data: TreeNode<FSEntry>[] = [
  {
    data: { name: 'Projects', size: '1.8 MB', items: 5, kind: 'dir' },
    children: [
      { data: { name: 'project-1.doc', kind: 'doc', size: '240 KB' } },
      { data: { name: 'project-2.doc', kind: 'doc', size: '290 KB' } },
      { data: { name: 'project-3', kind: 'txt', size: '466 KB' } },
      { data: { name: 'project-4.docx', kind: 'docx', size: '900 KB' } },
    ],
  },
  {
    data: { name: 'Reports', kind: 'dir', size: '400 KB', items: 2 },
    children: [
      { data: { name: 'Report 1', kind: 'doc', size: '100 KB' } },
      { data: { name: 'Report 2', kind: 'doc', size: '300 KB' } },
    ],
  },
  {
    data: { name: 'Other', kind: 'dir', size: '109 MB', items: 2 },
    children: [
      { data: { name: 'backup.bkp', kind: 'bkp', size: '107 MB' } },
      { data: { name: 'secret-note.txt', kind: 'txt', size: '2 MB' } },
    ],
  },
];

getShowOn(index: number) {
  const minWithForMultipleColumns = 400;
  const nextColumnStep = 100;
  return minWithForMultipleColumns + (nextColumnStep * index);
}

}

@Component({
  selector: 'ngx-fs-icon',
  template: `
    <nb-tree-grid-row-toggle [expanded]="expanded" *ngIf="isDir(); else fileIcon">
    </nb-tree-grid-row-toggle>
    <ng-template #fileIcon>
      <nb-icon icon="file-text-outline"></nb-icon>
    </ng-template>
  `,
})
export class FsIconComponent {
  @Input() kind: string;
  @Input() expanded: boolean;

  isDir(): boolean {
    return this.kind === 'dir';
  }
}

