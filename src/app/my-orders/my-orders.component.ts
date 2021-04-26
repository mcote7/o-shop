import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { OrderService } from '../services/order.service';
import {listAnimationWrap, listAnimationItem, slideInLeft, slideInTop} from '../../animations/anime';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
  animations: [listAnimationWrap,listAnimationItem,slideInLeft,slideInTop]
})
export class MyOrdersComponent implements OnInit, OnDestroy {

  public orders: any[] = [];
  public subscription: Subscription;
  public user: any;

  constructor(private userService: AuthService, private orderService: OrderService) {
    this.subscription = this.orderService.getOrders().subscribe(order => {
      console.log("orders?", order)
      this.orders = order;
    });
  }

  ngOnInit() {
    this.userService.user$.subscribe(u => {
      console.log(u)
      this.user = u;
    })
    // console.log()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
