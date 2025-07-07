import { Component, inject } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { Toolbar } from 'primeng/toolbar';

import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';

import { WeatherCardComponent } from './components/weather-card/weather-card.component';
import { WeatherServiceService } from './weather-service.service';
import {
  AutoCompleteCompleteEvent,
  AutoCompleteModule,
} from 'primeng/autocomplete';

@Component({
  selector: 'app-root',
  imports: [
    AutoCompleteModule,
    WeatherCardComponent,
    FormsModule,
    DatePipe,
    Toolbar,
    InputIcon,
    IconField,
    InputTextModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  CurrentDate = new Date();
  weatherService = inject(WeatherServiceService);
  selectedCountry: string = 'tunis';
  filteredCountries: string[] = [] as string[];

  filterCountry(event: AutoCompleteCompleteEvent) {
    let filtred: string[] = [] as string[];
    const name = event.query;
    this.weatherService.getCountriesName(name)?.subscribe((res) => {
      if (res?.results) {
        res.results.forEach((loc) => {
          const text = loc.name + ',' + loc.country;
          filtred.push(text);
        });
        this.filteredCountries = filtred;
      }
    });
  }
}
