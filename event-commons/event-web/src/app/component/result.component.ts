import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { EventService } from '../provider/event.service';
import {LoaderComponent} from '../ui/loader.component';

@Component({
    selector: 'event-result',
    templateUrl: './result.component.html',
    styleUrls: ['./result.component.css']
})
export class ResultComponent {

    @ViewChild("scrollList") scrollList: ElementRef;
    
    @ViewChild("loaderResult") loaderResult: LoaderComponent;

    @Input() myPosition: any;
    private events: Array<any>;
    private facets: any;

    private currentPage = 0;
    private scrollPage = 0;
    
    constructor(private eventService: EventService,private cdRef: ChangeDetectorRef) {
        this.eventService.getQueryAsObservable().subscribe(
            data => { 
                if (this.loaderResult) { 
                    this.loaderResult.visible = true;
                    this.loaderResult.error = null;
                }
                this.currentPage = 0;
                this.scrollPage = 0;    
            },
            error => { console.error("fail to [ResultComponent] query: " + error); }
        );
        this.eventService.getResultAsObservable().subscribe(
            data => {
                if (data) {
                    if (this.loaderResult) this.loaderResult.visible = false;

                    //Update
                    this.events = data.events;
                    this.facets = data.facets;
                        
                    //Go to TOP
                    if(this.scrollList) { this.scrollList.nativeElement.scrollTop = 0; }
                }
            },
            error => {
                console.error("fail to [ResultComponent] search: " + error);
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
            this.loaderResult.visible = true;

            //Search
            this.eventService.doSearchNextPage(this.currentPage).subscribe(
                data => {
                    
                    this.loaderResult.visible = false;
                    
                    if(data != null && this.events != null) {
                        //Show more data
                        this.events = this.events.concat(data);
                        
                        //Scroll to limit
                        this.scrollList.nativeElement.scrollTop = limit;
                        
                        //Scrolled Page
                        this.scrollPage++;
                        
                        this.loaderResult.error = null;
                    } else {
                        this.loaderResult.error = "no more events to load :(";                    
                    }
                },
                error => {
                    console.error("fail to load next event page");
                    this.loaderResult.visible = false;
                    this.loaderResult.error = error;
                    this.currentPage = 0;
                    this.scrollPage = 0;    
                    this.events = null;
                }
             );
        } 
    }

    doClickOnFacet(key: string, value: string) {
        this.eventService.doFilterSwitch(key, value);
    }




}
