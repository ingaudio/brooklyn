import { Component, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController, ViewController, NavParams, ModalController } from 'ionic-angular';

import { Camera } from '@ionic-native/camera';
import { Events } from '../../providers/providers';

import { SelectComponent } from '../select/select';

import * as moment from 'moment';

@Component({
    selector: 'page-item-create',
    templateUrl: 'item-create.html'
})
export class EventCreatePage {
        
    isReadyToSave = false;

    item: any;

    event: any;

    constructor(public navCtrl: NavController, navParams: NavParams, public events: Events, formBuilder: FormBuilder, public modalCtrl: ModalController) {

        this.event = navParams.get('event');

        //Update Price
        if(this.event.price == -1) {
            this.event.price = '';
        }
        
        //HACK - Select Event (for map & list)
        this.events.event = this.event;

    }
    
    saveEvent() {
        //Save Event Local
        this.events.event = this.event;
        
        //Save Event on Server
        this.events.saveEvent();
        
        //Close 
        this.navCtrl.pop();
    }
    
    onChange() {
        this.isReadyToSave = true;
    }
    

    getPrice() {
        if(this.event.price == -1) return "";
        if(this.event.price == 0) return "FREE";
        return this.event.price;    
    }
    
    openModalCategory() {
         let addModal = this.modalCtrl.create(SelectComponent, {
            title: 'Category',
            initial: [ this.event.category ],
            searchable: true,
            multi: false,
            editable: true,
            api: '/term/category'    
         });
        addModal.onDidDismiss(item => {
            if(item) {
                if(item.length == 0) this.event.category = "";
                else this.event.category = item[0];   
                this.isReadyToSave = true; 
            }
        });
        addModal.present();
        
    }
    
    openModalTags() {
         let addModal = this.modalCtrl.create(SelectComponent, {
            title: 'Tags',
            initial: this.event.tags,
            searchable: true,
            multi: true,
            editable: true,
            api: '/term/tags'    
         });
        addModal.onDidDismiss(item => {
            if(item) {
                this.event.tags = item;
                this.isReadyToSave = true;    
            }
        });
        addModal.present();
        
    }

}
