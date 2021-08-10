import { Component, OnInit } from '@angular/core';
import { toastNotification, slideInTop } from '../../../../animations/anime';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.scss'],
  animations: [toastNotification,slideInTop]
})
export class OrderSuccessComponent implements OnInit {

  public clockDone = false;

  constructor() { }

  ngOnInit() {
  }

}
