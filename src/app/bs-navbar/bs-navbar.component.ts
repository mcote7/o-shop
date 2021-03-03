import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss']
})
export class BsNavbarComponent implements OnInit {

  public isMenuCollapsed = true;
  public isDropdownCollapsed = true;

  constructor() { }

  ngOnInit() {
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