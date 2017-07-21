import { Component, Input, ViewChild, ElementRef, OnChanges } from '@angular/core';

import * as L from 'leaflet';
import 'leaflet.markercluster';

const MyIcon = L.icon({
    iconUrl: '/assets/marker-icon.png',
    iconRetinaUrl: 'assets/marker-icon.png',
    shadowUrl: 'assets/marker-shadow.png',
    iconSize: [25, 25],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

@Component({
    selector: 'event-map',
    template: `<div #mapContainer></div>`
})
export class MapComponent implements OnChanges {

    @ViewChild("mapContainer") mapComponent: ElementRef;

    @Input() myPosition: any
    
    @Input() event: any;
    @Input() events: Array<any>;
    
    //Sizing
    @Input() height = "300px";
    @Input() width = "100%";
    
    /* Map Stuff */
    private mapId = 'xxxxxxxxxxxxx'.replace(/[xy]/g, function(c) { var r = Math.random() * 16 | 0, v = c == 'x' ? r : r & 0x3 | 0x8; return v.toString(16); });
    private map: L.Map;
    private cluster: L.MarkerClusterGroup;
    private pos: any;
    
    ngOnInit() {
        //Set Box Size
        this.mapComponent.nativeElement.id = this.mapId;
        this.mapComponent.nativeElement.style.height = this.height;
        this.mapComponent.nativeElement.style.width = this.width;        
        
        //Create Map
        this.createMap();
        
    }

    ngOnChanges() {
        console.log("change in map: " + this.myPosition);
        this.updateMap();            
    }

    private createMap() {
        //Init Map
        this.map = L.map(this.mapId, {
            zoomControl: false,
            center: L.latLng(40.731253, -73.996139),
            zoom: 12,
            minZoom: 4,
            maxZoom: 19
        });
        
        //Init Layer
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            maxZoom: 18,
            id: 'mapbox.streets'
        }).addTo(this.map);
        L.control.zoom({ position: 'topleft' }).addTo(this.map);
        
        //Init Cluster
        this.cluster = L.markerClusterGroup();
        this.map.addLayer(this.cluster);
        
        //Update Map
        this.updateMap();
    }
    
    private updateMap() {
        if(this.map) {
        
            //Clear Cluster
            this.cluster.clearLayers();
        
            //My Position
            if(this.myPosition) {
                this.addPositionMarker(this.myPosition);
            }
            
            //Event
            if(this.event) {
                this.addEvent(this.event);
                
                //Fit Map
                this.fitToBound();   
            }
            
            //Events
            if(this.events && this.events.length > 0) {
                console.log("add events");
                for(let event of this.events) {
                    this.addEvent(event);
                }
                this.fitToBound(); 
            }
            
           //FIXME hack to force map resize to avoid dark-gray box on map (unknow side effects!!!) 
            this.map.invalidateSize();
            
        }        
    }

    private addEvent(event: any) {
        if(event && event.coordinate) {
            let coords = event.coordinate.split(",");
            if(coords && coords.length == 2) {
                this.addClusterMarker(coords[0], coords[1], event.place, event.address);   
            } else {
                console.warn("event has invalid coordinate: " + event.coordinate);
            }
        }
    }
    
    private addPositionMarker(position: any): void {
        if(this.pos) {
            this.map.removeLayer(this.pos);    
        }
        
//        this.pos = L.marker([position.coords.latitude, position.coords.longitude], {icon: MyIcon}).addTo(this.map);
        
        this.pos = L.circle([position.coords.latitude, position.coords.longitude], {
            color: '#dc483c',
            fillColor: '#dc483c',
            fillOpacity: 1,
            radius: 5
        }).addTo(this.map);

        let circle = L.circle([position.coords.latitude, position.coords.longitude], {
            color: '#2981ca',
            fillColor: '#2981ca',
            fillOpacity: 0.1,
            radius: 100
        }).addTo(this.map);
    }
    
    private addClusterMarker(lat: string, lng: string, place?: string, address?:string): void {
        const marker = L.marker([parseFloat(lat), parseFloat(lng)]);
        marker.bindPopup(this.buildPopup(place,address));
        this.cluster.addLayer(marker);
    }
    
    private buildPopup(place?: string, address?: string): string {
        let popup = "<div class='text-capitalize'>";
        if(place) popup += "<b style='font-size:small'>" + place + "</b>";
        popup += "<br>";
        if(address) popup += "<small>" + address + "</small>";
        popup += "</div>";
        return popup
    }
    
    private fitToBound(): void {
        console.log("fit bound");
        if(!this.cluster.getBounds()) return;
        
        if (this.myPosition) {
            this.map.fitBounds(this.cluster.getBounds().extend([this.myPosition.coords.latitude, this.myPosition.coords.longitude]), { maxZoom: 15 });
        } else {
            this.map.fitBounds(this.cluster.getBounds(), { maxZoom: 15 });
        }
    }
    

}
