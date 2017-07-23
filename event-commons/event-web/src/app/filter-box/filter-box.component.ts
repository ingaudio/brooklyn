import { Component, OnInit } from '@angular/core';

import { EventService } from '../provider/event.service';


@Component({
    selector: 'filter-box',
    templateUrl: './filter-box.component.html',
    styleUrls: ['./filter-box.component.css']
})
export class FilterBoxComponent implements OnInit {

    private key = "time";
    
    private facets = new Array<any>();
    private selected = new Array<string>();
    
    constructor(private eventService: EventService) {
        this.eventService.getQueryAsObservable().subscribe(
            data =>{
                if(data && data[this.key]) {
                    this.selected = data[this.key];
                } else {
                    this.selected = new Array<string>();    
                }
            },
            error => {
                console.error("fail to [FilterBoxComponent] search: " + error); 
            } 
         );
        console.log("receive data");
        this.eventService.getResultAsObservable().subscribe(
            data =>{
                if(data && data.facets && data.facets[this.key]) {
                    this.facets = data.facets[this.key];
                } else {
                    this.facets = new Array<string>();
                }
            },
            error => {
                console.error("fail to [FilterBoxComponent] search: " + error); 
            }
         );

    }

    ngOnInit() {
    }

    public onClick(facet: any): void {
        this.eventService.doFilterSwitch(this.key, facet.name);   
    }
    
    public isSelected(facet: any): boolean {
        return this.selected && this.selected.indexOf(facet.name) != -1;   
    }
    
}
