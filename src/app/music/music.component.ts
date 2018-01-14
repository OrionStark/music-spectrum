import { Component, OnInit, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
declare var p5: any;
import * as mojs from 'mo-js';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css']
})
export class MusicComponent implements OnInit {
  public nowMusic:String = "";
  private play:any;
  constructor(public el: ElementRef) {
   }
  
  ngAfterViewInit() {
    var musicN = "";
    this.nowMusic = musicN;
    var myMusic = function (myMusic) {
      var music = null;
      var fft;
      var myPeak;
      var canvas;
      var widthParent = document.getElementById("body").clientWidth;
      var heightParent = document.getElementById("body").clientHeight;
      var myshape;
      var _playpauseButton_;
      var _stopButton_;
      var music_buffer_list = [];
      var musics = [
        new Array("Zed", "../../assets/music/01 Addicted to a Memory (feat. Bahar.m4a", "Addicted to a Memory"),
        new Array("Selena Gomez", "../../assets/music/02 I Want You to Know (feat. Selena.m4a", "I Want you to know"),
        new Array("Zed", "../../assets/music/04 Transmission (feat. Logic & X Amb.m4a", "Transmission"),
        new Array("Zed", "../../assets/music/19 Alive.m4a", "Alive"),
        new Array("Selena Gomez", "../../assets/music/Selena Gomez - My Dilemma 2.0.mp3", "My Dilemma")
      ];


      var player_init = function () {
        var _artist_name = document.getElementById('artist_name');
        var _music_name = document.getElementById('music_name');
        if( document.readyState ) {
          _playpauseButton_ = document.getElementById('play_pause');
          _stopButton_ = document.getElementById('stop');
          var _buttonCollections = {
            button1: document.getElementById('1'),
            button2: document.getElementById('2'),
            button3: document.getElementById('3'),
            button4: document.getElementById('4'),
            button5: document.getElementById('5')
          };
          _buttonCollections.button1.addEventListener('click', function() {
            if (music.isPlaying()) {
              _playpauseButton_.innerText = "Pause";
              music.stop();
              music = music_buffer_list[0];
              _artist_name.innerText = musics[0][0];
              _music_name.innerText = musics[0][2];
              music.play();
            } else {
              _playpauseButton_.innerText = "Pause";
              music = music_buffer_list[0];
              _artist_name.innerText = musics[0][0];
              _music_name.innerText = musics[0][2];
              music.play();
            }
          });
          _buttonCollections.button2.addEventListener('click', function() {
            if (music.isPlaying()) {
              _playpauseButton_.innerText = "Pause";
              music.stop();
              music = music_buffer_list[1];
              _artist_name.innerText = musics[1][0];
              _music_name.innerText = musics[1][2];
              music.play();
            } else {
              _playpauseButton_.innerText = "Pause";
              music = music_buffer_list[1];
              _artist_name.innerText = musics[1][0];
              _music_name.innerText = musics[1][2];
              music.play();
            }
          });
          _buttonCollections.button3.addEventListener('click', function() {
            if (music.isPlaying()) {
              _playpauseButton_.innerText = "Pause";
              music.stop();
              music = music_buffer_list[2];
              _artist_name.innerText = musics[2][0];
              _music_name.innerText = musics[2][2];
              music.play();
            } else {
              _playpauseButton_.innerText = "Pause";
              music = music_buffer_list[2];
              _artist_name.innerText = musics[2][0];
              _music_name.innerText = musics[2][2];
              music.play();
            }
          });
          _buttonCollections.button4.addEventListener('click', function() {
            if (music.isPlaying()) {
              _playpauseButton_.innerText = "Pause";
              music.stop();
              music = music_buffer_list[3];
              _artist_name.innerText = musics[3][0];
              _music_name.innerText = musics[3][2];
              music.play();
            } else {
              _playpauseButton_.innerText = "Pause";
              music = music_buffer_list[3];
              _artist_name.innerText = musics[3][0];
              _music_name.innerText = musics[3][2];
              music.play();
            }
          });
          _buttonCollections.button5.addEventListener('click', function() {
            if (music.isPlaying()) {
              _playpauseButton_.innerText = "Pause";
              music.stop();
              music = music_buffer_list[4];
              _artist_name.innerText = musics[4][0];
              _music_name.innerText = musics[4][2];
              music.play();
            } else {
              _playpauseButton_.innerText = "Pause";
              music = music_buffer_list[4];
              _artist_name.innerText = musics[4][0];
              _music_name.innerText = musics[4][2];
              music.play();
            }
          });

          _playpauseButton_.addEventListener('click', function() {
            if (music.isPlaying()) {
              this.innerText = "Play"
              music.pause();
            } else {
              this.innerText = "Pause"
              music.loop();
            }
          });
  
          _stopButton_.addEventListener('click', function() {
            if (music.isPlaying()) {
              music.stop();
              _playpauseButton_.innerText = "Play";
            } else {
              //
            }
          });
        }
      }


      myMusic.preload = function () {
        for (var i = 0; i < musics.length; i++) {
          music_buffer_list.push(myMusic.loadSound(musics[i][1]));
        }
        music = music_buffer_list[0];
        musicN = musics[0][0];
      };

      myMusic.setup = function () {
        player_init();
        canvas = myMusic.createCanvas(widthParent - 30,heightParent);
        fft = new p5.FFT();
        music.amp(1);
        myPeak = new p5.PeakDetect();
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

    this.play = new p5(myMusic, "body", true);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.play = null;
  }
}
