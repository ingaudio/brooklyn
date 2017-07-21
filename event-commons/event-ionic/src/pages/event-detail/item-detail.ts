import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams, ModalController,Nav } from 'ionic-angular';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

import { Events } from '../../providers/providers';

import { EventCreatePage } from '../event-create/item-create';


@Component({
    selector: 'page-item-detail',
    templateUrl: 'item-detail.html'
})
export class EventDetailPage {

    event: any;
    youtubeURL: SafeResourceUrl;
    
    constructor(public navCtrl: NavController, navParams: NavParams, public events: Events, private sanitizer: DomSanitizer, public modalCtrl: ModalController) {
        this.event = navParams.get('event');
        
        //HACK - Select Event (for map & list)
        this.events.event = this.event;
        
        if(this.event && this.event.youtube) {
            this.youtubeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.event.youtube);
        }
    }

    getYoutube() {
        return this.youtubeURL;
    }

    editEvent() {
         this.navCtrl.push(EventCreatePage, { event: this.events.event }); 
    }
    
}
