import { Component, OnInit, Input } from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

import * as moment from 'moment';

@Component({
    selector: 'box-event',
    templateUrl: './box-event.component.html',
    styleUrls: ['./box-event.component.css']
})
export class BoxEventComponent implements OnInit {

    @Input() event: any;

    public eventMode = 0;
    
    public youtubeURL: any;
    
    public editMode = false;
    
    constructor(private sanitizer: DomSanitizer) { }

    ngOnInit() {
        //Youtube
        if (this.event && this.event.youtube) {
            this.youtubeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.event.youtube);
        }
    }

    public getDateMonth(): string {
        if (this.event) {
            let mDate = moment(this.event.dateStart);
            if(mDate.isValid()) {
                return mDate.format("MMM");                                
            }
        }
        return "";
    }

    public getDateDays(): string {
        if (this.event) {
            let mDateStart = moment(this.event.dateStart);
            let mDateEnd = moment(this.event.dateEnd);
            if(mDateStart.isValid() && mDateEnd.isValid()) {
                if(mDateStart.month() == mDateEnd.month()) {
                    return mDateStart.format("DD") + "-" + mDateEnd.format("DD");                                    
                } else {
                    return mDateStart.format("DD");
                }
            } else if(mDateStart.isValid()) {
                return mDateStart.format("DD");
            }
        }
        return "";
    }
    
    public getDateFormatted(date: any): string {
        if (date) {
            let mDate = moment(date);
            if(mDate.isValid()) {
                if(mDate.minute() == 0 && mDate.hour() == 0) {
                    return mDate.format("dddd, DD MMMM YYYY");   
                } else {
                    return mDate.format("dddd, DD MMMM YYYY, HH:mm");
                }
            }
        }
        return "";
    }
    
}
