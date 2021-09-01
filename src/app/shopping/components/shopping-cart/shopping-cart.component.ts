import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Product } from 'src/app/shared/models/product';

import { Store } from '@ngrx/store';
import * as fromStore from 'src/app/shared/store';

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
  public isStaggDone = false;
  public subscription: Subscription;

  public cart: any; // make $|async 
  public isItems = false; // can remove at end 

  // store 
  public shoppingCartCount$: Observable<number>;
  public totalPrice$: Observable<number>;
  public itemKeys$: Observable<any[]>;
  // 

  constructor( 
    private store: Store<fromStore.ShoppingState>, 
    private cartService: ShoppingCartService, 
    private router: Router ) {}

  ngOnInit() {
    let cartId = localStorage.getItem('cartId');
    this.subscription = this.cartService.getCart(cartId).subscribe(cart => {
      // console.log("this cart", cart.items)
      if(cart && cart.items) {
        this.isItems = true;
        this.cart = cart;
        // console.log("this cart 2", this.cart)
      } else {
        this.isItems = false;
        this.router.navigate(['/']);
        // console.log("this cart 3", cart.items)
      }
      // console.log("🍗", this.cart);
    });

    // 🏪 new store 
    this.shoppingCartCount$ = this.store.select(fromStore.getTotalCartQuantity);
    this.totalPrice$ = this.store.select(fromStore.getTotalCartprice);
    this.itemKeys$ = this.store.select(fromStore.getCartItemKeys);
  }


  addToCart(product: Product) {
    this.store.dispatch(fromStore.addToCart({product}));
  }

  removeFromCart(product: Product, isLast: boolean) {
    if(isLast) {
      if(confirm('🤔 are you sure you want an empty 🛒?')) {
        this.store.dispatch(fromStore.removeFromCart({product}));
      } else {
        return;
      }
    } else {
      this.store.dispatch(fromStore.removeFromCart({product}));
    }
  }

  getProductCartQuantity(product: Product): Observable<number> {
    return this.store.select(fromStore.getProductCartQuantity({product: product.key}));
  }


  // needs new action ... 
  clearCart() {
    if(confirm('🤔 are you sure you want an empty 🛒?')) {
      this.cartService.clearCart();
    } else {
      return;
    }
  }


// to be removed ... 
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
