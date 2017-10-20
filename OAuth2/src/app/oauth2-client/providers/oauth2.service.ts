import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TokenRequest } from "../http/request/token";
import { AuthConfig } from "../entity/auth-config";
import { AuthRequest } from "../http/request/auth";
import { GrantType } from "../entity/grant-type";
import { ContentType } from "../utils/const";
import { Observable } from "rxjs";
import { TokenResponse } from "../http/response/token";
import 'rxjs/add/operator/map';

@Injectable()
export abstract class OAuth2Client {

    /** Config for oauth2 */
    protected config: AuthConfig;

    constructor(protected client: HttpClient) { }

    /**
     * Create Auth Request
     */
    abstract createAuthRequest(): AuthRequest;

    /**
     * Create Token Request
     * @var {GrantType} grant
     * @var {[key: string]: any} data
     */
    abstract createTokenRequest(grant: GrantType, data?: { [key: string]: any }): TokenRequest;

    /**
     * Fetch Access Token
     * @var {TokenRequest} req
     */
    fetchAccessToken(req: TokenRequest): Observable<TokenResponse> {
        let url = req.getTokenUrl();
        let body = req.queryUrl();
        let headers = this.defaultHeaders();

        return this.executeToken(req);
    }

    /**
     * Refresh Access Token by refresh_token
     * @var {TokenRequest} req
     */
    abstract refreshToken(req: TokenRequest);

    /**
     * Revoke Token for access_token or refresh_token
     * @var {string} token access_token or refresh_token
     */
    abstract revokeToken(token: string);

    /**
     * Verify token
     * @var {string} token access_token or refresh_token
     */
    abstract verifyToken(token: string);


    /**
     * Set Auth Config for oauth client
     * @var {AuthConfig} config
     */
    setAuthConfig(config: AuthConfig) {
        this.config = config;
    }

    defaultHeaders(): HttpHeaders {
        let headers: HttpHeaders = new HttpHeaders();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return headers;
    }

    protected executeToken(req: TokenRequest): Observable<TokenResponse> {
        let url = req.getTokenUrl();
        let body = req.queryUrl();
        let headers = this.defaultHeaders();
        return this.client.post(url, body, { headers: headers })
            .map(data => { return null });
    }

}