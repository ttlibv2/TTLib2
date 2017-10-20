import * as qs from 'querystring';

export class ParamOption {
    protected params: Map<string, any> = new Map();

    /**
     * Get Value of Param
     * @param param 
     */
    getParam(param: string): any {
        return this.params.get(param);
    }

    /**
    * Set Param to url request
    * @var param
    * @var value
    */
    setParam(param: string, value: any) {
        this.params.set(param, value);
    }

    /**
    * Set More Param
    * @var {{ [key: string]: any }} params
    */
    setParams(params: { [key: string]: any }) {
        Object.keys(params).forEach(key => {
            this.setParam(key, params[key]);
        });
    }

    /**
     * Build Query Param
     */
    queryParams(): { [param: string]: any } {
        let params = {};
        this.params.forEach((value, key) => {
            if (value !== null) {
                params[key] = value;
            }
        });
        return params;
    }

    /**
     * Get URL Parameters (key1=value1&key2=value2)
     */
    queryUrl(): string {
        return qs.stringify(this.queryParams(), "&");
    }

}