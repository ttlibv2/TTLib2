import { OAuthUtils } from "../../utils/utils";

export abstract class ParamRequest
{
    private params: Map<string, any> = new Map();

    /**
     * Set Param to authorization request
     * @param param 
     * @param value 
     */
    public setParam(param: string, value: any)
    {
        this.params.set(param, value);
    }

    /**
     * Convert To Query URL
     * @return string
     */
    public convertToQuery(): string 
    { 
        let json = this.convertToJson();
        return OAuthUtils.queryParam(json);
    }

    /**
     * Convert To JSON Structure
     * @return object
     */
    public convertToJson(): object
    {
        let obj = {};
        this.params.forEach((value, key) => {obj[key] = value;});
        return obj;
    }
}