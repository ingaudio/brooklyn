import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EventService } from '../provider/event.service';
import { UserService } from '../provider/user.service';

@Component({
    selector: 'search-page',
    templateUrl: './search.page.html',
    styleUrls: ['./search.page.css']
})
export class SearchPage implements OnInit {

    city: string;
    
    count: number;
    facets: {};
    events: Array<any>;
    geoPoints: Array<any>;

    myPosition: any;
    
    constructor(public eventService: EventService, private userService: UserService, private route: ActivatedRoute) {
        
        //Results
        this.eventService.getResultAsObservable().subscribe(
            data =>{
                if(data) {
                    this.count = data.count;
                    this.facets = data.facets;
                    this.events = data.events;
                    this.geoPoints = data.geoPoints;
                }    
            },
            error => {
                console.error("fail to [AppComponent] search: " + error); 
            }
         );
    }

    ngOnInit() {
        
        //Login with token
        this.userService.loginWithToken().subscribe(data => {}, error => {});
        
        //City
        this.route.params.subscribe(params => {
            //Update City
            this.city = params['city'];
            this.eventService.setCity(this.city);
            //Do initial Query
            this.doQuery();
        });
        
        //Update Current Position
        this.updatePosition();
    }

    onSelectFacet(key: string, value: Array<string>) {
        this.eventService.doFilterSwitch(key,value[0]);
    }
    
    private resetWhereQuery() {
        this.eventService.resetWhereQuery();
        this.doQuery();
    }
    
    private doQuery() {
        this.eventService.doSearch();
    }
    
    private updatePosition() {
        if (window.navigator && window.navigator.geolocation) {
            window.navigator.geolocation.getCurrentPosition((position) => {
                console.log("retrieve position: " + position);
                this.myPosition = position;    
            });            
        } else {
            console.warn("cannot detect user position");
        }
    }

}
