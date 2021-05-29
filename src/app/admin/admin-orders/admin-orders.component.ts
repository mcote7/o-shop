import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {

  orders$: any;

  messages: string[] = ["hello cote", "messages here"];
  counter: number = 0;

  constructor(public orderService: OrderService) { 
    this.orders$ = orderService.getOrders();
  }

  addMessage() {
    this.counter++;
    this.messages.push("new message" + this.counter);
    let m = document.getElementById('mesc');
    console.log(m.scrollTop)
    console.log(m.scrollTopMax)
    m.scrollTop = m.scrollHeight;
  }

  ngOnInit() {
  }

}
