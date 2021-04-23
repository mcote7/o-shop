import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AppUser } from 'src/models/app-user';

import { AuthService } from '../services/auth.service';
import { ShoppingCartService } from '../services/shopping-cart.service';

import { fadeInOut, fadeIn, toastNotification } from '../../animations/anime';


@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [fadeInOut, fadeIn, toastNotification]
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

}
// 