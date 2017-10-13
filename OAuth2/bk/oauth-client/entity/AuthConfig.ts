export abstract class AuthConfig {
	
	
    grantType: { name: string, data?: { [key: string]: any } };

    /** 
     * The scopes to request
     */
    scope: string[] = [];

    /**
     * developer key to use: example => google is apiKey
     */
    developer_key?: string;

    constructor(public endPoint: EndPointURI) { }

    /**
     * This functions adds a scope to be requested as part of the OAuth2.0 flow.
     * Will append any scopes not previously requested to the scope parameter.
     * A single string will be treated as a scope to request. An array of strings will each be appended.
     * @param {string|array} scope e.g. "profile+email"
     */
    addScope(scope: string | string[]) {
        this.scope = this.scope || [];

        if (typeof scope == 'string') {
            let ss = scope.split('+');
            this.addScope(ss);
        }
        else if (Array.isArray(scope)) {
            scope.forEach(s => {
                this.scope.filter(ss => {
                    if (s !== ss) this.scope.push(s)
                });
            })
        }
    }

    /**
     * Generates URL Authorization Request
     * @param {object=} options Options.
     * @return {string} URL to consent page.
     */
    abstract generateAuthUrl(options?: {}): string;

    /**
    * Generates URL Token Request
    * @param {object=} options Options.
    * @return {string} URL to consent page.
    */
    abstract generateTokenUrl(options?: {}): string;

}

export interface EndPointURI {
    auth?: string;
    token?: string;
    revoke?: string;
}
