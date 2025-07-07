import { Component, inject } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { Toolbar } from 'primeng/toolbar';

import { SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CardModule } from 'primeng/card';
import { DataViewModule } from 'primeng/dataview';

import { WeatherCardComponent } from './components/weather-card/weather-card.component';
import { WeatherServiceService } from './weather-service.service';
import countries from '../utils/data';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';


@Component({
  selector: 'app-root',
  imports: [AutoCompleteModule, ReactiveFormsModule,WeatherCardComponent,DataViewModule,CardModule,FormsModule, DatePipe,ButtonModule, SharedModule, Toolbar ,InputIcon, IconField , InputTextModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  CurrentDate = new Date()
  weatherService = inject(WeatherServiceService)
  selectedCountry:string = "tunis"

  CountryNames : string[] = countries

  filteredCountries: string[] = [] as string[];


  filterCountry(event: AutoCompleteCompleteEvent) {
    let filtred:string[]  = []
    const name = event.query
    this.weatherService.getCountryName(name)?.subscribe((res)=>{
      filtred.push(res.results[0].country)
      this.filteredCountries = filtred
    })
  }

}
