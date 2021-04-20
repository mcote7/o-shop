import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  public subscription: Subscription;
  public shoppingCartCount: number;
  public isItems = false;
  public cart: any;
  public itemKeys: any[];

  constructor( private cartService: ShoppingCartService ) { }

  ngOnInit() {
    let cartId = localStorage.getItem('cartId');
    this.subscription = this.cartService.getCart(cartId).subscribe(cart => {
      // console.log("this cart", cart.items)
      this.shoppingCartCount = 0;
      if(cart && cart.items) {
        for(let productId in cart.items) {
            this.shoppingCartCount += cart.items[productId].quantity;
            this.isItems = true;
            this.cart = cart;
            console.log("this cart 2", cart.items)
        }
      } else {
        this.isItems = false;
        // console.log("this cart 3", cart.items)
      }
      this.itemKeys = Object.keys(cart.items);
      // console.log("🌮", this.itemKeys);
      // console.log("🍗", this.cart);
    });
  }

}
