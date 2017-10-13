import * as qs from 'querystring';

export class Utils {

    static queryParam(obj: object) {
        return qs.stringify(obj, "&");
    }

    static parseQuery(query: string): Map<string, string[]>{ 
        let map = new Map<string, string[]>();
        if(query.length > 0)
        {
            query.split('&').forEach(p => {
                const eqIdx = p.indexOf('=');
                const [key, val]: string[] = eqIdx == -1 ? [p, ''] : [p.slice(0, eqIdx), p.slice(eqIdx + 1)];
                const list = map.get(key) || [];
                list.push(val);
                map.set(key, list);
            });
        }
        return map;
    }

    static stringToToken(url: URL){

    }


}