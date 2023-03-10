import { ErrorHandler, NgModule } from '@angular/core';
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
import { FilterPipe } from './services/FilterPipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { TableComponent } from './table/table.component';
import { ChartComponent } from './chart/chart.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CoinInfoComponent } from './coin-info/coin-info.component';
import { MarketComponent } from './market/market.component';
import { NgChartsModule } from 'ng2-charts';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { GlobalErrorHandler } from './services/global-error-handler-component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ExchangeComponent } from './exchange/exchange.component';
@NgModule({
  declarations: [
    AppComponent,
    TrackingTabComponent,
    MainComponent,
    CoinsReviewComponent,
    FilterPipe,
    TableComponent,
    ChartComponent,
    CoinInfoComponent,
    MarketComponent,
    ExchangeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
    MatDialogModule,
    NgChartsModule,
    MatTableModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }