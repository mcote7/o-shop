import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ShoppingCart } from 'src/app/shared/models/shopping-cart';
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

export class ShoppingCartComponent implements OnInit {
  public isStaggDone = false;

  public cart: any; // make $|async 
  public isItems = false; // can remove at end ? 

  // store 
  public shoppingCartCount$: Observable<number>;
  public totalPrice$: Observable<number>;
  public itemKeys$: Observable<any[]>;
  public cart$: Observable<ShoppingCart>;
  // 

  constructor( 
    private store: Store<fromStore.ShoppingState>, 
    private cartService: ShoppingCartService, 
    private router: Router ) {}

  ngOnInit() {
    // 🏪 new store 
    this.shoppingCartCount$ = this.store.select(fromStore.getTotalCartQuantity);
    this.totalPrice$ = this.store.select(fromStore.getTotalCartprice);
    this.itemKeys$ = this.store.select(fromStore.getCartItemKeys);
    this.cart$ = this.store.select(fromStore.getCart);
    // need to re-factor 
    this.cart$.subscribe(cart => {
      if(cart && cart.items) {
        this.cart = cart;
        this.isItems = true;
      } else {
        this.router.navigate(['/']);
        this.isItems = false;
      }
    });
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
}
