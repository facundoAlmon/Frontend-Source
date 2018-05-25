import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { 
   EspserviceService 
} from './espservice.service';  

import { 
   Device 
} from './_models/Device';  
import { AppMaterialModule } from './app-material/app-material.module';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpModule,
    ChartsModule,
    AppMaterialModule
  ],
  providers: [EspserviceService,
              Device
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
