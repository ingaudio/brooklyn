import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, URLSearchParams, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ApiService } from '../provider/api.service';
import { SocialService } from '../provider/social.service';


@Injectable()
export class EventService {

    private query = new BehaviorSubject<any>(null);
    private result = new BehaviorSubject<any>(null);
    
    constructor(private http: Http, private apiService: ApiService, private socialService: SocialService) { }

    /* DATA */
    
    public getQuery(): any {
        return this.query.value;
    }
    
    public getQueryAsObservable(): Observable<any> {
        return this.query.asObservable();    
    }
    
    public getResult(): any {
        return this.result.value;   
    }
    
    public getResultAsObservable(): Observable<any> {
        return this.result.asObservable();    
    }
    
    public setCity(city: string): void {
        let query = this.getQuery() || {};
        query['city'] = [city];
        this.query.next(query);
    }
    
    public getWhereQuery(): string {
        let query = this.getQuery() || {};
        if(query['place'] && query['place'].length == 1) return query['place'][0];
        if(query['city'] && query['city'].length == 1) return query['city'][0];
        return null;     
    }
    
    public resetWhereQuery(): void {
        let query = this.getQuery() || {};
        if(query['place'] && query['place'].length == 1) {
           delete query['place'];
        }
        else if(query['city'] && query['city'].length == 1) {
            delete query['city'];
        }
        this.query.next(query);
    }
    
    public resetFilter(key: string): void {
        let query = this.getQuery() || {};
        if(query[key]) {
            delete query[key];    
        }
        this.query.next(query);
        //Do Query
        this.doSearch();
    }
    
    /* Action */
    
    public saveEvent(event: any): Observable<any> {
        return this.apiService.post('event/save', event);
    }
    
    public doSearch(): void {
        //Query
        let query = this.getQuery() || {};
        query['page'] = [ 0 ];
            
        this.apiService.post('event', query).subscribe(
            data => {
                //Notify Result
                this.result.next(data);
                
                //Social Ranks
                if(data.events) {
                    let eventIds = data.events.map(item => { return item.id; });
                    this.socialService.getRanks(eventIds);
                }
                
            },
            error => {
                console.error("error [doSearch]: " + error);
                this.result.next(null);
            }
        );            
    }
    
    public doSearchNextPage(page: number): Observable<any> {
        return new Observable(observer => {
            
            //Prepare Query
            let query = this.getQuery() || {};
            query['page'] = [ page];
            
            //Do Search
            this.apiService.post('event', query).subscribe(
                data => {
                    if(data && data.events && data.events.length > 0) {
                        observer.next(data.events);
                        observer.complete();
                        let eventIds = data.events.map(item => { return item.id; });
                        this.socialService.getRanks(eventIds);
                        
                    } else {
                        observer.next(null);
                    }
                },
                error => { observer.error(error); }
            );
        
        });
    }

    public doFilterSwitch(key: string, value: string) {
        
        //Get Query
        let query = this.getQuery() || {};
        
        //Update Filter
       if(!query[key])  { query[key] = new Array<string>(); }
        
        if(query[key].indexOf(value) == -1) {
            query[key].push(value);        
        } else {
            query[key].splice(query[key].indexOf(value),1);
            if(query[key].length == 0) delete query[key];
        }
        
        //Fire New Query
        this.query.next(query)
        
        //Do Query
        this.doSearch();
    }
    
    public isFilterActive(key: string, value: string): boolean {
        let query = this.getQuery() || {};
        return query[key] && query[key].indexOf(value) != -1;        
    }
    
    
}