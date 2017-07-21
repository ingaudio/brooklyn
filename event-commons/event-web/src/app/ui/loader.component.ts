import { Component, Input, ViewChild, ElementRef, OnInit } from '@angular/core';

@Component({
    selector: 'loader',
    template: `<div *ngIf="visible && !error" [ngClass]="targetClass" class="text-center" [ngStyle]="{ 'font-size': fontSize }">
                    <div class="fa fa-spinner fa-pulse fa-3x fa-fw"></div>
                    <div>{{loaderText}}</div>
               </div>
                <div *ngIf="error" [ngClass]="errorClass" class="">
                    <i class="fa fa-warning"></i>&nbsp;<span>{{error}}</span>
                </div>
                `
})
export class LoaderComponent {

    @Input() targetClass: string;
    
    @Input() errorClass: string;
    
    @Input() loaderText = "...loading...";
    
    @Input() fontSize = "small";
    
    @Input() visible = false;
    
    @Input() error: string;
    
}
