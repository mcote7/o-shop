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
    console.log("💙 scroll TOP_1", m.scrollTop)
    this.fixScroll();

    // let m = document.getElementById('mesc');
    
    // let atBottom = m.scrollHeight - m.scrollTop === m.offsetHeight;

    // console.log("🧡 inner hieght", m.offsetHeight) // true inner height //
    // console.log("🧡 client hieght", m.clientHeight)
    // console.log("💙 scroll TOP_1", m.scrollTop)
    // console.log("💙 scroll HEIGHT_1", m.scrollHeight)
    
    // setTimeout(() => {
    //   m.scrollTop = m.scrollHeight;
      
    //   console.log("💚 scroll TOP_2", m.scrollTop)
    //   // console.log("💜", atBottom)
    //   // console.log("💚 scroll HEIGHT_2", m.scrollHeight)
    // });
    
    // m.scrollTop = m.scrollHeight;
    
    // console.log("💚 scroll TOP_2",m.scrollTop)
    // console.log("💚 scroll HEIGHT_2",m.scrollHeight)
  }

  fixScroll() {
    let m = document.getElementById('mesc');
    setTimeout(() => {
      m.scrollTop = m.scrollHeight;
      console.log("💚 scroll TOP", m.scrollTop)
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
