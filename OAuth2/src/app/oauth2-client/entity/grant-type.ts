export class GrantType {

    /**
     * Authorisation code. Client authentication required only for confidential clients.
     * @var grant_type - use `authorization_code`
     * @var code - the authorization code returned by some of the endpoints
     * @var redirect_uri - the URI provided when you asked for a Poken API client
     */
    static AUTH_CODE = new GrantType('authorization_code', ['code', 'redirect_uri'], true);

    /**
     * Refresh token. Client authentication required only for confidential clients
     * @var grant_type - use `refresh_token`
     * @var refresh_token - the refresh_token which was issued at the same time as the access token
     */
    static TOKEN = new GrantType('refresh_token', ['refresh_token']);

    /**
     * Client credentials. Client authentication is required.
     * @var grant_type - use `client_credentials`
     */
    static CLIENT = new GrantType('client_credentials', [], true);

    /**
     * @var grant_type - use the value `password`
     * @var username - the account username for which you want to obtain an access token
     * @var password - the account password
     */
    static PASSWORD = new GrantType('password', ['username', 'password']);

    /**
     * Implicit. Client authentication is not performed (except for signed OpenID Connect authentication requests).
     * @var grant_type - use the value `implicit`
     */
    static IMPLICIT = new GrantType('implicit', [], true);

    /**
     * JWT bearer, as defined in RFC 7523. Explicit client authentication is optional.
     * @var grant_type - use the value `urn:ietf:params:oauth:grant-type:jwt-bearer`
     */
    static JWT_BEARER = new GrantType('urn:ietf:params:oauth:grant-type:jwt-bearer', ['assertion']);

    /**
     * JWT bearer, as defined in RFC 7522. Explicit client authentication is optional.
     * @var grant_type - use the value `urn:ietf:params:oauth:grant-type:saml2-bearer`
     */
    static SAML2_BEARER = new GrantType('urn:ietf:params:oauth:grant-type:saml2-bearer', ['assertion']);

    //-------------------------------------------------------------------
    // PROPERTIES FOR CLASS
    //-------------------------------------------------------------------

    protected grantName: string;
    protected requiresParams: string[];
    protected requiresClientID: boolean;

    /**
     * Constructor
     * @var grantName The grant type name. Example: grant_type=authorization_code
     * @var params The Param Required for grant_type
     */
    constructor(grantName: string, params: string[], requiresClientID: boolean = false) {
        this.grantName = grantName;
        this.requiresParams = params;
        this.requiresClientID = requiresClientID;
    }

    /**
     * Get grant_type name
     * @return The name grant_type. Example: authorization_code
     */
    getName(): string { return this.grantName; }

    /**
     * Get List Param Required
     * @return string[]
     */
    getParamRequired(): string[] { return this.requiresParams || []; }

    /**
     * Gets the client identifier requirement.
     * @returns boolean required client_id
     */
    isRequiresClientID(): boolean { return this.requiresClientID; }

    /**
     * Check Param Required in options. Error if
     * @param params
     */
    checkValueRequired(params: { [key: string]: any }) {
        let log = '';

        // check is client_id
        if (this.isRequiresClientID()) {
            if (params['client_id'] == null) log = `${log}, client_id`;
            if (params['client_secret'] == null) log = `${log}, client_secret`;
        }

        // check param required
        this.getParamRequired().forEach(p => {
            if (params[p] == null) {
                log = `${log}, ${p}`;
            }
        });

        if (log.startsWith(',')) log = log.substring(1, log.length);
        if (log.length > 0) throw new Error(`The '${log}' must not be empty.`)
    }
}
