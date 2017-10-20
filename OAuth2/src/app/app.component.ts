import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OAuth2Login } from './oauth2-client/providers/login.service';
import { LoginConfig } from './oauth2-client/entity/config/login-config';
import { OAuthEndpoint } from './oauth2-client/entity/interface/endpoint';
import { URL_PROVIDER } from './oauth2-client/utils/url-provider';
import { GrantType } from './oauth2-client/entity/grant-type';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ContentType } from './oauth2-client/utils/const';
import * as qs from 'querystring';

declare var gapi: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  endpoint: OAuthEndpoint = URL_PROVIDER.GOOGLE;
  authConfig = {
    client_id: '273580271790-ud24vcroekerafpi2s64r8plll3vi8r8.apps.googleusercontent.com',
    client_secret: 'lKre1KDS4SYVIxq5ULz8tnf5',
    redirect_uri: 'http://localhost:4200',
    response_type: 'code',
    scope: ['https://www.googleapis.com/auth/spreadsheets.readonly']
  };

  log: any = null;
  error: any = null;

  constructor(private auth: OAuth2Login, private router: ActivatedRoute, private http: HttpClient) {
    let config = new LoginConfig(this.endpoint, this.authConfig);
    this.auth.setAuthConfig(config);
  }

  click() {
    console.log('click() 2');
    //let req = this.auth.createAuthRequest();
    // console.log(req.createAuthUrl())
    //window.open(req.createAuthUrl(), "_self");

    let headers: HttpHeaders = new HttpHeaders();
    headers.set('Content-Type', ContentType.FORM_URLENCODED);
    console.log(headers.get('Content-Type'));


  }

  test() {
    this.router.queryParams.subscribe(p => {
      let code = p['code'];
      console.log("code => " + code);
      if (code) {

        let url = this.endpoint.token_uri;
        let headers = new HttpHeaders({ 'Content-Type': ContentType.FORM_URLENCODED })

        let data = [
          'client_id=' + this.authConfig.client_id,
          'client_secret=' + this.authConfig.client_secret,
          'redirect_uri=' + this.authConfig.redirect_uri,
          'code=' + code,
          'grant_type=authorization_code'
        ].join('&');


        this.http.post(url, data).subscribe(
          data => { this.log = data; },
          error => { this.error = error; }
        );

      }
    });
  }

  fetchToken() {
    console.log('fetchToken()');
    this.router.queryParams.subscribe(p => {
      let code = p['code'];
      console.log("code => " + code);
      if (code) {
        let grant = GrantType.AUTH_CODE;
        let data = { code: code };
        let req = this.auth.createTokenRequest(grant, data);
        this.auth.fetchAccessToken(req)
          .subscribe(
          data => console.log(data.getAccessToken()),
          error => console.log(error)
          );
      }
    });
  }
}
