import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { slideInTop, listAnimationWrap, listAnimationItem, popin, fadeIn } from '../../animations/anime';
import { ShoppingCartService } from '../shared/services/shopping-cart.service';


@Component({
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.scss'],
  animations: [slideInTop,listAnimationWrap,listAnimationItem,popin,fadeIn]
})
export class ShoppingCartSummaryComponent implements OnInit, OnDestroy {

    public cart: any;
    public subscription: Subscription;
    public shoppingCartCount: number;
    public totalPrice: number;
    public isItems = false;
    public itemKeys: any[];
    public items: any[] = [];

    public isStagDone = false;

  constructor(private cartService: ShoppingCartService, private router: Router) { }

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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
