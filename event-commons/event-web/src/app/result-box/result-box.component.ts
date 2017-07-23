import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { UiLoaderComponent } from '../ui-loader/ui-loader.component';

import { EventService } from '../provider/event.service';


@Component({
    selector: 'result-box',
    templateUrl: './result-box.component.html',
    styleUrls: ['./result-box.component.css']
})
export class ResultBoxComponent implements OnInit {

    @ViewChild("loaderEvents") loaderEvents: UiLoaderComponent;

    @ViewChild("loaderScroll") loaderScroll: UiLoaderComponent;

    @ViewChild("scrollList") scrollList: ElementRef;

    private events: Array<any>;
    private count: number;

    private currentPage = 0;
    private scrollPage = 0;


    constructor(public eventService: EventService) {
        this.eventService.getQueryAsObservable().subscribe(
            data => {
                if (this.loaderEvents) this.loaderEvents.visible = true;
                this.currentPage = 0;
                this.scrollPage = 0;
            },
            error => { console.error("fail to [ResultBoxComponent] query: " + error); }
        );
        this.eventService.getResultAsObservable().subscribe(
            data => {
                if (data && data.events) {
                    //Update Results
                    this.events = data.events;
                    this.count = data.count;
                    
                    //Hide Loader
                    if (this.loaderEvents) this.loaderEvents.visible = false;
                    
                    if (this.scrollList) {  this.scrollList.nativeElement.scrollTop = 0; }
                    
                } else {
                    this.events = new Array<any>();
                }
            },
            error => {
                console.error("fail to [ResultBoxComponent] search: " + error);
            }
        );
    }
    
      ngOnInit() {
      }

    onScroll(event) {
        let limit = event.target.scrollHeight - event.target.clientHeight;
        if (this.currentPage == this.scrollPage && event.target.scrollTop === limit) {

            //Next Page
            this.currentPage++;

            //Loader
            if(this.loaderScroll) this.loaderScroll.visible = true;

            //Search
            this.eventService.doSearchNextPage(this.currentPage).subscribe(
                data => {

                    if(this.loaderScroll) this.loaderScroll.visible = false;

                    if (data != null && this.events != null) {
                        //Show more data
                        this.events = this.events.concat(data);

                        //Scroll to limit
                        this.scrollList.nativeElement.scrollTop = limit;

                        //Scrolled Page
                        this.scrollPage++;
                    }
                },
                error => {
                    console.error("fail to load next event page");
                    this.loaderScroll.visible = false;
                    this.currentPage = 0;
                    this.scrollPage = 0;
                    this.events = null;
                }
            );
        }
    }
    
}
