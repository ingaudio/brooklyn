import { Component } from '@angular/core';
import { NavController, ModalController, MenuController } from 'ionic-angular';

import { ItemCreatePage } from '../item-create/item-create';
import { EventDetailPage } from '../event-detail/item-detail';

import { Events } from '../../providers/providers';

import { Item } from '../../models/item';

import * as moment from 'moment';

@Component({
    selector: 'page-list-master',
    templateUrl: 'list-master.html'
})
export class EventListMasterPage {

    constructor(public navCtrl: NavController, public events: Events, public modalCtrl: ModalController, public menuCtrl: MenuController) {
        console.log("open page 123");
    }

    public updatePage() {
        console.log("update page");
    }
    
    /**
     * The view loaded, let's query our items for the list
     */
    ionViewWillEnter() {
        this.events.event = null;
    }

    /**
     * Navigate to the detail page for this item.
     */
    openEvent(event: any) {
        this.navCtrl.push(EventDetailPage, {
            event: event
        });
    }

    doInfinite(infiniteScroll) {
        console.log('Begin async operation');
        this.events.nextPage().subscribe((value) => {
            console.log('Async operation has ended');
            infiniteScroll.complete();
        });
    }
    
}
