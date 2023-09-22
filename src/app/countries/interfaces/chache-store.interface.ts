import { Country } from './country';
import { Region } from './region.type';

//interfaz para CacheStore
export interface CacheStore {
  byCapital: TermCountries;
  byCountry: TermCountries;
  byRegion: regionCountries;
}

//solo para bycountry y bycapital
//interfaz para los terminos de busqueda y los paises que produjo el termino de busqueda
export interface TermCountries {
  term: string;
  countries: Country[];
}

//interfaz especial para las regiones
export interface regionCountries {
  region: Region;
  countries: Country[];
}
