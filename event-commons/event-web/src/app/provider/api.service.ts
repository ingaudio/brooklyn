import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, URLSearchParams, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class ApiService {

    private url: string = 'http://127.0.0.1:8080/rest';
    
    constructor(private http: Http) { }

    public get(endpoint: string, params?: any, options?: RequestOptions): Observable<any> {
        if (!options) {
            options = new RequestOptions({ withCredentials: true });
        }
        if (params) {
            let p = new URLSearchParams();
            for (let k in params) {
                p.set(k, params[k]);
            }
            options.search = p;
        }
        return this.http.get(this.url + '/' + endpoint, options).map(res => {
                if(res.text() === "") return {};
                else return res.json();
            })
            .catch(error => {
                console.log("error [apiService.get]: " + error);
                return Observable.throw(error);
            });
    }
    
    public post(endpoint: string, body: any): Observable<any> {
        let options = {
            withCredentials: true,
            headers: new Headers({ 'Content-Type': 'application/json' })
        };
        return this.http.post(this.url + '/' + endpoint, body, options)
            .map(res => {
                if(res.text() === "") return {};
                else return res.json();    
            })
            .catch(error => {
                return Observable.throw(error);
            });
    }

    

}