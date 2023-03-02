import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LandingComponent } from './componentes/landing/landing.component';

import { NavComponent } from './componentes/nav/nav.component';
import { UserComponent } from './componentes/nav/user/user.component';
import { FoldersComponent } from './componentes/nav/folders/folders.component';
import { EditComponent } from './componentes/edit/edit.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LoginComponent } from './componentes/landing/login/login.component';
import { RegisterComponent } from './componentes/landing/register/register.component';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    NavComponent,
    UserComponent,
    FoldersComponent,
    EditComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
