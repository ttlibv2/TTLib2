import { Injectable } from "@angular/core";
import { Http, Request, Response, Jsonp, RequestOptionsArgs } from "@angular/http";
import { Observable } from "rxjs/Observable";


@Injectable()
export class AuthHttpClient 
{
    constructor(private http: Http, private jsonp: Jsonp){}

    /**
     * Use jsonp 
     * @param url 
     */
    callback(url: string, options?: RequestOptionsArgs): Observable<Response>
    {
        url = `${url}&callback=JSONP_CALLBACK`;
        return this.jsonp.request(url, options);
    }

    post(url: string, body: any) : Observable<Response>
    {
        console.log(body);
        return this.http.post(url, body);
    }

}