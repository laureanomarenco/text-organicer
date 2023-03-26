import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {LandingComponent} from "./componentes/landing/landing.component";
import {HomeComponent} from "./componentes/home/home.component";
import {PublicComponent} from "./componentes/public/public.component";

const routes: Routes = [
  {path: 'landing', component: LandingComponent},
  {path: 'home', component: HomeComponent},
  {path: 'publicfolder/:id', component: PublicComponent},
  {path: '', pathMatch: 'full', redirectTo: 'landing'},
  {path: '**', redirectTo: 'landing'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
