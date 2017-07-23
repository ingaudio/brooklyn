import { ViewChild, Component, OnInit, OnChanges, Input, ChangeDetectorRef } from '@angular/core';
import { EventService } from '../provider/event.service';

@Component({
  selector: 'event-facet-box',
  templateUrl: './facet-box.component.html',
  styleUrls: ['./facet-box.component.css']
})
export class FacetBoxComponent {
    
    @Input() title: string;
    
    @Input() icon: string;
    
    @Input() key: string;
    
    @Input() maxSize = 10;
    
    @Input() limitedSize = 3;
    
    public selected: Array<string>;
    public facets: Array<string>;
    
    public currentList: Array<string>;
    public currentSize = 0;
    
    constructor(private eventService: EventService, private cdRef: ChangeDetectorRef) {
        this.eventService.getQueryAsObservable().subscribe(
            data =>{
                if(data && data[this.key]) {
                    this.selected = data[this.key];
                } else {
                    this.selected = new Array<string>();    
                }
//                this.updateList();
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
                this.updateList(); 
            },
            error => {
                console.error("fail to [FacetBoxComponent] search: " + error); 
            }
         );
    }
    
    ngOnInit() {
        if(this.maxSize != 0 && this.limitedSize != 0) {
            this.currentSize = Math.min(this.maxSize, this.limitedSize);   
        }
        this.updateList();
    }
    
    public switchFacet(facet: any): void {
        this.eventService.doFilterSwitch(this.key, facet.name);   
    }
    
    public hasMore(): boolean {
        return this.facets && this.key && this.facets[this.key] && this.currentSize < this.facets[this.key].length && this.currentSize <= this.limitedSize;   
    }

    public hasLess(): boolean {
        return this.facets && this.key && this.facets[this.key] && this.currentSize > this.limitedSize;   
    }
    
    public changeLimit(): void {
        console.log("changeLimit");
        if(this.hasMore()) this.currentSize = this.maxSize;
        else this.currentSize = this.limitedSize;
        this.updateList();    
    }
    
    public updateList(): void {
        console.log("facet update list");
        if(this.currentSize && this.facets && this.key) {
            this.currentList = new Array<string>();                
            for(let index in this.facets[this.key]) {
                if(+index < this.currentSize) { 
                    this.currentList.push(this.facets[this.key][index]);
                }
            }            
        }
    }
    
}
