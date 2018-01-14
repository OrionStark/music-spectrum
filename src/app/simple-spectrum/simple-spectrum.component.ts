import { Component, OnInit, AfterViewInit } from '@angular/core';
declare var p5:any;
@Component({
  selector: 'app-simple-spectrum',
  templateUrl: './simple-spectrum.component.html',
  styleUrls: ['./simple-spectrum.component.css']
})
export class SimpleSpectrumComponent implements OnInit {

  constructor() { }

  ngAfterViewInit() {
    var spectrum = function(myspectrum) {
      var music = null;
      var fft;
      var myPeak;
      var canvas;
      var widthParent = document.getElementById("spectrum").clientWidth;
      var heightParent = document.getElementById("spectrum").clientHeight;
      var play_button;
      var stop_button;

      function toggle() {
        if ( document.readyState ) {
          play_button = document.getElementById("play");
          stop_button = document.getElementById("stop");

          play_button.addEventListener('click', () => {
            if ( music.isPlaying() ) {
              music.pause();
              play_button.innerText = "Play";
            } else {
              music.play();
              play_button.innerText = "Pause";
            }
          });

          stop_button.addEventListener('click', () => {
            if ( music.isPlaying() || music.isPaused() ) {
              music.stop();
              play_button.innerText = "Play";
            } else {
              // Gak tau mau diapai
            }
          });
        }
      }

      myspectrum.preload = function() {
        music = myspectrum.loadSound("../../assets/music/Selena Gomez - My Dilemma 2.0.mp3");
      }
      myspectrum.setup = function() {
        canvas = myspectrum.createCanvas(widthParent - 30, heightParent);
        fft = new p5.FFT();
        music.amp(1);
        toggle();
      }
      myspectrum.draw = function() {
        myspectrum.background(0);
        fft.analyze();
        var wave = fft.waveform();
        myspectrum.translate(widthParent * 0.02, heightParent * 0.25);
        myspectrum.noFill();
          myspectrum.stroke(255, 255, 255);
          myspectrum.strokeWeight(2);
          for ( var i = 0; i < wave.length; i+=5 ) {
            var x = i;
            var y = 80 + wave[x] * 50;
            var x2 = i + 1;
            var y2 = 80 + wave[x2] * 50;
            myspectrum.line(x,y, x2, y2);
          }

          myspectrum.beginShape();
          myspectrum.stroke(255, 202, 40);
          myspectrum.strokeWeight(1);
            for ( var i = 0; i < wave.length; i += 10 ) {
              var x = i + 1;
              var y = 80 + wave[x] * 50;
              myspectrum.vertex(x, y);
            }
          myspectrum.endShape();
      }
    };

    var result = new p5(spectrum, "spectrum");
  }

  ngOnInit() {
  }

}
