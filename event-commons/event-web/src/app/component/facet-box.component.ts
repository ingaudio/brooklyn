import { ViewChild, Component, OnInit, OnChanges, Input, ChangeDetectorRef } from '@angular/core';
import { EventService } from '../provider/event.service';

import { FacetComponent } from './facet.component';

@Component({
  selector: 'event-facet-box',
  templateUrl: './facet-box.component.html',
  styleUrls: ['./facet-box.component.css']
})
export class FacetBoxComponent {
    
    @ViewChild("") facetComponent: FacetComponent;
    
    @Input() title: string;
    
    @Input() icon: string;
    
    /* Number of list columns */
    @Input() colSize = "100%";
    
    /* Max Allowed Size (no more than) */
    @Input() maxAllowedSize = 10;
    
    /* Limited Size (limit to) */
    @Input() maxLimitedSize = 3;
    
    /* Is option open */
    @Input() isOpen = true;
    
    @Input() key: string;
    
    public selected: Array<string>;
    private facets: any;
    private isLimited = true;
    private currentSize = this.maxLimitedSize;
    
    constructor(private eventService: EventService, private cdRef: ChangeDetectorRef) {
        this.eventService.getQueryAsObservable().subscribe(
            data =>{
                if(data && data[this.key]) {
                    this.selected = data[this.key];
                } else {
                    this.selected = new Array<string>();    
                }
                this.updateSize();
            },
            error => {
                console.error("fail to [FacetBoxComponent] search: " + error); 
            }
         );
        this.eventService.getResultAsObservable().subscribe(
            data =>{
                if(data) {
                    this.facets = data.facets;
                    
                }   
                this.updateSize(); 
            },
            error => {
                console.error("fail to [FacetBoxComponent] search: " + error); 
            }
         );
    }
    
//    ngAfterViewInit() {
//        this.updateSize();
//    }
    
    ngOnInit() {
        this.updateSize();
    }
    
    public canMore(): boolean {
        return this.isLimited && this.currentSize < Math.min(this.maxAllowedSize, this.facets[this.key].length);
    }
    
    public canLess(): boolean {
        return !this.isLimited && this.currentSize > Math.min(this.maxLimitedSize, this.facets[this.key].length);
    }
    
    public changeLimit(): void {
        this.isLimited = !this.isLimited;
        this.updateSize();   
    }
    
    public getSize(): number {
        if(this.facets && this.key && this.facets[this.key]) { 
            return this.facets[this.key].length;
        } else {
            return 0;
        }
    }
    
    public resetFacet(): void {
        console.log("reset facet");
        this.eventService.resetFilter(this.key);   
    }
    
    public updateSize(): void {
        console.log("update size");
            if(this.isLimited) {
                let count = (this.selected ? this.selected.length : 0);
                this.currentSize = Math.max(count, Math.min(this.maxLimitedSize, this.maxAllowedSize));    
            } else if(this.facets && this.facets[this.key]) {
                this.currentSize = Math.min(this.facets[this.key].length, this.maxAllowedSize);
            }
    }
    
}
