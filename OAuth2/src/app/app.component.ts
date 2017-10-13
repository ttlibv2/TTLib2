import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OAuth2Service } from './OAuth2/providers/oauth2.service';
import { LoginConfig } from './OAuth2/entity/config/login-config';
import { OAuthEndpoint } from './OAuth2/entity/interface';
import { OAuth2Login } from './OAuth2/providers/login.service';


declare var gapi: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  endpoint: OAuthEndpoint = {
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://www.googleapis.com/oauth2/v4/token'
  };

  options = {
    client_id: '273580271790-ud24vcroekerafpi2s64r8plll3vi8r8.apps.googleusercontent.com',
    client_secret: 'lKre1KDS4SYVIxq5ULz8tnf5',
    redirect_uri: 'http://localhost:4200',
    response_type: 'code',
    scope: ['profile'],
    //prompt: 'select_account',
  //  login_hint: 'sinhvienit890@gmail.com'
  };

  authUrl: string = '';
  config: LoginConfig;

  constructor(private auth: OAuth2Login, private router: ActivatedRoute) {
    this.config = new LoginConfig(this.endpoint, this.options);
    this.auth.setAuthConfig(this.config);
  }

  click() {
    console.log('click()')
    this.authUrl = this.auth.createAuthUrl();




    sessionStorage.setItem('url', this.authUrl);
    window.open(this.authUrl, '_self');


  }

  fetchToken() {
    console.log('fetchToken()')
    console.log(sessionStorage.getItem('url'));
    this.router.queryParams.subscribe(res => {
      let code = res['code'];
      if (code) {
        console.log('code: ' + code)
        this.auth.fetchAccessToken({auth_code: code}).subscribe(
          data => console.log(data),
          error => {console.log(error)}
        );
      }
    });

  }
}
