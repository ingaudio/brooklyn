import { Component, Input, ViewChild, ElementRef, OnChanges, Injectable, EventEmitter, Output } from '@angular/core';
import { NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import * as moment from 'moment';

import {NgbDateStruct, NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class MomentDateParseFormatter extends NgbDateParserFormatter {
   
    parse(value: string): NgbDateStruct {
        console.log("parse date");
        let mom = moment(value);
        if(mom.isValid()) {
            return {
                day: mom.date(),
                month: (mom.month()+1),
                year: mom.year()     
            };   
        }
        return null;
    }

    format(date: NgbDateStruct): string {
        if(date) {
            console.log("format date");
            let mom = moment({ y:date.year, M:date.month-1, d:date.day });
            return mom.toISOString();
        } else {
            return null;   
        }
    }
}



@Component({
    selector: 'datetime-picker',
    template: `<div class="input-group">
                <input #targetInput (focus)="onFocus()" type="text" class="form-control form-control-sm" placeholder="{{placeholder}}">
                <span (click)="onFocus()" class="input-group-addon"><i class="fa fa-calendar"></i></span>
               </div>
               <div class="overlay" *ngIf="overlay" style="display: inline-block;">
                    <div style="display: inline-block;">
                        <ngb-datepicker [(ngModel)]="ngbDate"></ngb-datepicker>
                    </div>
                    <div style="display: inline-block;">
                        <ngb-timepicker [(ngModel)]="ngbTime"></ngb-timepicker>
                    </div>
               </div>
                `,
    host: {
        '(document:click)': 'onDocumentClick($event)',
    },
    providers: [{provide: NgbDateParserFormatter, useClass: MomentDateParseFormatter}]

})
export class DateTimePickerComponent implements OnChanges {

    @Input() placeholder: string;
    @Input() date: string;
    @Output() dateChange:EventEmitter<String> = new EventEmitter<String>();

    @ViewChild("targetInput") targetInput: ElementRef; 
    
    private overlay = false;
    
    private ngbDate: NgbDateStruct;
    private ngbTime: NgbTimeStruct;
    
    constructor(private _eref: ElementRef, private formatter: NgbDateParserFormatter) { }
    
    ngOnInit() {
        this.targetInput.nativeElement.value = this.format(this.date);
        this.ngbDate = this.formatter.parse(this.date);
        this.ngbTime = this.parseTime(this.date);
    }

    ngOnChanges() {
    }
    
    onFocus() {
        this.overlay = true;
    }
    
    onDocumentClick(event) {
        if (!this._eref.nativeElement.contains(event.target)) {
            this.overlay = false;
        } else {
            //Internal Click
               
        }
        this.onDateChange();
    }
    
    onDateChange() {
        //Create Moment Date
        let mom = null;
        if(this.ngbDate) mom = moment(this.formatter.format(this.ngbDate)); 
        if(this.ngbTime) {
            mom.minute(this.ngbTime.minute);
            mom.hour(this.ngbTime.hour);
            mom.second(this.ngbTime.second)
        }
            
        //Check
        if(mom && mom.isValid()) {
            this.date = mom.toISOString();
            this.targetInput.nativeElement.value = this.format(this.date);   
            this.dateChange.emit(this.date); 
        } else {
            console.warn("invalid date: " + this.formatter.format(this.ngbDate));
        }
        
    }
    
    format(date: string) {
        let mom = moment(date);
        if(mom.isValid()) {
            return mom.format("ddd DD/MM/YYYY HH:mm");
        } else {
            console.warn("date to format is not valid: " + date);   
        }
        return null;
    }
    
    parseTime(date: string): NgbTimeStruct {
        let mom = moment(date);
        if(mom.isValid()) {
            return {
                hour: mom.hour(),
                minute: mom.minute(),
                second: mom.second()    
            };    
        }   
        return null;
    }

}
