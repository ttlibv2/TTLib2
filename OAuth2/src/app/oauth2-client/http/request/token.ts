import { ParamOption } from "../option";
import { GrantType } from "../../entity/grant-type";

export class TokenRequest extends ParamOption {

    /** Token URL Endpoint */
    private tokenUrl: string;

    /** @key=grant_type */
    private grantType: GrantType;

    /**
    * The client ID for your application.
    * @var {string} tokenUrl The Token URL Endpoint
    * @var {GrantType} grantType The Grant Type. Default is GrantType.AUTH_CODE
    */
    constructor(tokenUrl: string, grantType: GrantType) {
        super();
        this.setTokenUrl(tokenUrl);
        this.grantType = grantType;
    }

    /**
     * Set Token URL 
     * @var url
     */
    protected setTokenUrl(url: string) {
        if (url == null || url.length == 0) {
            throw new Error('The `url` must not be empty.')
        }
        this.tokenUrl = url;
    }

    /**
     * Build Query Param
     * @throws Error
     * @return body param
     */
    queryParams(): { [param: string]: any } {
        let params = super.queryParams();
        let grant = this.getGrantType();

        // check param required
        grant.checkValueRequired(params);

        // set grant_type
        params['grant_type'] = grant.getName();

        // return data
        return params;
    }

    /**
     * Get Token URL
     * @return tokenUrl => /token
     */
    getTokenUrl(): string {
        return this.tokenUrl;
    }

    /**
     * Get Grant Type
     * @return GrantType
     */
    getGrantType(): GrantType {
        return this.grantType || GrantType.AUTH_CODE;
    }
}