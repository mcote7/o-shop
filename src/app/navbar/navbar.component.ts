import { Component, OnInit } from '@angular/core';

import { AppUser } from 'src/models/app-user';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public appUser: AppUser;

  public isMenuCollapsed = true;
  public isDropdownCollapsed = true;

  constructor( private auth: AuthService) {
    auth.appUser$.subscribe( appUser => this.appUser = appUser );
  }

  ngOnInit() {}

  logout() {
    this.auth.logout();
  }


  handleMenuCollapse() {
    // console.log("menu collapse")
    if(this.isMenuCollapsed === true) {
      this.isMenuCollapsed = false;
    } else {
      this.isMenuCollapsed = true;
    }
  }

  handleDropdownCollapse() {
    // console.log("dropdown collapse")
    if(this.isDropdownCollapsed === true) {
      this.isDropdownCollapsed = false;
    } else {
      this.isDropdownCollapsed = true;
    }
  }

}
// 