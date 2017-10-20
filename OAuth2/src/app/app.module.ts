import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { OAuth2Login } from './oauth2-client/providers/login.service';
import { OAuth2Client } from './oauth2-client/providers/oauth2.service';

const routing: Routes = [];

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
