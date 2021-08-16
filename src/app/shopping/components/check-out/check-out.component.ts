import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/shared/models/order';

import { 
  fadeIn, 
  toastNotification, 
  slideInTop, 
  slideInLeft } from 'src/animations/anime';
import { AuthService } from 'src/app/shared/services/auth.service';

import { OrderService } from 'src/app/shared/services/order.service';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss'],
  animations: [
    fadeIn,
    toastNotification,
    slideInTop,
    slideInLeft,
  ]
})

export class CheckOutComponent implements OnInit, OnDestroy {

  public shipping: any = {};
  public cart: any;

  public userId: string;

  public itemKeys: any[];
  public items: any[] = [];

  public cartSubscription: Subscription;
  public userSubscription: Subscription;

  public shoppingCartCount: number;

  public isSaved: boolean = false;

  public capsIsOn = false;

  constructor(
    private cartService: ShoppingCartService,
    private router: Router,
    private orderService: OrderService,
    private authService: AuthService) { }

  ngOnInit() {
    let cartId = localStorage.getItem('cartId');
    this.cartSubscription = this.cartService.getCart(cartId).subscribe(cart => {
      if(!!cart) {
        this.cart = cart;
        this.itemKeys = Object.keys(cart.items);
        // console.log("cart", cart)
        // console.log("item keys", this.itemKeys)
        for(let prod of this.itemKeys) {
          // console.log("product", prod)
          this.items.push(this.cart.items[prod]);
          // console.log("pushed ?", this.items)
        }
      } else {
        // console.log("no items", cart)
        this.router.navigate(['/']);
      }
    });
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  async placeOrder(info: any, f: NgForm) {
    this.saveConfirm();
    let order = new Order(this.userId, info, this.items)
    // console.log("order?", order)
    let result = await this.orderService.saveOrder(order);
    f.reset();
    this.router.navigate(['order-success', result.key]);
    setTimeout(() => {
      this.cartService.clearCart();
    }, 100);
  }

  saveConfirm() {
    this.isSaved = true;
    setTimeout(() => {
      this.isSaved = false;
    }, 3000);
  }

  checkCapsLock(e: any) {
    if (e.keyCode) {
      if (e.getModifierState('CapsLock')) {
        this.capsIsOn = true;
      } else {
        this.capsIsOn = false;
      }
    } else {
      return;
    }
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

}
