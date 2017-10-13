import { Injectable } from "@angular/core";
import { AuthConfig } from "../entity/auth-config";
import { HttpClient } from "@angular/common/http";
import { TokenResponse } from "../entity/token-response";

@Injectable()
export abstract class OAuth2Service {
    protected config: AuthConfig;
    protected token: TokenResponse;

    constructor(protected http: HttpClient){}
    
    setAuthConfig(config: AuthConfig)
    {
        this.config = config;
    }

    /**
    * Generate a URL to request access from OAuth 2.0 server
    * @param {object=} options Options.
    * @return {string} URL to consent page.
    */
    abstract createAuthUrl(options?: { [p: string]: any }): string;

    /**
	 * Fetch Access Token
	 */
    abstract fetchAccessToken(options?:{});

    /**
	 * Refresh Access Token (grant_type=refresh_token)
	 * @param {string} token Existing refresh token.
	 */
    abstract refreshToken(token?: string);

    /**
	 * Revokes the access given to token.
	 * @param {string} token The existing token to be revoked.
	 */
    abstract revokeToken(token?: string);

    /**
     * Verify token
     * @param {string} token
     */
    abstract verifyToken(token?: string);
}