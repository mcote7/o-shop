import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/models/product';

import { ShoppingCartService } from '../services/shopping-cart.service';

import { listAnimationWrap, listAnimationItem, slideInTop, fadeIn, slideInLeft } from '../../animations/anime';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
  animations: [listAnimationItem,listAnimationWrap,slideInTop,fadeIn,slideInLeft]
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

  public subscription: Subscription;
  public shoppingCartCount: number;
  public isItems = false;
  public cart: any;
  public itemKeys: any[];
  public totalPrice: number;
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

  addToCart(product: Product, i: string) {
    this.cartService.addToCart(product);
    let btn = document.getElementById(i);
    btn.animate([
      {boxShadow: '0 0 0 0 hsla(185, 29%, 41%, 1)', transform: 'scale(1.5)'},
      {boxShadow: '0 0 10px 20px rgba(255,150,44,0)', transform: 'scale(1)'}
    ], {
      duration: 150
    });
  }

  removeFromCart(product: Product, i: string) {
    if(this.shoppingCartCount > 1) {
      this.cartService.removeFromCart(product);
      // console.log("heyheyhey",i)
      let btn = document.getElementById(i);
      btn.animate([
        {transform: 'rotateX(360deg)', backgroundColor: 'hsl(185, 29%, 41%)'},
        {transform: 'rotateX(0deg)', backgroundColor: 'hsl(185, 29%, 41%)'}
      ], {
        duration: 150
      });
    } else {
      if(confirm('🤔 are you sure ?')) {
        this.cartService.removeFromCart(product);
        // console.log("heyheyhey",i)
        let btn = document.getElementById(i);
        btn.animate([
          {transform: 'rotateX(360deg)', backgroundColor: 'hsl(185, 29%, 41%)'},
          {transform: 'rotateX(0deg)', backgroundColor: 'hsl(185, 29%, 41%)'}
        ], {
          duration: 150
        });
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
