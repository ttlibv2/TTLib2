import { ParamOption } from "../option";

export class AuthRequest extends ParamOption {
    private authUrl: string;

    /**
     * Constructor
     * @var {string=} authUrl The Authorization Endpoint URL
     */
    constructor(authUrl: string) {
        super();
        this.setAuthUrl(authUrl);
    }

    /**
     * Set Auth URL 
     * @var url
     */
    setAuthUrl(url: string) {
        if (url == null || url.length == 0) {
            throw new Error('The `url` must not be empty.')
        }
        this.authUrl = url;
    }

    /**
     * Get Auth URL Endpoint
     */
    getAuthUrl(): string {
        return this.authUrl;
    }

    /**
     * Create Authorization Url Request
     * @return Authorization Url Request
     */
    createAuthUrl(): string {
        let url = this.getAuthUrl();
        let query = this.queryUrl();
        return `${url}?${query}`;
    }

    /**
    * Set Client ID
    * @var client_id 
    */
    setClientID(client_id: string) {
        this.setParam('client_id', client_id);
    }

    /**
    * The possible values are: 
    * + id_token => to retrieve an ID Token
    * + token => to retrieve an Access Token
    * + code => to retrieve an Authorization Code (access_type=offline)
    * @var {string=} response_type The client ID for your application.
    */
    setResponseType(response_type: string) {
        this.setParam('response_type', response_type);
    }

    /**
     * Determines where the API server redirects the user after the user completes the authorization flow.
     * @var {string=} redirect_uri
     */
    setRedirectUri(redirect_uri: string) {
        this.setParam('redirect_uri', redirect_uri);
    }

    /**
     * The scopes to request 
     * @var {string=} scope The scopes to request
     */
    setScope(scope: string) {
        this.setParam('scope', scope);
    }

    /**
     * Specifies any string value that your application
     * @var {string=} state
     */
    setState(state: string) {
        this.setParam('state', state);
    }
}