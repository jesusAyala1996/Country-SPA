import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [],
})
export class ByCapitalPageComponent implements OnInit {
  //inyectar servicio para consumir la API

  public countries: Country[] = [];
  // porpiedad para mostrar el spinner de carga
  public isLoading: boolean = false;
  public initialValue: string = '';

  constructor(private countriesService: CountriesService) {}
  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCapital.countries;
    this.initialValue = this.countriesService.cacheStore.byCapital.term;
  }

  //.suscribe para hacer uso de la emision de datos del servicio
  searchByCapital(term: string): void {
    //is loading  = true, se esta haceidno consulta
    this.isLoading = true;
    this.countriesService.searchCapital(term).subscribe((countries) => {
      this.countries = countries;
      //is loading  = false, se termino la consulta
      this.isLoading = false;
    });
  }
}
