import { Component, ViewChild, ApplicationRef } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';

import { Events } from '../../providers/providers';

import { Api } from '../../providers/api';

@Component({
    selector: 'page-select-select',
    templateUrl: 'select.html'
})
export class SelectComponent {
        
    searchable = false;
    editable = false;
    multi = false;
    
    title: string;
    items: Array<any>;
    values: Array<string>;
    
    searchValue: string;
    currentItems: Array<any>;
    
    constructor(public navCtrl: NavController, navParams: NavParams, public viewCtrl: ViewController, public api: Api, public appref: ApplicationRef) {
        
        //SETTING
        if(navParams.get('title')) this.title = navParams.get('title');
        if(navParams.get('searchable')) this.searchable = navParams.get('searchable');
        if(navParams.get('editable')) this.editable = navParams.get('editable');
        if(navParams.get('multi')) this.multi = navParams.get('multi');
        
        
        //Items
        if(navParams.get('items')) {
            this.items = navParams.get('items') 
            for(let item of this.items) {
                item.selected = false;    
            }
        } else {
            this.items = new Array<any>();       
        }
        
        //Initial Value
        if(navParams.get('initial')) {
            this.values = navParams.get('initial');
            for(let value of this.values) {
                this.addToItem(value,0,true);
            }
        } else {
            this.values = new Array<string>();    
        }
        
        //API
        console.log("api");
        if(navParams.get('api')) {
            console.log("do query");
            this.api.get(navParams.get('api')).map(res => {
                let json = res.json();
                for(let entry of json) {
                    this.addToItem(entry.name,entry.count);    
                }
            }).subscribe(res => {
                console.log("sub");
            }, err => {
                console.error('error [doSearch]', err);
            });
        }
        
        //Align Current with Items
        this.currentItems = this.items;
    }
    
    addToItem(value: string, count: number, selected?: boolean) {
        for(let item of this.items) {
            if(item.name == value) {
                item.name = value;
                item.count = count;   
                if(selected) item.selected = selected
                return;
            }   
        }
        this.items.push({ name: value, count: count, selected: selected });
    }
    
    clickOnValue(value: string) {
        const index = this.values.indexOf(value);
        if(this.multi) {
            if(index == -1) this.values.push(value);
            else this.values.splice(index,1);
        } else {
            if(index == -1) this.values = new Array<string>(value);
            else this.values = new Array<string>();            
        }
        console.log("clickOnValue: " + this.values);
        //Update Items
        for(let item of this.items) {
            item.selected = (this.values.indexOf(item.name) != -1);
            console.log("selected [" + item.name + "] is [" + item.selected + "]");
        }
        this.appref.tick();

    }
    
    close() {
        this.navCtrl.pop();
    }
    
    dismiss() {
        console.log("dismiss: " + this.values);
       this.viewCtrl.dismiss(this.values);
    }
    
    search(event: any) {
        //Search value
        this.searchValue = event.target.value;

        //Filtering
        if(!this.searchValue || this.searchValue.trim().length == 0) {
            this.currentItems = this.items;    
        } else {
            this.currentItems = new Array<any>();
            let re = /./.test.bind(new RegExp(this.searchValue, 'g'));
            for(let item of this.items) {
                 if(re(item.name)) this.currentItems.push(item);               
            }
        }
    }
    
    isSelected(value: string): boolean {
        let val = this.values.indexOf(value) != -1;
        console.log("isSelected: " + val);
        return val;
    }
    
    addValue() {
        if(this.searchValue && this.searchValue.trim().length > 0 && this.values.indexOf(this.searchValue) == -1) {
            //Push In Items
            this.items.push({
                name: this.searchValue,
                count: 0,
                selected: true    
            });
            //Push in CurrentItems
            this.currentItems = this.items;
            //Simulate Click
            this.clickOnValue(this.searchValue);    
        }
    }
    
    
}
