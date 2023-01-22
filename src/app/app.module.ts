import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TrackingTabComponent } from './tracking-tab/tracking-tab.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MainComponent } from './main/main.component';
import { CoinsReviewComponent } from './coins-review/coins-review.component';
import { HttpClientModule } from '@angular/common/http';
import { ObjectToArrayPipe } from './objectPipe';


@NgModule({
  declarations: [
    AppComponent,
    TrackingTabComponent,
    MainComponent,
    CoinsReviewComponent,
    ObjectToArrayPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
