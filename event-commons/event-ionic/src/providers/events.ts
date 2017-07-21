import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Api } from './api';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

/**
 * Most apps have the concept of a User. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This User provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   status: 'success',
 *   user: {
 *     // User fields your app needs, like "id", "name", "email", etc.
 *   }
 * }
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
@Injectable()
export class Events {
 
    //Query
    public query: string;
    public category: Array<any>;
    public tags: Array<any>;
    public time: Array<any>;
    public place: Array<any>;
    public price: Array<any>;
    
    //Result
    public events: Array<any>;
    public count: number;
    public facets: {};
    public geos: Array<any>;
    
    public page = 0;
    
    
    //Selected
    public event: any;
    
    constructor(public http: Http, public api: Api) {
    }

    doSearch() {
        this.page = 0;
        let seq = this.api.post('event', this.buildQuery()).share();
        seq
            .map(res => {
                let json = res.json();
                this.events = json.events;
                this.count = json.count;
                this.facets = json.facets;
                this.geos = json.geoPoints;
            })
            .subscribe(res => {
                console.log("sub");
            }, err => {
                console.error('error [doSearch]', err);
            });
        return seq;
    }
    
    nextPage() {
        //Next Page
        this.page++;
        let seq = this.api.post('event', this.buildQuery()).share();
        seq
            .map(res => {
                let json = res.json();
                this.events = this.events.concat(json.events);
                this.count = json.count;
                this.facets = json.facets;
                this.geos = json.geoPoints;
            })
            .subscribe(res => {
                console.log("sub");
            }, err => {
                console.error('error [nextPage]', err);
            });
        
        return seq;   
    }

    saveEvent() {
        let seq = this.api.post('event/' + this.event.id, this.event).share();
        seq
            .map(res => {
            })
            .subscribe(res => {
                console.log("sub");
            }, err => {
                console.error('error [doSearch]', err);
            });
        
        return seq;
    }
    
    buildQuery() {
        let query = {};
        if(this.query && this.query.trim().length > 0) query['query'] = [ this.query ];
        if(this.category && this.category.length > 0) query['category'] = this.category;
        if(this.tags && this.tags.length > 0) query['tags'] = this.tags;
        if(this.time && this.time.length > 0) query['time'] = this.time;
        if(this.place && this.place.length > 0) query['place'] = this.place;
        if(this.price && this.price.length > 0) query['price'] = this.price;
        if(this.page) query['page'] = [ this.page ];
        console.log("build query: " + query);
        return query;
    }
    
}
