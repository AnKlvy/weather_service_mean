import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { WeatherComponent } from './components/weather/weather.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppRoutingModule, //Добавление AppRoutingModule для роутов
    HttpClientModule, // Добавление HttpClientModule в список импортируемых модулей
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
