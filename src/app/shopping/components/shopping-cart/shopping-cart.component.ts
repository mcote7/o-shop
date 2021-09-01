import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/shared/models/product';

import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';

import { 
  fadeIn, 
  slideInTop, 
  listAnimationWrap, 
  listAnimationItem, 
  slideInLeft } from 'src/animations/anime';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
  animations: [
    fadeIn,
    slideInTop,
    slideInLeft,
    listAnimationItem,
    listAnimationWrap
  ]
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  public subscription: Subscription;

  public cart: any; // make $|async
  public itemKeys: any[]; // needs selector
  public totalPrice: number; // needs selector similar to got total q
  public shoppingCartCount: number; // same as navbar state

  public isItems = false;
  public isStaggDone = false;

  constructor( private cartService: ShoppingCartService, private router: Router ) { }

  ngOnInit() {
    let cartId = localStorage.getItem('cartId');
    this.subscription = this.cartService.getCart(cartId).subscribe(cart => {
      // console.log("this cart", cart.items)
      this.shoppingCartCount = 0;
      this.totalPrice = 0;
      if(cart && cart.items) {
        for(let productId in cart.items) {
            this.shoppingCartCount += cart.items[productId].quantity;
            this.totalPrice += cart.items[productId].product.price * cart.items[productId].quantity;
            this.isItems = true;
            this.cart = cart;
            // console.log("this cart 2", cart)
        }
        this.itemKeys = Object.keys(cart.items);
      } else {
        this.isItems = false;
        this.itemKeys = [];
        this.router.navigate(['/']);
        // console.log("this cart 3", cart.items)
      }
      
      // console.log("🌮", this.itemKeys);
      // console.log("🍗", this.cart);
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  removeFromCart(product: Product) {
    if(this.shoppingCartCount > 1) {
      this.cartService.removeFromCart(product);
    } else {
      if(confirm('🤔 are you sure ?')) {
        this.cartService.removeFromCart(product);
      } else {
        return;
      }
    }
  }

  getQuantity(product: Product) {
    if(!this.cart) {
      return 0;
    }
    let item = this.cart.items[product.key];
    // console.log("hey", this.cart)
    return item ? item.quantity : 0;
  }

  clearCart() {
    if(confirm('🤔 are you sure ?')) {
      this.cartService.clearCart();
    } else {
      return;
    }
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
