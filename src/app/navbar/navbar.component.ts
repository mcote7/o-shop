import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AppUser } from 'src/models/app-user';

import { AuthService } from '../services/auth.service';
import { ShoppingCartService } from '../services/shopping-cart.service';

import { fadeInOut, fadeIn } from '../../animations/anime';


@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [fadeInOut, fadeIn]
})
export class NavbarComponent implements OnInit {

  public appUser: AppUser;

  // public cart: any;
  public subscription: Subscription;
  public shoppingCartCount: number;
  public isItems = false;

  public isMenuCollapsed = true;
  public isDropdownCollapsed = true;

  constructor( private auth: AuthService, private cartService: ShoppingCartService ) {
  }

  ngOnInit() {
    this.auth.appUser$.subscribe( appUser => this.appUser = appUser );
    let cartId = localStorage.getItem('cartId');
    this.subscription = this.cartService.getCart(cartId).subscribe(cart => {
      // console.log("this cart", cart.items)
      this.shoppingCartCount = 0;
      if(cart && cart.items) {
        for(let productId in cart.items) {
            this.shoppingCartCount += cart.items[productId].quantity;
            this.isItems = true;
            // console.log("this cart 2", cart.items)
        }
      } else {
        this.isItems = false;
        // console.log("this cart 3", cart.items)
      }
    });
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
      this.isDropdownCollapsed = true;
    }
  }

  closeMenus() {
    this.isMenuCollapsed = true; 
    this.isDropdownCollapsed = true;
  }

}
// 