import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'ui-loader',
     templateUrl: './ui-loader.component.html',
     styleUrls: ['./ui-loader.component.css']
})
export class UiLoaderComponent implements OnInit {

    @Input() size = "small";
    
    @Input() text = "loading...";

    @Input() visible = false;
    
     constructor() { }

     ngOnInit() {
     }

}
