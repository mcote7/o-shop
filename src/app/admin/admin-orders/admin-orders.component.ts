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
    this.messages.push("new_message_" + this.counter);
    // this.messages.push("new_message_" + this.counter + 1);
    
    let m = document.getElementById('mesc');
    console.log("🍎 scroll top initial", m.scrollTop)
    this.fixScroll();
  }

  fixScroll() {
    let m = document.getElementById('mesc');
    setTimeout(() => {
      m.scrollTop = m.scrollHeight;
      console.log("🍏 scroll top reset", m.scrollTop)
    });
  }

  removeMessage() {
    this.counter--;
    this.messages.pop();
  }

  resetMessage() {
    this.counter = 0;
    this.messages = ["hello_cote", "messages_here"];
  }


  ngOnInit() {
  }

}
