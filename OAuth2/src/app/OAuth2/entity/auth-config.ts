import { OAuthEndpoint } from "./interface";
import { AuthRequest } from "./request/auth";
import { TokenRequest } from "./request/token";

export abstract class AuthConfig
{
	constructor(private endpoint: OAuthEndpoint){}

	abstract createAuthRequest(): AuthRequest;

	abstract createTokenRequest(): TokenRequest;
	
	/**
	 * Returns auth url endpoint
	 */
	getAuthUrl(): string
	{
		return this.endpoint.auth_uri;
	}
	
	/**
	 * Returns token url endpoint
	 */
	getTokenUrl():string
	{
		return this.endpoint.token_uri;
	}
	
	/**
	 * Returns revoke token url endpoint
	 */
	getRevokeTokenUrl():string
	{
		return this.endpoint.revoke_uri;
	}	
}