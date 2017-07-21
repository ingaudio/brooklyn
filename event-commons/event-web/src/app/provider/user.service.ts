import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, URLSearchParams, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ApiService } from '../provider/api.service';

/* Google API from JS */
declare const gapi: any;

@Injectable()
export class UserService {
    
    private user = new BehaviorSubject<any>(null);
    private profile = new BehaviorSubject<any>(null);    
    
    constructor(private http: Http, private apiService: ApiService) { }

    //DATA
    
    public getUser(): any {
        return this.user.value;   
    }
    
    public getProfile(): any {
        return this.profile.value;   
    }
    
    public getUserAsObservable(): Observable<any> {
        return this.user.asObservable();    
    }
    
    public getProfileAsObservable(): Observable<any> {
        return this.profile.asObservable();    
    }
    
    //ACTION
    
    public canEdit(event: any): boolean {
        let user = this.getUser();
        if(user && event && user.roles) {
            for(let key in user.roles) {
                for(let value of user.roles[key]) {
                    if(event[key] === value) return true;
                }
            }
        }
    
        //safe fall-back
        return true;
    }
    
    public updateProfile(): Observable<any> {
        return new Observable(observer => {
            if(this.user.value == null) {
                observer.error("fail profile updating: user is not logged in");   
            } else {
                this.apiService.get("user/profile").subscribe(
                    data => {
                        this.profile.next(data);
                        observer.next(data);    
                    },
                    error => {
                       observer.error(error);
                    }
                );
            }
        });
    }
    
    public logout() {
        this.user = null;
        localStorage.setItem('token', null);
    }

    public loginWithToken(): Observable<any> {
        return new Observable(observer => {
            //Current Token
            let token = localStorage.getItem('token');
            
            if (token && token != "null" && token.trim().length > 0) {
                //Login With Token
                this.apiService.post('user/login/token', token).subscribe(
                    data => {
                        this.user.next(data.user);  
                        observer.next(data.user);  
                    },
                    error => {
                        observer.next(null);
                        observer.error(error);
                    }
                );
            } else {
                observer.error("security token not found");   
            }
        });
    }

    public bindGoogleButton(element: any): Observable<any> {
        let observable = new Observable(observer => {
            
            //Wait click
            this.googleButton(element).subscribe(
                data => {
                    //First Step Login
                    console.log("client side login on google done with token: " + data);
                    
                    //Second Step Login
                    this.apiService.post('user/login/google', data).subscribe(
                        data => {
                            localStorage.setItem('token', data.secretToken);
                            this.user.next(data.user);
                            observer.next(data.user);
                        }, error => {
                            observer.next(null);
                            observer.error(error);
                        }
                     );
                },
                error => {
                    observer.error(error);                        
                }
            );
            
        });
        
        return observable;
    }
    
    /* GOOGLE STUFFs */

    private auth2: any;

    private googleClientId: string = '957661829290-ub3ihh8eens6oland3sa2rhq5fgi1uuf.apps.googleusercontent.com';

    private googleScope = [
        'profile',
        'email',
        //        'https://www.googleapis.com/auth/plus.me',
        //        'https://www.googleapis.com/auth/contacts.readonly',
        //        'https://www.googleapis.com/auth/admin.directory.user.readonly'
    ].join(' ');

    private googleButton(element: any): Observable<string> {
        let observable = new Observable(observer => {
            
            //Prepare OAuth2
            gapi.load('auth2', () => {
                let auth2 = gapi.auth2.init({
                    client_id: this.googleClientId,
                    cookiepolicy: 'single_host_origin',
                    scope: this.googleScope
                });
                
                //Bind with Button
                auth2.attachClickHandler(
                    element.nativeElement, 
                    {},
                    (googleUser) => {
                        observer.next(googleUser.getAuthResponse().id_token);
                    }, 
                    (error) => {
                        observer.error(error);
                    }
                );
            });            
            
            
                
        });
        return observable;
    }


}