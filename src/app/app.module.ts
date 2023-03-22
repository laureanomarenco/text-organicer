import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { LandingComponent } from './componentes/landing/landing.component';
import { HomeComponent } from './componentes/home/home.component';
import { EditComponent } from './componentes/home/edit/edit.component';
import { NavComponent } from './componentes/home/nav/nav.component';
import { UserComponent } from './componentes/home/nav/user/user.component';
import { FoldersComponent } from './componentes/home/nav/folders/folders.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LoginComponent } from './componentes/landing/login/login.component';
import { RegisterComponent } from './componentes/landing/register/register.component';
import {HttpClientModule} from "@angular/common/http";
import {CompartidasComponent} from "./componentes/home/nav/compartidas/compartidas.component";
import { PublicComponent } from './componentes/public/public.component';
import { PublicNavComponent } from './componentes/public/public-nav/public-nav.component';
import { PublicTextComponent } from './componentes/public/public-text/public-text.component';
import { NgImageSliderModule } from 'ng-image-slider';
import {AppRoutingModule} from "./app-routing.module";
import { AutoresizeDirective } from './directivas/autoresize.directive';



@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    HomeComponent,
    EditComponent,
    NavComponent,
    UserComponent,
    FoldersComponent,
    LoginComponent,
    RegisterComponent,
    CompartidasComponent,
    PublicComponent,
    PublicNavComponent,
    PublicTextComponent,
    AutoresizeDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgImageSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
