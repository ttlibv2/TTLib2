import { Injectable } from "@angular/core";
import { AuthConfig } from "../entity/auth-config";
import { AuthHttp } from "./auth-http.service";
import { TokenResponse } from "../entity/token-response";
import { Observable } from "rxjs";

@Injectable()
export class OAuth2Client
{
	private config: AuthConfig;
	private token: TokenResponse;

	constructor(private http: AuthHttp){}
	
	/**
	 * Sset auth config option
	 */
	setAuthConfig(config: AuthConfig)
	{
		this.config = config;
	}
	
	/**
	 * Generate a URL to request access from OAuth 2.0 server
	 * @param {object=} options Options.
	 * @return {string} URL to consent page.
	 */
	createAuthUrl(options?: {[p:string]: any}):string
	{
		return null;
	}
	
	/**
	 * Fetch Access Token By Code (grant_type=authorization_code)
	 * expiry_date = new Date().getTime() + expires_in * 1000
	 * @return {Observable<TokenResponse>}
	 */
	fetchAuthToken(code?:string)
	{
		let tokenUri = this.config.getTokenUrl();
		let body = {code: code || this.token.code};

		// copy token params to body
		Object.assign(body, this.config.tokenParams(), {grant_type:'authorization_code'});
		
		// execute
		this.http.post(tokenUri, body).map(res => {
			let body = res.json() || {};
			

		});
	}
	
	/**
	 * Fetch Access Token By Code (grant_type=authorization_code)
	 * expiry_date = new Date().getTime() + expires_in * 1000
	 */
	fetchJWToken()
	{

	}
	
	/**
	 * Refresh Access Token (grant_type=refresh_token)
	 * @param {string} token Existing refresh token.
	 */
	refreshToken(token?: string)
	{

	}
	
	/**
	 * Revokes the access given to token.
	 * @param {string} token The existing token to be revoked.
	 */
	revokeToken(token?: string)
	{
		
	}
	
	/**
     * Verify id token is token by checking the certs and audience
     * @param {string} token ID Token.
     */
	verifyIdToken(token?:string)
	{

	}
}