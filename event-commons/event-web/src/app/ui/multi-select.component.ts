import { Component, Input, Output, OnInit, ViewChild, OnChanges, EventEmitter } from '@angular/core';
import {Observable} from 'rxjs/Observable';

import { TermService } from '../provider/term.service';


@Component({
    selector: 'multi-select',
    templateUrl: './multi-select.component.html',
    styleUrls: ['./multi-select.component.css']

})
export class MultiSelectComponent implements OnInit {

    @Input() term: string;
    @Input() placeholder: string;
    @Input() initialValue: string[];    
    @Input() edit = false;

    @Output() onDataChange: EventEmitter<Array<string>> = new EventEmitter();

    values = new Array<any>();
    items = new Array<string>();
    isItemUpdated = false;

    constructor(private termService: TermService) { }

    /**/

    ngOnInit() {
        if(this.initialValue) {
            this.initialValue.forEach(item => {
                this.values.push({ 'id':item, 'text':item });   
            });
        }
    }

    /* Event */ 

    public onData(data: Array<any>): void {
        this.updateTerms();
        this.values = data;
        const tmp = new Array<string>();
        data.forEach(item => {
            tmp.push(item.id);
        });
        this.onDataChange.emit(tmp);
    } 

    public onKeyEnter(typed: any): void {
        console.log("on key enter");
        this.updateTerms();

        if(this.edit && typed.srcElement.value.trim().length > 0) {
            this.values.push({ 'id':typed.srcElement.value, 'text':typed.srcElement.value });
            this.onData(this.values);
        }
        typed.srcElement.value = "";
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
            body => {
                console.info('receive body: ' + body);
                this.items = [];
                body.forEach((item, index) => {
                    this.items.push(item.name);
                });
            },
            error => {
                console.error('receive error: ' + error);
            }
        );
    }

}
