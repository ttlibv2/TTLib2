import { Injectable } from "@angular/core";
import { AuthConfig } from "../entity/AuthConfig";
import { PopupService } from "./popup.service";
import { Observable, Observer } from 'rxjs';
import { TokenResponse } from "../entity/TokenResponse";
import { Utils } from "../utils/Utils";
import { Http, Jsonp, Headers } from "@angular/http";
import { ErrorResponse } from "../entity/interface";
import { AuthHttpClient } from "./AuthHttpClient.service";
import { GRANT_TYPE } from "../entity/const";
import { LoginConfig } from "../entity/config/LoginConfig";

@Injectable()
export class OAuth2Service {
	private config: AuthConfig;
	private token: TokenResponse;

	constructor(private http: AuthHttpClient) { }

	/**
	 * Set the auth config
	 * @param {AuthConfig} config 
	 */
	setAuthConfig(config: AuthConfig) {
		this.config = config;
	}

	/**
	 * Set the developer key to use, these are obtained through the API Console.
	 * @see http://code.google.com/apis/console-help/#generatingdevkeys
	 * @param {string} key 
	 */
	setDeveloperKey(key: string) {
		this.config.developer_key = key;
	}

	/**
	 * Create a URL to obtain user authorization.
	 * The authorization endpoint allows the user to first authenticate, and then grant/deny the access request.
	 * @param {string|array} scope The scope is expressed as an array or list of space-delimited strings.
	 * @return {string} auth url
	 */
	createAuthUrl(scope?: string | string[]): string {
		this.config.addScope(scope);
		return this.config.generateAuthUrl();
	}

	fetchAuthToken(){}

	/**
	 * Revoke an OAuth2 access token or refresh token. 
	 * This method will revoke the current access token, if a token isn't provided.
	 * @param {string} token The token (access token or a refresh token) that should be revoked.
	 * @return {Observable<boolean>} Returns True if the revocation was successful, otherwise False.
	 */
	revokeToken(token?: string) {
		return null;
	}

	/**
	 * Verify an id_token. This method will verify the current id_token, if one isn't provided.
	 * @param token 
	 */
	verifyIdToken(token: string) {return null;}



	getAccessToken(): string { return null; }
}