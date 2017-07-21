import { Component, ViewChild, OnChanges, ElementRef, AfterViewInit} from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

import { Events } from '../../providers/providers';

import * as moment from 'moment';

import * as L from 'leaflet';
import 'leaflet.markercluster';


@Component({
    selector: 'page-map',
    templateUrl: 'map.html'
})
export class EventMapPage  {

    @ViewChild('map') map;

    mapJs: L.Map;
    cluster: L.MarkerClusterGroup;
    myPos: any;

    constructor(public events: Events, private elementRef: ElementRef) {
    }

    ngAfterViewInit() {
        this.initMap();
    }
    
    bindClickListener() {
        console.log("bindClickListener");
        let items = this.elementRef.nativeElement.querySelector(".event-link");
        if(items) {
            console.log("addListener");
            items.addEventListener('click', (e )=>
            {
                let eventId = e.target.getAttribute("event-data");
                console.log("eventID: " + eventId);
         });   
        }
    }

    ionViewWillEnter() {
        this.cluster.clearLayers();
        if (this.events.event) { //Detail
            this.addClusterMarker(this.events.event);
        } else if (this.events.geos && this.events.geos.length > 0) {    //All
            console.log("update map");
            for (const geo of this.events.geos) {
                this.addClusterMarker(geo);
            }
        }
        //Bind Click Listener
        this.bindClickListener();
        
        //Fit Map        
        this.fitToBound();
    }

    initMap() {

        //Map 
        this.mapJs = L.map('map', {
            zoomControl: false,
            center: L.latLng(40.731253, -73.996139),
            zoom: 12,
            minZoom: 4,
            maxZoom: 19
        });
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            maxZoom: 18,
            id: 'mapbox.streets'
        }).addTo(this.mapJs);
        L.control.zoom({ position: 'topright' }).addTo(this.mapJs);

        //Cluster
        this.cluster = L.markerClusterGroup();
        this.mapJs.addLayer(this.cluster);

    }

    addClusterMarker(geo: any): void {
        if (geo && geo.coordinate) {
            const coords = geo.coordinate.split(',');
            const marker = L.marker([parseFloat(coords[0]), parseFloat(coords[1])]);
            marker.bindPopup(this.buildPopup(geo));
            this.cluster.addLayer(marker);
        }
    }

    private fitToBound(): void {
        if (this.myPos) {
            this.mapJs.fitBounds(this.cluster.getBounds().extend(this.myPos.getLatLng()), { maxZoom: 17 });
        } else {
            this.mapJs.fitBounds(this.cluster.getBounds(), { maxZoom: 17 });
        }
    }

    private buildPopup(geo: any): string {
        let popup = "<div style='text-transform:capitalize'>"
        popup += "<span style='font-size: medium'>" + geo.place + "</span>";
        popup += "<br>";
        popup += "<i>" + geo.address + "</i>";
        popup += "<table>";
        let limit = 3;
        for(let event of this.events.events) {
            if(event.place == geo.place && limit > 0) {
                popup += "<tr class='event-link' event-data='" + event.id + "'>";
                popup += "<td class=''><img src='" + event.image + "' height='50px'></td>";
                popup += "<td style='padding-left: 5px;'>";
                popup += "<span>" + event.name + "</span>";
                popup += "<br>";
                popup += "<span>" + (event.dateStart && moment(event.dateStart).isValid() ? moment(event.dateStart).format("DD/MM/YYYY") : "") + "</span>";
                popup += "<span>" + (event.dateEnd && moment(event.dateEnd).isValid() ? " - " + moment(event.dateEnd).format("DD/MM/YYYY") : "") + "</span>";
                popup += "</td>";
                popup += "<tr/>";
                limit--;
            }    
        }
        if(geo.count > 0) {
            popup += "<tr><td colspan='2' style='text-align: center;'>found <code>" + geo.count + "</code> events</td></tr>";
        }
        popup += "</table>";
        popup += "</div>";
        return popup;
    }

}
