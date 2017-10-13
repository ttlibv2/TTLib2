import { GrantType } from "./GrantType";

export abstract class AuthorizeGrant {

    /**
	 * The authorisation grant type.
	 */
    private type: GrantType;

    /**
	 * Return the parameters for the authorisation grant.
	 * @return The parameters.
	 */
    abstract toParameters(): Map<string, string>;

    /**
     * Parses an authorisation grant from the specified parameters.
     * @param params The parameters. Must not be {@code null}.
     * @return The authorisation grant.
     * @throws ParseException If parsing failed or the grant type is not supported
     */
    static parse(params: Map<string, string>): AuthorizeGrant {
        let grant: string = params.get("grant_type");
        if (grant == null) throw 'Missing "grant_type" parameter';
        return this;
    }
}

export class CodeGrant extends AuthorizeGrant{
    toParameters(): Map<string, string> {
        throw new Error("Method not implemented.");
    }
}

export class TokenGrant extends AuthorizeGrant{
    toParameters(): Map<string, string> {
        throw new Error("Method not implemented.");
    }
}

export class PasswordGrant extends AuthorizeGrant{
    toParameters(): Map<string, string> {
        throw new Error("Method not implemented.");
    }
}

export class ClientGrant extends AuthorizeGrant{
    toParameters(): Map<string, string> {
        throw new Error("Method not implemented.");
    }
}

export class JWTBearerGrant extends AuthorizeGrant{
    toParameters(): Map<string, string> {
        throw new Error("Method not implemented.");
    }
}

export class SAML2BearerGrant extends AuthorizeGrant{
    toParameters(): Map<string, string> {
        throw new Error("Method not implemented.");
    }
}