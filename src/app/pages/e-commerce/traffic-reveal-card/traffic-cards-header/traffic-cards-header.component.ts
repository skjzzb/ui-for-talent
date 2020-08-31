import { Component, EventEmitter, Input, OnDestroy, Output, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
import { DataService } from '../../../../@core/utils/data.service';

@Component({
  selector: 'ngx-traffic-cards-header',
  styleUrls: ['./traffic-cards-header.component.scss'],
  templateUrl: './traffic-cards-header.component.html',
})
export class TrafficCardsHeaderComponent implements OnDestroy, OnInit {
  private alive = true;

  @Output() periodChange = new EventEmitter<string>();

  @Input() type: string = 'week';

  @Input() selectedProject: string = '';
  @Output() projectChange = new EventEmitter<string>();
  types: string[] = ['week', 'month', 'year'];
  currentTheme: string;
  projects: any
  constructor(private themeService: NbThemeService, private dataService : DataService) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.currentTheme = theme.name;
      });
  }
  ngOnInit(): void {
    this.dataService.getAllProject().subscribe((data)=>{
      this.projects = data;
    })
  }

  changePeriod(period: string): void {
    this.type = period;
    this.periodChange.emit(period);
  }
  changeProject(project): void {
    this.selectedProject = project;
    console.log(this.selectedProject)
    this.projectChange.emit(project)
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
