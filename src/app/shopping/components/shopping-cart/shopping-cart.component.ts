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

  public cart: any; 
  public isItems = false; 

  // store 
  public itemKeys$: Observable<any[]>;
  public cart$: Observable<ShoppingCart>;
  public totalPrice$: Observable<number>;
  public shoppingCartCount$: Observable<number>;
  // 

  constructor( 
    private router: Router, 
    private cartService: ShoppingCartService, 
    private store: Store<fromStore.ShoppingState>, 
  ) {}

  ngOnInit() {
    // 🏪 new store 
    this.cart$ = this.store.select(fromStore.getCart);
    this.itemKeys$ = this.store.select(fromStore.getCartItemKeys);
    this.totalPrice$ = this.store.select(fromStore.getTotalCartprice);
    this.shoppingCartCount$ = this.store.select(fromStore.getTotalCartQuantity);
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


  // needs new action, reducer, effect, selector arghhh! ... 
  clearCart() {
    if(confirm('🤔 are you sure you want an empty 🛒?')) {
      this.cartService.clearCart();
    } else {
      return;
    }
  }
}
