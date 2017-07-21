import { Component, OnInit } from '@angular/core';

import { TermService } from '../provider/term.service';


@Component({
    selector: 'city-page',
    templateUrl: './city.page.html',
    styleUrls: ['./city.page.css']
})
export class CityPage implements OnInit {

    cities: Array<any>;
    
    constructor(private termService: TermService) {
    }

    ngOnInit() {
        this.termService.getTerms('city').subscribe(
            data => {
                this.cities = data;    
            },
            error => {
                console.error("fail to retrieve cities");    
            }
        );
    }

}
