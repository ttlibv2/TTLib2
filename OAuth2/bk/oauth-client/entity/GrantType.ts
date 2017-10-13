export class GrantType {

    /**
	 * Authorisation code. Client authentication required only for
	 * confidential clients.
	 */
    static AUTHORIZATION_CODE: GrantType = new GrantType('authorization_code', ['code', 'redirect_uri']);

    /**
	 * Implicit. Client authentication is not performed (except for signed
	 * OpenID Connect authentication requests).
	 */
    static IMPLICIT: GrantType = new GrantType('implicit', []);

    /**
	 * Refresh token. Client authentication required only for confidential
	 * clients.
	 */
    static REFRESH_TOKEN: GrantType = new GrantType('refresh_token', ['refresh_token']);

    /**
	 * Password. Client authentication required only for confidential
	 * clients.
	 */
    static PASSWORD: GrantType = new GrantType('password', ['username', 'password']);

    /**
	 * Client credentials. Client authentication is required.
	 */
    static CLIENT_CREDENTIALS: GrantType = new GrantType('client_credentials', []);

    /**
	 * JWT bearer, as defined in RFC 7523. Explicit client authentication
	 * is optional.
	 */
    static JWT_BEARER: GrantType = new GrantType('urn:ietf:params:oauth:grant-type:jwt-bearer', ['assertion']);

    /**
	 * SAML 2.0 bearer, as defined in RFC 7522. Explicit client
	 * authentication is optional.
	 */
    static SAML2_BEARER: GrantType = new GrantType('urn:ietf:params:oauth:grant-type:saml2-bearer', ['assertion']);

    private grantName: string;
    private params: Map<string, any>;
    private requestParams: string[];

    private constructor(grantName: string, requestParams:string[]){
        this.grantName = grantName;
        this.params = new Map();
        this.requestParams = requestParams || [];
    }

    build(): {[param: string]: string}
    {
        let params = {grant_type: this.grantName};
        this.requestParams.forEach(p => { });
        return params;
    }

}