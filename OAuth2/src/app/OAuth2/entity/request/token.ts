import { ParamRequest } from "./param";

export class TokenRequest extends ParamRequest
{
    private grantType: string;
    
    constructor(grantType: string) 
    {
        super();
        this.grantType = grantType;
    }
    
    /**
     * Set Grant Type
     * @param grant_type 
     */
    public setGrantType(grant_type: string)
    {
        this.grantType = grant_type;
    }

    /**
     * Convert To JSON Structure
     * @return object
     */
    public convertToJson(): object 
    {
        let obj = super.convertToJson();
        obj['grant_type'] = this.grantType;
        return obj;
    }

    
}