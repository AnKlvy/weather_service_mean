import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent {
  weatherData: any[] = [];
  newLatitude: number = 0;
  newLongitude: number = 0;
  newNote: string = '';
  searchQuery: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadWeatherData();
  }

  loadWeatherData(): void {
    if (this.searchQuery) {
      this.searchWeather();
    } else {
      this.apiService.getWeatherData().subscribe(data => {
        this.weatherData = data;
      });
    }
  }

  addWeather(): void {
    this.apiService.addWeatherData(this.newLatitude, this.newLongitude, this.newNote).subscribe(() => {
      this.loadWeatherData();
    });
  }

  updateNote(index: number, newNote: string): void {
    this.apiService.updateNote(index, newNote).subscribe(() => {
      this.loadWeatherData();
    });
  }

  deleteWeather(index: number): void {
    this.apiService.deleteWeatherData(index).subscribe(() => {
      this.loadWeatherData();
    });
  }

  searchWeather(): void {
    this.apiService.searchWeatherData(this.searchQuery).subscribe(data => {
      this.weatherData = data;
    });
  }

  getTemperature(temperatures: number[]): number | undefined {
    return temperatures.length > 0 ? temperatures[0] : undefined;
  }
}

