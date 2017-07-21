import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { EventListMenuPage } from '../event-menu-list/menu';
import { EventListMasterPage } from '../event-list/list-master';
import { EventMapPage } from '../event-map/map';

import { Events } from '../../providers/providers';


@Component({
    selector: 'page-tabs',
    templateUrl: 'tabs.html'
})
export class EventTabsPage {
    tab1Root: any = EventListMenuPage;
    tab2Root: any = EventMapPage;

    tab1Title = " ";
    tab2Title = " ";

    constructor(public navCtrl: NavController, public translateService: TranslateService, public events: Events) {
        
        translateService.get(['EVENT_TAB_LIST', 'EVENT_TAB_MAP']).subscribe(values => {
            this.tab1Title = values['EVENT_TAB_LIST'];
            this.tab2Title = values['EVENT_TAB_MAP'];
        });
        
        this.events.doSearch().subscribe((value) => {
            console.log("Execute Query");
        });

    }
    
    getBadgeList() {
        if(!this.events) return 0;
        if(this.events.event) return 1;
        return this.events.count;    
    }
    
    getBadgeMap() {
        if(!this.events) return 0;
        if(this.events.event) return 1;
        if(!this.events.geos) return 0; 
        return this.events.geos.length;    
    }
    
}
