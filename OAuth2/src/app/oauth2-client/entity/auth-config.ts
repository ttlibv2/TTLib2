import { TokenRequest } from "../http/request/token";
import { AuthRequest } from "../http/request/auth";
import { OAuthEndpoint } from "./interface/endpoint";
import { GrantType } from "./grant-type";

export abstract class AuthConfig {

    constructor(private endpoint: OAuthEndpoint) { }

    /**
    * Returns auth url endpoint
    */
    getAuthUrl(): string {
        return this.endpoint.auth_uri;
    }

	/**
	 * Returns token url endpoint
	 */
    getTokenUrl(): string {
        return this.endpoint.token_uri;
    }

	/**
	 * Returns revoke token url endpoint
	 */
    getRevokeTokenUrl(): string {
        return this.endpoint.revoke_uri;
    }

    /**
     * General Authorization Request
     * @return {AuthRequest}
     */
    abstract generalAuthRequest(): AuthRequest;

    /**
	 * General Token Request
     * @var {GrantType=} type 
	 */
    abstract generalTokenRequest(grantType: GrantType): TokenRequest;
}