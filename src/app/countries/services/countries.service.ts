//Servicio parar hacer peticiones a la API
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of ,map , catchError } from 'rxjs';
import { Country } from '../interfaces/country';


@Injectable({ providedIn: 'root' })
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) {}

  //Observable es un tipo de dato que nos permite estar pendientes de los cambios que sucedan en el objeto
  searchCapital(term: string): Observable<Country[]> {
    //construccion de la peticion http
    // constante con la url de la API y el termino de busqueda
    const url = `${this.apiUrl}/capital/${term}`;
    return this.http.get<Country[]>(url).pipe(catchError(() => of([])));
  }

  searchCountry(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${term}`;
    return this.http.get<Country[]>(url).pipe(catchError(() => of([])));
  }

  searchRegion(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${term}`;
    return this.http.get<Country[]>(url).pipe(catchError(() => of([])));
  }

  searchCountryByAlphaCode(code: string): Observable<Country | null> {
    const url = `${this.apiUrl}/alpha/${code}`;
    return this.http.get<Country[]>(url).pipe(
      //map tranforma la informacion
      map(countries => countries.length > 0 ? countries [0]: null),
      catchError(() => of(null)));
  }
}
