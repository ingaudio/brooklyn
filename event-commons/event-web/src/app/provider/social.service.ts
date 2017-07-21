import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, URLSearchParams, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ApiService } from '../provider/api.service';
import { UserService } from '../provider/user.service';


@Injectable()
export class SocialService {

    private rankEvents = new BehaviorSubject<any>(null);

    constructor(private http: Http, private apiService: ApiService, private userService: UserService) { }

    public getRankEvents(): any {
        return this.rankEvents.value;
    }

    public getRankEventsAsObservable(): Observable<any> {
        return this.rankEvents.asObservable();
    }

    public rankEvent(eventId: string, rank: number): void {
        //Logged?
        if (this.userService.getUser() != null) {
            this.apiService.get("social/rank/event/" + eventId, { 'rank': rank }).subscribe(
                data => {
                    this.rankEvents.next([data]);
                    //                    this.userService.updateProfile().subscribe(data => { }, error => { });
                },
                error => {
                    console.error("error [rankEvent]: " + error);
                }
            );
        }
    }

    public getRanks(eventIds: Array<string>): void {
        //Logged?
        if (this.userService.getUser() != null) {
            this.apiService.post("social/rank/events", eventIds).subscribe(
                data => {
                    this.rankEvents.next(data);
                },
                error => {
                    console.error("error [getRanks]: " + error);
                }
            );
        }
    }

}