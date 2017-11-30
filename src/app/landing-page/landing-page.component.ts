import { Component, OnInit } from '@angular/core';
import * as mojs from 'mo-js';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.moJSAnimation();
  }

  private moJSAnimation(): void {
    var circle1 = new mojs.Shape({
      shape: 'circle',
      radius: { 0 : 210 },
      fill: 'none',
      duration: 1000,
      delay: 3000,
      repeat: 999,
      stroke: 'white',
      opacity: { 1 : 0 }
    }).play();
    var circle2 = new mojs.Shape({
      shape: 'circle',
      radius: { 0 : 200 },
      fill: 'none',
      duration: 1000,
      delay: 3080,
      repeat: 999,
      stroke: 'white',
      opacity: { 1 : 0 }
    }).play();
    var burst = new mojs.Burst({
      radius: { 0 : 100 },
      count: 20,
      children : {
        shape: 'cross',
        stroke: 'white',
        strokeWidth: { 6: 0},
        angle: { 360: 0},
        radius: { 30 : 5 },
        duration: 3000,
        repeat: 999
      }
    }).play();
    var burstDot = new mojs.Burst({
      radius: { 0 : 100 },
      count: 10,
      children: {
        stroke: 'yellow',
        strokeWidth: { 6 : 0 },
        duration: 3000,
        repeat: 999
      }
    }).play();
    var burstRect = new mojs.Burst({
      radius: { 0 : 150 },
      count: 20,
      children: {
        shape: 'rect',
        fill: 'none',
        stroke: 'white',
        strokeWidth: { 6 : 0 },
        duration: 3000,
        repeat: 999
      }
    }).play();
  }

}
