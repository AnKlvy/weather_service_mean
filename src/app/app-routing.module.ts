import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherComponent } from './components/weather/weather.component';

const routes: Routes = [
  { path: '', redirectTo: '/weather', pathMatch: 'full' }, // Перенаправление на маршрут "housing" при загрузке приложения
  { path: 'weather', component: WeatherComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
