import { Component } from '@angular/core';

import { Candidate, cv } from './pages-menu';
import { Vacancy } from './pages-menu';
import { dashboard } from './pages-menu';
import { users } from './pages-menu';
import { Level } from './pages-menu';

// import { uploadResume } from './pages-menu';

import { MENU_ITEMS } from './pages-menu';
import { NbMenuItem } from '@nebular/theme';
import { canvas } from 'leaflet';
import { TokenStorageService } from '../_services/token-storage.service';
import { DataService } from '../@core/utils/data.service';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {

    //menu = MENU_ITEMS;
    menu
    MENU_ITEMS2: NbMenuItem[]=[];
    roles=null;
    feature


  constructor(private tokenService:TokenStorageService,private dataService:DataService)
  {
    var user=this.tokenService.getUser()
    if(user==null)
    {
      this.menu = MENU_ITEMS;
    }else
    {
    this.roles = user.roles;
    this.dataService.getFeatureByRole(this.roles[0])
    .then(
      data => {
      //  console.log(data.data)
        this.feature=data.data
        this.constructNbMenuItem();
      },
      err=>
      {
        this.feature=null;
      });
    }
  }

  constructNbMenuItem()
  {

    //console.log(this.feature.dashboard)
    if(this.feature.dashboard)
    this.MENU_ITEMS2.push(dashboard)

    var temp={
      title: 'FEATURES',
      group: true,
    }
    this.MENU_ITEMS2.push(temp)

    if(this.feature.vacancy)
    this.MENU_ITEMS2.push(Vacancy)
    if(this.feature.candidate)
    this.MENU_ITEMS2.push(Candidate)
    if(this.feature.userList)
    this.MENU_ITEMS2.push(users)
    if(true)
    // this.MENU_ITEMS2.push(uploadResume)
    if(this.feature.Level)
    this.MENU_ITEMS2.push(Level)
    this.MENU_ITEMS2.push(cv)
    this.menu=this.MENU_ITEMS2
  }

}
