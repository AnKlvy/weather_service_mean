// weather.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getWeatherData(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getWeatherData`);
  }

  addWeatherData(latitude: number, longitude: number, note: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/addWeather`, { latitude, longitude, note });
  }

  updateNote(index: number, note: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/updateNote/${index}`, { note });
  }

  deleteWeatherData(index: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deleteWeather/${index}`);
  }
  searchWeatherData(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/search?q=${query}`);
  }
}
