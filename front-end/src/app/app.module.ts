import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { DetailsComponent } from './components/details/details.component';
import { CartComponent } from './components/cart/cart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import { FormComponent } from './core/forms/form/form.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BootstrapModule } from './ng-bootstrap/bootstrap/bootstrap.module';
import { MenagerComponent } from './components/menager/menager.component';
import { LoginComponent } from './components/login/login.component';
import { FormRegisterComponent } from './core/forms/form-register/form-register.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailsComponent,
    CartComponent,
    FormComponent,
    MenagerComponent,
    LoginComponent,
    FormRegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    NgbModule,
    BootstrapModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
