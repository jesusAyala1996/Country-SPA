import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [],
})
export class ByRegionPageComponent {
  //Array de paises
  public countries: Country[] = [];
  //inyectar servicio en el contructor
  constructor(private countriesService: CountriesService) {}

  //Metodod para buscar por region
  searchByRegion(region: string): void {
    this.countriesService.searchRegion(region).subscribe((countries) => {
      this.countries = countries;
    });
  }
}
