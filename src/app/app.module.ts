import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ClimaService } from './services/clima.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { eventEmitter } from './services/eventEmitter.service';
import { HeaderComponent } from './component/header/header.component';
import { ConteinerComponent } from './component/conteiner/conteiner.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ConteinerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    ClimaService, 
    eventEmitter,
    Navigator],
  bootstrap: [AppComponent]
})

export class AppModule { }
