import { Component, inject, input, SimpleChanges } from '@angular/core';
import { WeatherServiceService } from '../../weather-service.service';

import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Location, Weather } from '../../../utils/interfaces';
import countries from '../../../utils/data';

@Component({
  selector: 'app-weather-card',
  imports: [CommonModule],
  templateUrl: './weather-card.component.html',
  styleUrl: './weather-card.component.css'
})
export class WeatherCardComponent {
  SelectedCountry  = input<string | null>("")

  WeatherService = inject(WeatherServiceService)
  weather : Observable<Weather>  = {} as Observable<Weather>;

  CountryName :Location = {} as Location

  CountryNames : string[] = countries

  ngOnInit(){
    this.weather = this.WeatherService.fetchWeather(this.SelectedCountry()) ?? {} as Observable<Weather>;
    this.WeatherService.getCountryName(this.SelectedCountry())
    ?.subscribe(
      (data)=> {
        this.CountryName = data
      });
  }

  ngOnChanges(changes:SimpleChanges){
    if(changes['SelectedCountry']){
      let searchInput = changes['SelectedCountry'].currentValue
      if(!searchInput){
        searchInput = 'tunis'
      }
      this.weather = this.WeatherService.fetchWeather(searchInput) ?? {} as Observable<Weather> ;
      this.WeatherService.getCountryName(searchInput)?.subscribe((data)=> this.CountryName = data);
    }
  }

}
