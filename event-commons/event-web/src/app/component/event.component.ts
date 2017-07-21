import { Component, Input, Output, Injectable, ViewChild, ElementRef } from '@angular/core';
import * as moment from 'moment';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

import {EventService} from '../provider/event.service';
import {SocialService} from '../provider/social.service';
import {UserService} from '../provider/user.service';

import {LoaderComponent} from '../ui/loader.component';
import { LoginModal } from '../modal/login.modal';


@Component({
    selector: 'event',
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.css']
})
export class EventComponent {

    @ViewChild("loaderSave") loaderSave: LoaderComponent;

    @Input() event: any;
    @Input() myPosition: any;

    youtubeURL: any;

    /* status */
    editMode = false;
    originalEvent: any;
    selectedIndex = 1;

    currentRank: string;
    isLike = false;
    isUnlike = false;

    constructor(private modalService: NgbModal, private sanitizer: DomSanitizer, private eventService: EventService, private socialService: SocialService, private userService: UserService) {
        this.socialService.getRankEventsAsObservable().subscribe(
            data => {
                if (data && this.event) {
                    console.log("receive ranks");
                    for (let rank of data) {
                        if (rank.eventId === this.event.id) {
                            this.isLike = rank.vote > 0;
                            this.isUnlike = rank.vote < 0;
                            
                            //Rank
                            let internalRank = this.event.positiveRank ? this.event.positiveRank : 0 - this.event.negativeRank ? this.event.negativeRank : 0;
                            if(this.isLike) {
                                this.currentRank = String(internalRank+1);
                            }
                            if(this.isUnlike) {
                                this.currentRank = String(internalRank-1);
                            }
                            if(!this.isLike && !this.isUnlike) {
                                 this.currentRank = String(internalRank);
                            }
                        }
                    }
                }
            }
        );
    }

    ngOnInit() {

        if (this.event) {

            //Copy Event
            this.originalEvent = JSON.parse(JSON.stringify(this.event));

            //Youtube
            if (this.event && this.event.youtube) {
                this.youtubeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.event.youtube);
            }

            this.currentRank = String(this.event.positiveRank ? this.event.positiveRank : 0 - this.event.negativeRank ? this.event.negativeRank : 0);
        }
       
    }

    rankEvent(loader: LoaderComponent, rank: number) {
        //Logged?
        if (this.userService.getUser() == null) {
            this.modalService.open(LoginModal).result.then((result) => {
                if (result) {
                    this.rankEvent(loader, rank);
                }
            });
        } else {
            let realRank = rank;
            if (rank > 0 && this.isLike) realRank = 0;
            if (rank < 0 && this.isUnlike) realRank = 0;
            this.socialService.rankEvent(this.event.id, realRank);
        }

    }

    onEditCancel() {
        this.event = JSON.parse(JSON.stringify(this.originalEvent));
        this.editMode = false;
    }

    onEditSave() {
        this.loaderSave.visible = true;
        this.eventService.saveEvent(this.event).subscribe(
            data => {
                this.loaderSave.visible = false;
                this.loaderSave.error = null;
                this.editMode = false;
            },
            error => {
                this.loaderSave.error = "fail to save event. please try again!!!";
            }
        );

    }

    public getDateMonth(): string {
        let ds = moment(this.event.dateStart);
        if (ds.isValid()) {
            return ds.format("MMM");
        }
        return null;
    }

    public getDateDay(): string {
        let ds = moment(this.event.dateStart);
        let de = moment(this.event.dateEnd);
        if (ds.isValid() && de.isValid() && de.month() == ds.month()) {
            return ds.format("DD") + "-" + de.format("DD");
        }
        if (ds.isValid()) {
            return ds.format("DD");
        }
        return null;
    }

    public getDate(date: any): string {
        let mom = moment(date);
        if (mom.isValid()) {
            if (mom.minutes() == 0 && mom.hours() == 0) {
                return mom.format("dddd, DD MMMM YYYY");
            } else {
                return mom.format("dddd, DD MMMM YYYY, HH:mm");
            }
        }
        return "";
    }

}

