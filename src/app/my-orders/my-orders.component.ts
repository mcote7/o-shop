import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { OrderService } from '../services/order.service';
import {listAnimationWrap, listAnimationItem, slideInLeft, slideInTop, fadeIn} from '../../animations/anime';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
  animations: [listAnimationWrap,listAnimationItem,slideInLeft,slideInTop, fadeIn]
})
export class MyOrdersComponent implements OnInit, OnDestroy {

  public orders: any[] = [];
  public orderTotal: number;

  public subscription: Subscription;
  public user: any;

  public lastOne = false;

  constructor(private userService: AuthService, private orderService: OrderService,private router: Router) {
    this.subscription = this.orderService.getOrders().subscribe(order => {
      // console.log("orders?", order)
      this.orders = order;
      if(!this.orders.length) {
        this.router.navigate(['/']);
      }
      this.orderTotal = 0;
      for(let i = 0; i < this.orders.length; i++) {
        // console.log("1 order", this.orders[i])
        for(let j = 0; j < this.orders[i].items.length; j++) {
          // console.log("1 order items", this.orders[i].items[j].totalPrice)
          this.orderTotal += this.orders[i].items[j].totalPrice;
        }
      }
    });
  }

  ngOnInit() {
    this.userService.user$.subscribe(u => {
      // console.log(u)
      this.user = u;
    })
    // console.log()
  }

  getTotalPrice(items: any[], length: number) {
    // console.log("items", items)
    let total = 0;
    for(let i = 0; i < length; i++) {
      let subTot =  items[i].quantity * items[i].totalPrice;
      // console.log("items i", items[i])
      total += subTot;
    }
    return total;
  }

  callLast(l?:any) {
    if(l) {
      this.lastOne = true;
    } else {
      return;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
  