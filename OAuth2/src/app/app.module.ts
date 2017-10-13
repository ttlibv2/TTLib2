import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { OAuth2Login } from './OAuth2/providers/login.service';
import { HttpClientModule } from '@angular/common/http';

const routing:Routes = [];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routing),
    HttpClientModule
  ],
  providers: [OAuth2Login],
  bootstrap: [AppComponent]
})
export class AppModule { }
