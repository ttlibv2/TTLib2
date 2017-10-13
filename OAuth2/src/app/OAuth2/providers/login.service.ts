import { OAuth2Service } from "./oauth2.service";
import { Injectable } from "@angular/core";
import { LoginConfig } from "../entity/config/login-config";
import { OAuthUtils } from "../utils/utils";
import { TokenResponse } from "../entity/token-response";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { ContentType } from "../entity/interface";
import { TokenRequest } from "../entity/request/token";

@Injectable()
export class OAuth2Login extends OAuth2Service {

    /**
     * Login config
     */
    protected config: LoginConfig;

    /**
     * Constructor
     * @param {HttpClient} http 
     */
    constructor(http: HttpClient) {
        super(http);
    }

    /**
    * Generate a URL to request access from OAuth 2.0 server
    * @return {string} URL to consent page.
    */
    createAuthUrl(): string {
        let req = this.config.createAuthRequest();
        let authUrl = this.config.getAuthUrl();
        return `${authUrl}?${req.convertToQuery()}`;
    }

    /**
	 * Fetch Access Token By Code (grant_type=authorization_code)
	 * expiry_date = new Date().getTime() + expires_in * 1000
     * @var {string} options.code The Auth Code
	 * @var {TokenResponse}
	 */
    fetchAccessToken(options?: { auth_code?: string }): Observable<TokenResponse> {
        let req = this.config.createTokenRequest();
        req.setGrantType('authorization_code');
        req.setParam('code', options.auth_code);
        return this.executeGetToken(req, false);
    }

    refreshToken(token: string = null): Observable<TokenResponse> {
        if (token == null && this.token) {
            token = this.token.refreshToken;
        }

        if (token == null) {
            Observable.throw("Refresh Token NULL");
        }

        // body request for form-urlencoded
        let req = this.config.createTokenRequest();
        req.setGrantType('refresh_token');
        req.setParam('refresh_token', token);
        return this.executeGetToken(req, true);
    }

    revokeToken(token?: string) {
        throw new Error("Method not implemented.");
    }

    verifyToken(token?: string) {
        throw new Error("Method not implemented.");
    }

    private executeGetToken(req: TokenRequest, update: boolean): Observable<TokenResponse>
    {
        // check token URL
        let tokenUrl = this.config.getTokenUrl();
        if (tokenUrl == null) {
            Observable.throw('Token URL EndPoint is Required.');
        }

        // execute
        let h = new HttpHeaders({ 'Content-Type': ContentType.FORM_URL_ENCODED });
        let body = req.convertToQuery();
        return this.http.post<TokenResponse>(tokenUrl, body, { headers: h })
            .map(data => { return TokenResponse.parse(data); });
    }

}