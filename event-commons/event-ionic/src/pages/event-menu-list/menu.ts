import { Component, ViewChild } from '@angular/core';
import { NavController, Nav, AlertController, ModalController } from 'ionic-angular';

import { EventListMasterPage } from '../event-list/list-master';

import { Events } from '../../providers/providers';

import { SelectComponent } from '../select/select';

@Component({
    selector: 'page-menu',
    templateUrl: 'menu.html'
})
export class EventListMenuPage {

    // A reference to the ion-nav in our component
    @ViewChild(Nav) nav: Nav;

    rootPage: any = EventListMasterPage;

    constructor(public navCtrl: NavController, public events: Events, public alertCtrl: AlertController, public modalCtrl: ModalController) {
    }

    ionViewDidLoad() {
        console.log('Hello MenuPage Page');
    }

    updateResults() {
        this.events.doSearch().subscribe((value) => {
            console.log("Execute Query");
            this.nav.setRoot(EventListMasterPage);
        });  
    }
    
    openPage() {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(EventListMasterPage);
    }

    menuClosed() {
        console.log("menu close");
        this.updateResults();
    }

    isTrashEnable() {
        return (this.events.category && this.events.category.length > 0) ||
            (this.events.tags && this.events.tags.length > 0) ||
            (this.events.time && this.events.time.length > 0) ||
            (this.events.place && this.events.place.length > 0);  
    }
    
    trashAll() {
        delete this.events.category;
        delete this.events.tags;
        delete this.events.time;
        delete this.events.place;   
        this.updateResults(); 
    }
    
    getBadge(key:string, array: Array<any>) {
//       console.log("getBadge");
        if(!array || array.length <= 0) {
            return -1;    
        } else {
            let sum = 0;
            for(const value of array) {
                for(const facet of this.events.facets[key]) {
                    if(facet.name === value) {
                      sum += facet.count;  
                    }
                }
            }
            sum = Math.min(sum, this.events.count);
            if(sum > 99) return "+99";
            return sum;
        }
    } 
    
    search(event: any) {
        let searchValue = event.target.value;

        //Filtering
        if(!searchValue || searchValue.trim().length > 3) {
            this.events.query = searchValue;
            this.updateResults();
        }
        
    }
    
    alertCategory() {
        let addModal = this.modalCtrl.create(SelectComponent, {
            title: 'Category',
            items: this.events.facets['category'],
            initial: this.events.category,
            searchable: true,
            multi: true    
         });
        addModal.onDidDismiss(item => {
            console.log("dismissed: " + item);
            if(item) { 
                this.events.category = item; 
                this.updateResults();
            }
        });
        addModal.present();
    }
    
    alertTags() {
       let addModal = this.modalCtrl.create(SelectComponent, {
            title: 'Tags',
            items: this.events.facets['tags'],
            initial: this.events.tags,
            searchable: true,
            multi: true    
         });
        addModal.onDidDismiss(item => {
            if(item)  { 
                this.events.tags = item;
                this.updateResults();
            }
        });
        addModal.present();
    }
    
    alertTime() {
        let addModal = this.modalCtrl.create(SelectComponent, {
            title: 'Time',
            items: this.events.facets['time'],
            initial: this.events.time,
            searchable: true,
            multi: false    
         });
        addModal.onDidDismiss(item => {
            if(item) { 
                this.events.time = item;
                this.updateResults();
            }
        });
        addModal.present();
    }
    
    alertPlace() {
        let addModal = this.modalCtrl.create(SelectComponent, {
            title: 'Place',
            items: this.events.facets['place'],
            initial: this.events.place,
            searchable: true,
            multi: true    
         });
        addModal.onDidDismiss(item => {
            if(item) { 
                this.events.place = item;
                this.updateResults();
            }
        });
        addModal.present();
    }   
}