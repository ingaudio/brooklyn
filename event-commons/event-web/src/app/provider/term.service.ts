import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, URLSearchParams, Headers } from '@angular/http';

import { ApiService } from '../provider/api.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class TermService {

    private url: string = 'http://127.0.0.1:8080/rest/term';

    constructor(private http: Http, private apiService: ApiService) { }

    public getTerms(term: string): Observable<any> {
        return this.apiService.get('term/facet/' + term);
    }

    public getPlace(place: string): Observable<any> {
        return this.apiService.get('term/geo',{
            'place': place    
        });
    }
    
    public getAddress(address: string): Observable<any> {
        return this.apiService.get('term/geo',{
            'address': address    
        });
    }

}