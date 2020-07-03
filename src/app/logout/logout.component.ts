import { TokenStorageService } from './../_services/token-storage.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'ngx-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
  }
  
  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

}
