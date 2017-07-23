import { Component, OnInit, OnChanges, Input, ChangeDetectorRef } from '@angular/core';
import { EventService } from '../provider/event.service';

@Component({
  selector: 'event-facet',
  templateUrl: './facet.component.html',
  styleUrls: ['./facet.component.css']
})
export class FacetComponent implements OnInit {
    
    /* Maximum allowed size (0 => no-limit) */
    @Input() maxSize: number = 0;
    
    /* Number of column to use */
    @Input() colSize = "100%";

    /* Filter Key */
    @Input() key: string;
    
    /* Private */
    private facets: any;
    public selected = [];
    public currentList: Array<any>;
    
    constructor(private eventService: EventService, private cdRef: ChangeDetectorRef) {
        this.eventService.getQueryAsObservable().subscribe(
            data =>{
                if(data && data[this.key]) {
                    this.selected = data[this.key];
                }    
            },
            error => {
                console.error("fail to [ResultComponent] search: " + error); 
            }
         );
        this.eventService.getResultAsObservable().subscribe(
            data =>{
                if(data) {
                    this.facets = data.facets;
                    this.updateList();
                }    
            },
            error => {
                console.error("fail to [ResultComponent] search: " + error); 
            }
         );
    }
    
    
    ngOnInit() {
        this.updateList();   
    }
    
    public clickOn(name: string) {
        this.eventService.doFilterSwitch(this.key, name);
    }

    public updateList() {
        if(this.facets && this.key && this.facets[this.key]) {
            if(this.maxSize > 0 && this.facets[this.key].length > this.maxSize) {
                this.currentList = new Array<any>();
                for(let index in this.facets[this.key]) {
                    if(+index < this.maxSize) this.currentList.push(this.facets[this.key][index]);
                }
            } else {
                this.currentList = this.facets[this.key];
            }
        }
    }
    
}
