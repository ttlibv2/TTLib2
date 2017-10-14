import { Headers } from '@angular/http';
import { HttpErrorResponse } from "@angular/common/http";

export class TokenResponse {

	/** 
	 * access_token: The Access Token granted. 
	 * */
	accessToken: string;

	/** 
	 * id_token: The ID Token granted. 
	 * */
	idToken: string;

	/** 
	 * refresh_token: 
	 * */
	refreshToken: string;

	/** 
	 * token_type: 
	 * */
	tokenType: string;

	/** 
	 * expires_in: The number of seconds until the Access Token expires. 
	 * */
	expiresIn: number;

	/** 
	 * scope: The scopes granted in the Access Token. 
	 * */
	scope: string[];

	/** 
	 * expires_at: The timestamp at which the Access Token will expire. 
	 * */
	expiresAt: number;
  
  setAccessToken(access_token: string)
  {
    this.accessToken = access_token;
  }
  
  setIdToken(id_token: string)
  {
    this.idToken = id_token;
  }
  
  setRefreshToken(refresh_token: string)
  {
    this.refreshToken = refresh_token;
  }
  
  setRefreshToken(refresh_token: string)
  {
    this.refreshToken = refresh_token;
  }
  
  setRefreshToken(refresh_token: string)
  {
    this.refreshToken = refresh_token;
  }
  
   setRefreshToken(refresh_token: string)
  {
    this.refreshToken = refresh_token;
  }

	/**
	 * Parse json structure => token 
	 */
	static parse(json: { [key: string]: any }): TokenResponse {
		let token = new TokenResponse();
		token.expiresAt = new Date().getTime() * 1000;
		token.accessToken = json['access_token'];
		token.expiresIn = json['expires_in'];
		token.tokenType = json['token_type'];
		token.scope = json['scope'];
		token.refreshToken = json['refresh_token'] || null;
		token.idToken = json['id_token'] || null;
		return token;
	}
}
