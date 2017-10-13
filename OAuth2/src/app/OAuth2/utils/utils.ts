import * as qs from 'querystring';
import { HttpHeaders } from '@angular/common/http';
import { ContentType } from '../entity/interface';

export abstract class OAuthUtils
{
    static queryParam(p: {[key: string]: any}){
        return qs.stringify(p, "&");
    }

    static applyHeader(header: HttpHeaders, opts?: {contentType: string})
    {
        header.set('Content-Type', ContentType[opts.contentType]);
    }
}