import { Component, OnInit, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
declare var p5: any;
import * as mojs from 'mo-js';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css']
})
export class MusicComponent implements OnInit {
  private myanotherShape: any;
  play: any;
  constructor(public el: ElementRef) {
    this.createMyShape();
   }
  ngOnInit() {
    var myMusic = function (myMusic) {
      var music;
      var fft;
      var myPeak;
      var canvas;
      var widthParent = document.getElementById("body").clientWidth;
      var heightParent = document.getElementById("body").clientHeight;
      var myshape
      myMusic.preload = function () {
        music = myMusic.loadSound("../../assets/music/01 Addicted to a Memory (feat. Bahar.m4a");
      };

      myMusic.setup = function () {
        canvas = myMusic.createCanvas(widthParent - 30,heightParent);
        fft = new p5.FFT();
        music.amp(1);
        myPeak = new p5.PeakDetect();
        music.loop();
        myshape = new mojs.Burst(
          {
            radius: { 0 : 150 },
            count: 20,
            children: {
              shape: 'rect',
              fill: 'none',
              stroke: 'rgb(227, 239, 0)',
              angle: { 360: 0},
              strokeWidth: { 6 : 0 },
              duration: 1000
            }
          }
        );
      };

      myMusic.windowResized = () => {
        myMusic.resizeCanvas(widthParent - 30,heightParent);
      };

      myMusic.draw = function () {
        fft.analyze();
        myMusic.clear();
        myMusic.noFill();
        var r = 160;
        var rad = 70;
        var waveform = fft.waveform();
        myPeak.update(fft);
        myMusic.strokeWeight(2);
        myMusic.stroke(255, 255, 255);
        myMusic.translate(myMusic.width/2, myMusic.height/2);

        if (myPeak.isDetected) {
          rad += 20;
          myMusic.stroke(227, 239, 0);
          myshape.play();
        }

        myMusic.ellipse(0, 0, 2 * rad, 2 * rad);
        for(var i = 0; i < waveform.length; i += 3){
          var x = r * myMusic.cos(i * 2 * myMusic.PI / waveform.length);
          var y = r * myMusic.sin(i * 2 * myMusic.PI / waveform.length);
          var x2 = (r + waveform[i] * 80) * myMusic.cos(i * 2 * myMusic.PI / waveform.length);
          var y2 = (r + waveform[i] * 80) * myMusic.sin(i * 2 * myMusic.PI / waveform.length);
          myMusic.line(x, y, x2, y2);
          myMusic.point(x, y);
        }

        myMusic.beginShape();
        for(var i = 0; i < waveform.length; i += 30){
            var x2 = (r + waveform[i] * 100) * myMusic.cos(i * 2 * myMusic.PI / waveform.length);
            var y2 = (r + waveform[i] * 100) * myMusic.sin(i * 2 * myMusic.PI / waveform.length);
            myMusic.push();
            myMusic.stroke(26, 71, 163);
            myMusic.strokeWeight(5);
            myMusic.point(x2, y2);
            myMusic.pop();
        }
        myMusic.endShape();
      }
    }

    // make an object
    this.play = new p5(myMusic, "body");
  }

  createMyShape(){
    
  }
}
