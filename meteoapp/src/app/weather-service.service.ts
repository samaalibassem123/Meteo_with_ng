import { inject, Injectable } from '@angular/core';

import { HttpClient} from '@angular/common/http';

import {  Observable, switchMap, throwError } from 'rxjs';
import { Location, Weather } from '../utils/interfaces';

@Injectable({
  providedIn: 'root'
})
export class WeatherServiceService {

  private http = inject(HttpClient);


  getCountriesName (name:string | null):Observable<Location>| undefined{
       return this.http.get<Location>(`https://geocoding-api.open-meteo.com/v1/search?name=${name}&language=en&format=json`)
  }

  getCountryName(name:string | null): Observable<Location> | undefined{
       return this.http.get<Location>(`https://geocoding-api.open-meteo.com/v1/search?name=${name}&language=en&format=json`)
  }


  fetchWeather(name:string | null):Observable<Weather> | undefined{

       return this.http.get<Location>(`https://geocoding-api.open-meteo.com/v1/search?name=${name}&language=en&format=json`)
    .pipe(
      switchMap(res =>{
        if(!res?.results){
          return throwError(()=>new Error("No location found"))
        }
        const location = res.results[0]
        const latitude = location.latitude;
        const longitude = location.longitude;
        return this.http.get<Weather>(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m,rain&timezone=Europe%2FBerlin&forecast_days=1`)
      }
    ))

  }
}
