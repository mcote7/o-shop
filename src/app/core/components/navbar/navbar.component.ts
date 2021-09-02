import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AppUser } from 'src/app/shared/models/app-user';
import { AuthService } from 'src/app/shared/services/auth.service';

import { Store } from '@ngrx/store';
import * as fromStore from 'src/app/shared/store';

import { fadeInOut, fadeIn, toastNotification } from 'src/animations/anime';


@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [fadeInOut, fadeIn, toastNotification]
})

export class NavbarComponent implements OnInit {
  public appUser: AppUser;

  public shoppingCartCount$: Observable<number>;

  public isMenuCollapsed = true;
  public isDropdownCollapsed = true;

  constructor( private auth: AuthService, private store: Store<fromStore.ShoppingState> ) {}

  ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.shoppingCartCount$ = this.store.select(fromStore.getTotalCartQuantity);
  }

  logout() {
    this.auth.logout();
    this.closeMenus();
    this.appUser = null;
  }

  handleMenuCollapse() {
    if(this.isMenuCollapsed === true) {
      this.isMenuCollapsed = false;
    } else {
      this.isMenuCollapsed = true;
    }
  }

  handleDropdownCollapse() {
    if(this.isDropdownCollapsed === true) {
      this.isDropdownCollapsed = false;
    } else {
      let el = document.getElementById('drop-d');
      el.animate([
        {opacity: 1, transform: 'scaleY(1)'},
        {opacity: 0, transform: 'scaleY(0.2)'}
      ], {
        duration: 155,
        easing: 'ease-in'
      });
      setTimeout(() => {
        this.isDropdownCollapsed = true;
      }, 150);
    }
  }

  closeMenus() {
    this.isMenuCollapsed = true; 
    this.isDropdownCollapsed = true;
  }

  scrollDown() {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    })
  }
}
// 