import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';


import {SelectModule} from 'ng2-select';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { EventService } from './provider/event.service';
import { UserService } from './provider/user.service';
import { TermService } from './provider/term.service';
import { ApiService } from './provider/api.service';
import { SocialService } from './provider/social.service';

import { AppComponent } from './component/app.component';
import { NavComponent } from './component/nav.component';
import { FacetComponent } from './component/facet.component';
import { FacetBoxComponent } from './component/facet-box.component';
import { ResultComponent } from './component/result.component';
import { EventComponent } from './component/event.component';
import { EventEditComponent } from './component/event-edit.component';
import { MediaComponent } from './component/media.component';

import { SearchPage } from './page/search.page';
import { CityPage } from './page/city.page';

import { MapComponent } from './ui/map.component';
import { SingleSelectComponent } from './ui/single-select.component';
import { MultiSelectComponent } from './ui/multi-select.component';
import { DateTimePickerComponent } from './ui/datetime-picker.component';
import { LoaderComponent } from './ui/loader.component'; 

import { LoginModal } from './modal/login.modal';


const appRoutes: Routes = [
    { path: '', redirectTo: 'city', pathMatch: 'full' },
    { path: 'city', component: CityPage },
    { path: 'enjoy/:city', component: SearchPage }
];

@NgModule({
    declarations: [
        AppComponent,
        LoginModal,
        NavComponent,
        FacetComponent,
        FacetBoxComponent,
        ResultComponent,
        EventComponent,
        EventEditComponent,
        MapComponent,
        MediaComponent,
        SingleSelectComponent,
        MultiSelectComponent,
        DateTimePickerComponent,
        LoaderComponent,
        SearchPage,
        CityPage
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        NgbModule.forRoot(),
        SelectModule,
        RouterModule.forRoot(
          appRoutes,
          { enableTracing: true } // <-- debugging purposes only
        )
    ],
    providers: [
        EventService,
        UserService,
        TermService,
        ApiService,
        SocialService
    ],
    bootstrap: [AppComponent],
    entryComponents: [LoginModal]
})
export class AppModule { }
