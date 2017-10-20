import { AuthConfig } from "../auth-config";
import { AuthRequest } from "../../http/request/auth";
import { GrantType } from "../grant-type";
import { OAuthEndpoint } from "../interface/endpoint";
import { TokenRequest } from "../../http/request/token";

export class LoginConfig extends AuthConfig {

    /**
    * The client ID for your application. 
    */
    client_id: string;

    /** 
     * The client secret 
     */
    client_secret: string;

    /**
     * Determines where the API server redirects the user after the user completes the authorization flow.
     * Note that the http or https scheme, case, and trailing slash ('/') must all match.
     */
    redirect_uri: string;

    /** 
     * A list of space-delimited response type. Defaults to 'code'. 
     * The possible values are: 
     * + id_token => to retrieve an ID Token
     * + token => to retrieve an Access Token
     * + code => to retrieve an Authorization Code (access_type=offline)
     */
    response_type: string = 'code';

    /**  
	 * The scopes to request 
	 */
    scope: string[] = [];

    /** 
     * Indicates whether your application can refresh access tokens when the user is not present at the browser. 
     * Valid parameter values are online, which is the default value, and offline. 
     */
    access_type?: 'online' | 'offline' = 'offline';

    /**
     * Specifies any string value that your application uses to maintain state between your authorization request and the authorization server's response. 
     * The server returns the exact value that you send as a name=value pair in the hash (#) fragment of the redirect_uri after the user consents to or denies your application's access request.
     */
    state?: string = null;

    /**
     * Enables applications to use incremental authorization to request access to additional scopes in context. 
     * If you set this parameter's value to true and the authorization request is granted, then the new access token will also cover any scopes to which the user previously granted the application access. 
     */
    include_granted_scopes?: boolean = true;

    /**
     * A space-delimited, case-sensitive list of prompts to present the user. 
     * If you don't specify this parameter, the user will be prompted only the first time your app requests access. 
     * Possible values are:
     * + none => Do not display any authentication or consent screens. Must not be specified with other values.
     * + consent =>	Prompt the user for consent.
     * + select_account	=> Prompt the user to select an account.
     */
    prompt?: string = 'consent';

    /**
     * `Use when prompt=select_account`
     * 
     * If your application knows which user is trying to authenticate, 
     * it can use this parameter to provide a hint to the Google Authentication Server. 
     * The server uses the hint to simplify the login flow either by prefilling the email field in the sign-in form or by selecting the appropriate multi-login session.
     * 
     * Set the parameter value to an email address or sub identifier.
     */
    login_hint?: string;

    constructor(endpoint: OAuthEndpoint, options: {}) {
        super(endpoint);
        Object.assign(this, options);
    }

    /**
	 * General Authorization Request
	 */
    generalAuthRequest(): AuthRequest {
        let req = new AuthRequest(this.getAuthUrl());
        req.setClientID(this.client_id);
        req.setRedirectUri(this.redirect_uri);
        req.setResponseType(this.response_type);
        req.setScope(this.scope.join('+'));
        req.setParam('access_type', this.access_type);
        req.setParam('include_granted_scopes', '' + this.include_granted_scopes);
        req.setParam('prompt', this.prompt);

        if (this.state !== null) req.setState(this.state);
        if (this.prompt == 'select_account') {
            req.setParam('login_hint', this.login_hint);
        }

        return req;
    }

    /**
     * General Token Request
     * @var {GrantType} type
     */
    generalTokenRequest(grantType: GrantType): TokenRequest {
        let req = new TokenRequest(this.getTokenUrl(), grantType);

        // set client_id + client_secret
        if (grantType.isRequiresClientID()) {
            req.setParam('client_id', this.client_id);
            req.setParam('client_secret', this.client_secret);
        }

        // set param option for grant type
        switch (grantType) {
            case GrantType.AUTH_CODE:
                req.setParam('redirect_uri', this.redirect_uri);
                break;
        }

        return req;
    }

}