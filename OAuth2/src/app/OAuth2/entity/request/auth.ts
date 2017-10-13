import { ParamRequest } from "./param";

export class AuthRequest extends ParamRequest 
{
    private clientId: string;
    private responseType: string;
    private redirectUri: string;
    private state: string;
    private scope: string;

    constructor(clientId: string) 
    {
        super();
        this.clientId = clientId;
    }

    /**
     * The client ID for your application. 
     * @var client_id The client ID for your application. 
     */
    setClientID(client_id: string)
    {
        this.clientId = client_id;
    }

    /**
     * The possible values are: 
     * + id_token => to retrieve an ID Token
     * + token => to retrieve an Access Token
     * + code => to retrieve an Authorization Code (access_type=offline)
     * @var response_type The client ID for your application. 
     */
    setResponseType(response_type: string)
    {
        this.responseType = response_type;
    }

    /**
     * Determines where the API server redirects the user after the user completes the authorization flow.
     * @var redirect_uri 
     */
    setRedirectUri(redirect_uri: string)
    {
        this.redirectUri = redirect_uri;
    }

    /**
     * The scopes to request 
     * @var scope The scopes to request 
     */
    setScope(scope: string)
    {
        this.scope = scope;
    }

    /**
     * Specifies any string value that your application
     * @var state 
     */
    setState(state: string)
    {
        this.state = state;
    }

    /**
     * Convert To JSON Structure
     * @return object
     */
    public convertToJson(): object {
        let obj = super.convertToJson();
        obj['client_id'] = this.clientId;
        obj['response_type'] = this.responseType;
        obj['redirect_uri'] = this.redirectUri;
        obj['scope'] = this.scope;
        obj['state'] = this.state;
        return obj;
    }

}