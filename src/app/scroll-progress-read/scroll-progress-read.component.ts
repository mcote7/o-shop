import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'scroll-progress-read',
  templateUrl: './scroll-progress-read.component.html',
  styleUrls: ['./scroll-progress-read.component.scss']
})
export class ScrollProgressReadComponent implements OnInit {

  public scrollPos: number = 0;

  constructor() { }

  ngOnInit() {
  }

  scrollTop() {
    if(window.pageYOffset === 0) {
      window.scrollTo({
        top: 999999,
        behavior: 'smooth'
      })
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }

  scrollCheck() {
    let scrollSpeed = window.pageYOffset / 6;
    let scrollObject = document.getElementById("scrollObject");
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    this.scrollPos = (winScroll / height) * 100;
    scrollObject.style.transform = `rotate(${scrollSpeed + 30}deg)`;
  }
}