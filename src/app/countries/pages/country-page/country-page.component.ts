import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [],
})
export class CountryPageComponent implements OnInit {
  public country?: Country;

  //Inyectar servicio ActivatedRoute
  constructor(
    private activatedRoute: ActivatedRoute,
    private countriesService: CountriesService,
    private router: Router
  ) {}
  //implementar interfaz ngOnInit
  ngOnInit(): void {
    //Observable dentro de observable
    this.activatedRoute.params
      //switchMap: permite recibir un observable params y regresar otro observable
      .pipe(
        switchMap(({ id }) =>
          this.countriesService.searchCountryByAlphaCode(id)
        )
      )
      .subscribe((country) => {
        //Si no exite el pais buscado, redireccionaa la pagina principal
        if (!country) {
          return this.router.navigateByUrl('');
        }
        return (this.country = country);
      });
  }
}
