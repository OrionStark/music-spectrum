import { Component, OnInit, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
declare var p5: any;

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css']
})
export class MusicComponent implements OnInit {
  play: any;
  private isplaying: boolean = false;
  constructor(public el: ElementRef) {
   }
  ngOnInit() {
    var myMusic = function (myMusic) {
      var music;
      var fft;
      var canvas;
      var widthParent = document.getElementById("body").offsetWidth;
      var heightParent = document.getElementById("body").offsetHeight;
      myMusic.preload = function () {
        music = myMusic.loadSound("../../assets/music/01-royal_blood-how_did_we_get_so_dark.mp3");
      };
      myMusic.setup = function () {
        canvas = myMusic.createCanvas(widthParent - 50, heightParent - 10);
        if (!this.isplaying) {
          music.loop();
        }
        fft = new p5.FFT();
        music.amp(1);
      };
      myMusic.windowResized = () => {
        myMusic.resizeCanvas(widthParent - 50, heightParent - 10);
      };
      myMusic.draw = function () {
        var r = 160;
        var rad = 70;
        var waveform = fft.waveform();
        myMusic.background(255);
        //background(0);
        myMusic.strokeWeight(2);
        myMusic.stroke(226, 91, 78);
        myMusic.translate(myMusic.width/2, myMusic.height/2);
        myMusic.ellipse(0, 0, 2 * rad, 2 * rad);
        myMusic.stroke(0, 54, 74);
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
            myMusic.stroke(226, 91, 78);
            myMusic.strokeWeight(5);
            myMusic.point(x2, y2);
            myMusic.pop();
        }
        myMusic.endShape();
      }
    }
    this.play = new p5(myMusic, "body");
  }

  ngOnDestroy() {
    this.isplaying = true;
  }
}
