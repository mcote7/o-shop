import { Component } from '@angular/core';
import { popin, toastNotification } from 'src/animations/anime';
import * as _ from 'lodash';

// SCROLL PROGRESS 🍋 

@Component({
  selector: 'scroll-progress-read',
  templateUrl: './scroll-progress-read.component.html',
  styleUrls: ['./scroll-progress-read.component.scss'],
  animations: [popin, toastNotification]
})
export class ScrollProgressReadComponent {

  public isScrollBar: boolean = false;
  public scrollPos: number = 0;

  scrollTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  isNaN(nan: any): boolean {
    return Number.isNaN(nan);
  }

  scrollCheck() {
    let scrollSpeed = window.pageYOffset / 6;
    let scrollObject = document.getElementById("scrollObject");
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    this.scrollPos = (winScroll / height) * 100;
    scrollObject.style.transform = `rotate(${scrollSpeed + 30}deg)`;
    this.scrollPos === 0 ? this.isScrollBar = false : this.isScrollBar = true;
    console.log(this.scrollPos)
  }
}
