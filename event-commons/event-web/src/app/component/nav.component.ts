import { Input, Component, ChangeDetectorRef } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import { UserService } from '../provider/user.service';

import { LoginModal } from '../modal/login.modal';

@Component({
    selector: 'event-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']
})
export class NavComponent {

    @Input() city: string;
    
    public user: any;
    public profile: any;
    
    constructor(private modalService: NgbModal, private userService: UserService, private cdRef: ChangeDetectorRef) {
    
        //Subscribe to user change
        this.userService.getUserAsObservable().subscribe(data => { this.user = data; });
        
        //Subscribe to profile change
        this.userService.getProfileAsObservable().subscribe(data => { this.profile = data; });
    
    }

    //Lifecycle
    
    ngOnInit() {
        
    }   
        
    
    /* method*/

    openModal() {
        this.modalService.open(LoginModal);
    }
    
    logout() {
        this.userService.logout();
    }
    
}
