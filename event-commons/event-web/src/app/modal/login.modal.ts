import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { UserService } from '../provider/user.service';

declare const gapi: any;

@Component({
    selector: 'event-modal-login',
    templateUrl: './login.modal.html',
    styleUrls: ['./login.modal.css']
})
export class LoginModal {

    @ViewChild('googleBtn') googleButton; 
    
    alertMessage: string;
    
    constructor(public activeModal: NgbActiveModal, private userService: UserService, private cdRef: ChangeDetectorRef) {}

    /* lifecycle */

    ngAfterViewInit() {
        
        //Binding        
        this.userService.bindGoogleButton(this.googleButton).subscribe(
            data => {
                this.activeModal.close(data);    
            },
            error => {
                this.alertMessage = error;
                this.cdRef.detectChanges();    
            }
        );
        
    }

    /* Event */
    
    onClickClose() {
        this.activeModal.dismiss();    
    }


}
