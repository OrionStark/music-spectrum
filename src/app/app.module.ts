import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  MatIconModule,
          MatTabsModule, 
          MatToolbarModule,
          MatButtonModule,
          MatCardModule,
          MatMenuModule } from '@angular/material';
// Page component
import { AppComponent } from './app.component';
import { MusicComponent } from './music/music.component';

// Routing modals
import { Route } from '@angular/router/src/config';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';

const rout_data: Routes = [
  { path: '', component: MusicComponent, data: { state: 'music', play: 'test' } }
];

@NgModule({
  declarations: [
    AppComponent,
    MusicComponent,
    LandingPageComponent
  ],
  imports: [
    RouterModule.forRoot(
      rout_data
    ),
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatTabsModule,
    MatIconModule,
    MatMenuModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
