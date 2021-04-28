import { Component, OnInit } from '@angular/core';
import { popin, toastNotification } from '../../animations/anime';

@Component({
  selector: 'scroll-progress-read',
  templateUrl: './scroll-progress-read.component.html',
  styleUrls: ['./scroll-progress-read.component.scss'],
  animations: [popin, toastNotification]
})
// SCROLL PROGRESS 🍋🍋🍋 
export class ScrollProgressReadComponent implements OnInit {

  public isScrollBar: boolean = false;
  public scrollPos: number = 0;

  constructor() { }

  ngOnInit() {
  }

  scrollTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
  }

  scrollCheck() {
    let scrollSpeed = window.pageYOffset / 6;
    let scrollObject = document.getElementById("scrollObject");
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    this.scrollPos = (winScroll / height) * 100;
    scrollObject.style.transform = `rotate(${scrollSpeed + 30}deg)`;
    this.scrollPos === 0 ? this.isScrollBar = false : this.isScrollBar = true;
  }
}