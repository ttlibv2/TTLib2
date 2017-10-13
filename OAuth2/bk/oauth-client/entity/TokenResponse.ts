import { ErrorResponse } from "./interface";

export class TokenResponse {

    /** access_token: The Access Token granted. */
    private accessToken: string;

    /** id_token: The ID Token granted. */
    private idToken: string;

    /** refresh_token: */
    private refreshToken: string;

    /** token_type: */
    private tokenType: string;

    /** expires_in: The number of seconds until the Access Token expires. */
    private expiresIn: number;

    /** expires_at: The timestamp at which the Access Token will expire. */
    private expiresAt: number;

    /** first_issued_at: The timestamp at which the user first granted the scopes requested */
    private firstIssuedAt: number;

    /** scope: The scopes granted in the Access Token. */
    private scope: string;

    private params: { [key: string]: any } = {};

    private error: ErrorResponse = null;

    updateToken(params: {}) {
        this.firstIssuedAt = new Date().getTime() / 1000;
        this.accessToken = params['access_token'];
        this.tokenType = params['token_type'];
        this.expiresIn = params['expires_in'];
        this.idToken = params['id_token'];
        this.refreshToken = params['refresh_token'];
    }

    hasTokenExpires(): boolean {
        return this.expiresIn - (new Date().getTime() / 1000) + this.firstIssuedAt > 0;
    }




}
