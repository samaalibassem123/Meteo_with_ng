import { Component, inject, input, SimpleChanges } from '@angular/core';
import { WeatherServiceService } from '../../weather-service.service';

import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Location, Weather } from '../../../utils/interfaces';

@Component({
  selector: 'app-weather-card',
  imports: [CommonModule],
  templateUrl: './weather-card.component.html',
  styleUrl: './weather-card.component.css'
})
export class WeatherCardComponent {
  country  = input<string | null>("")

  WeatherService = inject(WeatherServiceService)
  weather : Observable<Weather>  = {} as Observable<Weather>;

  CountryName :Location = {} as Location

  ngOnInit(){
    this.weather = this.WeatherService.fetchWeather(this.country()) ?? {} as Observable<Weather> ;
    this.WeatherService.getCountryName(this.country())
    ?.subscribe(
      (data)=> {
        this.CountryName = data
      });
  }

  ngOnChanges(changes:SimpleChanges){
    if(changes['country']){
      const searchInput = changes['country'].currentValue
      this.weather = this.WeatherService.fetchWeather(searchInput) ?? {} as Observable<Weather> ;
      this.WeatherService.getCountryName(searchInput)?.subscribe((data)=> this.CountryName = data);

    }
  }

}
