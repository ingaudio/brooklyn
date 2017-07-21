import { Component, Input, Output, OnInit, ViewChild, OnChanges, EventEmitter, ElementRef } from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {TermService} from '../provider/term.service';

import {SelectModule} from 'ng2-select';

@Component({
    selector: 'single-select',
    templateUrl: './single-select.component.html',
    styleUrls: ['./single-select.component.css']
})
export class SingleSelectComponent implements OnInit {

    @ViewChild("ng2Select") ng2Select: ElementRef;
    
    @Input() term: string;
    @Input() placeholder: string;
    @Input() initialValue: string;
    @Input() edit = false;

    @Output() onDataChange: EventEmitter<string> = new EventEmitter();

    initial = new Array<string>();
    items = new Array<string>();
    isItemUpdated = false;

    constructor(private termService: TermService) { 
    }

    /**/

    ngOnInit() {
        if (this.initialValue) {
            this.initial.push(this.initialValue);
        }
    }

    /* Event */

    public onData(data: any): void {
        this.updateTerms();

        this.onDataChange.emit(data.id);
        
    }

    public onKeyEnter(typed: any): void {
        console.log("on key enter");
        this.updateTerms();

        if (this.edit && typed.srcElement.value.trim().length > 0) {
            let data = { 'id': typed.srcElement.value, 'text': typed.srcElement.value };
            this.initial = [typed.srcElement.value]
            this.onData(data);
        }
        //typed.srcElement.value = "";
    }

    public updateTerms(): void {
        if (!this.isItemUpdated) {
            console.log("udpate terms");
            this.isItemUpdated = true;
            this.queryForTerms();
        }
    }

    /* Utility */

    private queryForTerms(): void {
        this.termService.getTerms(this.term).subscribe(
            data => {
                console.log("receive terms data");
                this.items = [];
                for (let facet of data) {
                    console.log("add item: " + facet.name);
                    this.items.push(facet.name);
                }
            },
            error => {
                console.error('error [queryForTerms]: ' + error);
            }
        );

        //        this.appService.getTerm(this.term).subscribe(
        //            body => {
        //                console.info('receive body: ' + body);
        //                this.items = [];
        //                body.forEach((item, index) => {
        //                    this.items.push((item as Facet).name);
        //                });
        //
        //            },
        //            error => {
        //                console.error('receive error: ' + error);
        //            }
        //        );
    }

}
