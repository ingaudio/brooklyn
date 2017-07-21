import { NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { Component, Input, Output, Injectable, EventEmitter, ChangeDetectorRef, ViewChild } from '@angular/core';
import * as moment from 'moment';
import {LoaderComponent} from '../ui/loader.component';


import {TermService} from '../provider/term.service';

import {NgbTabsetConfig} from '@ng-bootstrap/ng-bootstrap';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css'],
})
export class EventEditComponent {
        
    @ViewChild("loaderPlace") loaderPlace: LoaderComponent;
    
    @Input() myPosition: any;
    
    @Input() event: any;
    @Output() eventChange: EventEmitter<any> = new EventEmitter<any>();
    
    originalEvent: any;
    
    youtubeURL: any;
    linkURL: any;
    
    geoMapMode = false;
    geoAddressMode = false;
    
    isAddressError = false;
    
    constructor(private sanitizer: DomSanitizer, private tabConfig: NgbTabsetConfig, private termService: TermService, private changeDetectorRef: ChangeDetectorRef) {
        tabConfig.justify = 'end';
    }
    
    ngOnInit() {
        this.originalEvent = this.event;
        if(this.event && this.event.youtube) {
            this.youtubeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.event.youtube);
        }
        if(this.event && this.event.coordinate) {
            this.geoMapMode = true;    
        }
        if(this.event && this.event.url) {
            console.log("init URL: " + this.event.url);
            this.linkURL = this.sanitizer.bypassSecurityTrustResourceUrl( this.event.url);
        }
    }

    public getURL(url: string) {
        console.log("get URL: " + url);
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    
    public getDate(event: any): string {
        let dateStart = moment(event.dateStart);
        let dateEnd = moment(event.dateEnd);
        if(dateStart.isValid() && dateEnd.isValid()) {
            return "From " + this.formatDate(dateStart) + " To " + this.formatDate(dateEnd);
        } else if(dateStart.isValid()) {
            return this.formatDate(dateStart);
        } else {
            console.error("date not valid for event: " + event.id);
            return "";   
        }
    }
    
    public onSelectPlaceChange(place: string) {
        console.log("place: " + place);
        
        //Loading
        this.activeLoadingMode();
        
        //Reset Event
        this.event.country = null;
        this.event.city = null;
        this.event.locality = null;
        this.event.place = place;
        this.event.address = null;
        this.event.coordinate = null;
        
        this.termService.getPlace(place).subscribe(
            data => {
                if(data && data.length > 0) {
                    this.event.country = data[0].country;
                    this.event.city = data[0].city;
                    this.event.locality = data[0].locality;
                    this.event.place = data[0].place;
                    this.event.address = data[0].address;
                    this.event.coordinate = data[0].coordinate;
                    
                    //Emit
//                    this.eventChange.emit(this.event);
                    
                    //Result
                    this.activePlaceMode();
                } else {
                    this.activeAddressMode();   
                }
            },
            error => {
                this.activeAddressMode();
            }
        );
        
    }
    
    public onGeocodeAddress(address: string) {
        
        //Loader
        this.activeLoadingMode();
        
        this.termService.getAddress(address).subscribe(
            data => {
                if(data && data.length > 0) {
                    this.event.country = data[0].country;
                    this.event.city = data[0].city;
                    this.event.locality = data[0].locality;
                    this.event.address = data[0].address;
                    this.event.coordinate = data[0].coordinate;
                    
                    //Emit
//                    this.eventChange.emit(this.event);
                    
                    //Result
                    this.activePlaceMode();
                } else {
                    this.activeAddressMode(true);
                }
            },
            error => {
                this.activeAddressMode(true);   
            }
        );
        
    }
    
    private formatDate(date: any): string {
        let mom = moment(date);
        if(mom.isValid()) {
            if(mom.minutes() == 0 && mom.hours() == 0) {
                return mom.format("dddd DD MMMM YYYY");   
            } else {
                return mom.format("dddd DD MMMM YYYY HH:mm");
            }
        }  
        return "";
    }
    
    private activePlaceMode() {
        this.loaderPlace.visible = false;
        this.geoMapMode = (this.event && this.event.coordinate);
        this.geoAddressMode = false;
        this.isAddressError = false;    
    }
    
    private activeLoadingMode() {
        this.loaderPlace.visible = true;
        this.geoMapMode = false;
        this.geoAddressMode = false;
        this.isAddressError = false;    
    }
    
    private activeAddressMode(isError?: boolean) {
        this.loaderPlace.visible = false;
        this.geoMapMode = false
        this.geoAddressMode = true;
        this.isAddressError = (isError ? isError : false);
    }
    
}

