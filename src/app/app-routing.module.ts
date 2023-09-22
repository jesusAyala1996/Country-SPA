// modulo para la navegacion de la aplicacion

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { AboutPageComponent } from './shared/pages/about-page/about-page.component';
import { ContactPageComponent } from './shared/pages/contact-page/contact-page.component';

//Rutas de angular Router
const routes: Routes = [
  /*{
    //ruta para mostrar el homePage
    path: '',
    component: HomePageComponent,
  },*/
  {
    path: 'about',
    component: AboutPageComponent,
  },

  {
    path: 'contact',
    component: ContactPageComponent,
  },

  //ruta para cargar el modulo de paises
  {
    path: 'countries',
    loadChildren: () => import("./countries/countries.module").then(m => m.CountriesModule)
  },

  {
    //comodin cuando no se tenga ruta definida en router redireccion al home
    path: '**',
    redirectTo: 'countries',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],

  exports: [
    RouterModule
  ],
})
export class AppRoutingModule {}
