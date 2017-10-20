import { HttpClient } from "@angular/common/http";
import { OAuth2Client } from "./oauth2.service";
import { TokenRequest } from "../http/request/token";
import { LoginConfig } from "../entity/config/login-config";
import { AuthRequest } from "../http/request/auth";
import { GrantType } from "../entity/grant-type";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { TokenResponse } from "../http/response/token";
import { Injectable } from "@angular/core";

@Injectable()
export class OAuth2Login extends OAuth2Client {

    /** Login config  */
    protected config: LoginConfig;

    /**  Auth Code */
    private auth_code: string;

    /** Refresh Token */
    private refresh_token: string;

    constructor(private http: HttpClient) {
        super(http);
    }

    /**
     * Set Authorization Code
    * @var code 
    */
    setAuthCode(code: string) {
        this.auth_code = code;
    }

    /**
     * Set Refresh Token
     * @var token
     */
    setRefreshToken(token: string) {
        this.refresh_token = token;
    }

    /**
     * Create Authorization Request
     * @return {AuthRequest}
     */
    createAuthRequest(): AuthRequest {
        return this.config.generalAuthRequest();
    }

    /**
     * Create Token Request
     * @var {[key: string]: any} values
     * @return {TokenRequest}
     */
    createTokenRequest(grant: GrantType, values: {}): TokenRequest {
        let req = this.config.generalTokenRequest(grant);
        req.setParams(values);
        return req;
    }

    // /**
    //  * Fetch Access Token By AUTH_CODE
    //  * @var {TokenRequest=} req The token request
    //  */
    // fetchAccessToken(req?: TokenRequest): Observable<TokenResponse> {
    //     return this.executeToken(req);
    // }

    refreshToken(req: TokenRequest) { }

    revokeToken(token: string) { }

    verifyToken(token: string) { }

}