//Servicio parar hacer peticiones a la API
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, map, catchError, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/chache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    //termino de busqueda y arreglo de paises que produjo el termino de busqueda
    byCapital: { term: '', countries: [] },
    byCountry: { term: '', countries: [] },
    byRegion: { region: '', countries: [] },
  };

  constructor(private http: HttpClient) {
    // lo que se encuentre en el constructor se ejecuta inciar o recargar la app
    //loadFromLocalStorage() siempre se ejecuta al iniciar el servicio
    this.loadFromLocalStorage()
  }
  //metodos para mantener informacion en el local storage
  private saveToLocalStorage() {
    //solo se puede guardar string en el local storage JSON.stringify(this.cacheStore)
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }
  private loadFromLocalStorage() {
    if (localStorage.getItem('cacheStore')) {
      this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
    }
  }

  //metodo para hacer peticiones a la API y retorna un arreglo de paises
  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url).pipe(catchError(() => of([])));
  }

  searchCapital(term: string): Observable<Country[]> {
    //construccion de la peticion http
    // constante con la url de la API y el termino de busqueda
    const url = `${this.apiUrl}/capital/${term}`;
    return this.getCountriesRequest(url).pipe(
      //tap es un operador que permite ejecutar codigo adicional
      tap((countries) => (this.cacheStore.byCapital = { term, countries })),
      tap( () => this.saveToLocalStorage())
    );
  }

  searchCountry(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${term}`;
    return this.getCountriesRequest(url).pipe(
      tap((countries) => (this.cacheStore.byCountry = { term, countries })),
      tap( () => this.saveToLocalStorage())
    );
  }

  searchRegion(region: Region): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${region}`;
    return this.getCountriesRequest(url).pipe(
      tap((countries) => (this.cacheStore.byRegion = { region, countries })),
      tap( () => this.saveToLocalStorage())
    );
  }

  searchCountryByAlphaCode(code: string): Observable<Country | null> {
    const url = `${this.apiUrl}/alpha/${code}`;
    return this.http.get<Country[]>(url).pipe(
      //map tranforma la informacion
      map((countries) => (countries.length > 0 ? countries[0] : null)),
      catchError(() => of(null))
    );
  }
}
