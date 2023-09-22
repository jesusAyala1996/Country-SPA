import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [],
})
export class ByCapitalPageComponent {
  //inyectar servicio para consumir la API

  public countries: Country[] = [];

  constructor(private countriesService: CountriesService) {}

  //.suscribe para hacer uso de la emision de datos del servicio
  searchByCapital(term: string): void {
    this.countriesService.searchCapital(term).subscribe((countries) => {
      this.countries = countries;
    });
  }
}
