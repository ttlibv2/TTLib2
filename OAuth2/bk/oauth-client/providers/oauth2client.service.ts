@Injectable()
export class OAuthClient
{
	constructor(private http: AuthHttp){}
	
	/**
	 * Sset auth config option
	 */
	setAuthConfig(config: AuthConfig);
	
	/**
	 * Generate a URL to request access from OAuth 2.0 server
	 * @param {object=} options Options.
	 * @return {string} URL to consent page.
	 */
	createAuthUrl(options?: {[p:string]: any}):string;
	
	/**
	 * Fetch Access Token By Code (grant_type=authorization_code)
	 * expiry_date = new Date().getTime() + expires_in * 1000
	 */
	fetchAuthToken(code?:string)
	{
		let tokenUri = this.config.getTokenUrl();
		let p = 
		{
			code: code || this.token.code,
			client_id: this.config.client_id,
			client_secret: this.config.client_secret,
			redirect_uri: this.config.redirect_uri,
			grant_type: 'authorization_code'
		};
		
		this.http.post(tokenUri, Utils.queryParam(p));
	}
	
	/**
	 * Fetch Access Token By Code (grant_type=authorization_code)
	 * expiry_date = new Date().getTime() + expires_in * 1000
	 */
	fetchJWToken();
	
	/**
	 * Refresh Access Token (grant_type=refresh_token)
	 * @param {string} token Existing refresh token.
	 */
	refreshToken(token?: string);
	
	/**
	 * Revokes the access given to token.
	 * @param {string} token The existing token to be revoked.
	 */
	revokeToken(token?: string);
	
	/**
     * Verify id token is token by checking the certs and audience
     * @param {string} token ID Token.
     */
	verifyIdToken(token?:string);
}