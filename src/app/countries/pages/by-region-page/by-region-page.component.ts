import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/region.type';



@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [],
})
export class ByRegionPageComponent implements OnInit  {
  //Array de paises
  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialValue: string = '';
  //Array de regiones permitidas
  public regions: Region[] = [
    'africa',
    'americas',
    'asia',
    'europe',
    'oceania',
  ];
  //REgion seleccionada
  public selectedRegion?: Region;

  //inyectar servicio en el contructor
  constructor(private countriesService: CountriesService) {}
  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byRegion.countries;
    this.selectedRegion = this.countriesService.cacheStore.byRegion.region;
  }

  //Metodod para buscar por region
  searchByRegion(region: Region): void {
    this.isLoading = true;
    this.selectedRegion = region;
    this.countriesService.searchRegion(region).subscribe((countries) => {
      this.countries = countries;
      this.isLoading = false;
    });
  }
}
