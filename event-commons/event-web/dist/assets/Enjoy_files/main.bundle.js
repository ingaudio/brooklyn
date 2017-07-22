webpackJsonp([1],{

/***/ "../../../../../src async recursive":
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "../../../../../src async recursive";

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ng_bootstrap_ng_bootstrap__ = __webpack_require__("../../../../@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__provider_event_service__ = __webpack_require__("../../../../../src/app/provider/event.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__provider_user_service__ = __webpack_require__("../../../../../src/app/provider/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__component_app_component__ = __webpack_require__("../../../../../src/app/component/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__component_nav_component__ = __webpack_require__("../../../../../src/app/component/nav.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__component_facet_component__ = __webpack_require__("../../../../../src/app/component/facet.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__component_result_component__ = __webpack_require__("../../../../../src/app/component/result.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__component_map_component__ = __webpack_require__("../../../../../src/app/component/map.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__modal_login_modal__ = __webpack_require__("../../../../../src/app/modal/login.modal.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_6__component_app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_11__modal_login_modal__["a" /* LoginModal */],
            __WEBPACK_IMPORTED_MODULE_7__component_nav_component__["a" /* NavComponent */],
            __WEBPACK_IMPORTED_MODULE_8__component_facet_component__["a" /* FacetComponent */],
            __WEBPACK_IMPORTED_MODULE_9__component_result_component__["a" /* ResultComponent */],
            __WEBPACK_IMPORTED_MODULE_10__component_map_component__["a" /* MapComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_3__ng_bootstrap_ng_bootstrap__["a" /* NgbModule */].forRoot()
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_4__provider_event_service__["a" /* EventService */],
            __WEBPACK_IMPORTED_MODULE_5__provider_user_service__["a" /* UserService */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_6__component_app_component__["a" /* AppComponent */]],
        entryComponents: [__WEBPACK_IMPORTED_MODULE_11__modal_login_modal__["a" /* LoginModal */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/component/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".page {\n\tbackground-color: #d3d3d3;\n}\n\n.fullHeight {\n\theight: 100%;\n}\n\n.side-nav {\n\tbackground-color: darkseagreen;\n}\n\n\n\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/component/app.component.html":
/***/ (function(module, exports) {

module.exports = "<event-nav></event-nav>\n<div class=\"container-fluid page\">\n\t<div class=\"row fullHeight\">\n\t\t<div class=\"side-nav col-lg-2 fullHeight\">\n\t\t\t<event-facet key=\"category\" [(facets)]=\"facets\"></event-facet>\n\t\t</div>\n\t\t<div class=\"col-lg-6 fullHeight\">\n\t\t\t<event-result [(events)]=\"events\"></event-result>\n\t\t</div>\n\t\t<div class=\"col-lg-4\">C</div>\n\t</div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/component/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__provider_event_service__ = __webpack_require__("../../../../../src/app/provider/event.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = (function () {
    function AppComponent(eventService) {
        this.eventService = eventService;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.eventService.getEvents().subscribe(function (data) {
            _this.count = data.count;
            _this.facets = data.facets;
            _this.events = data.events;
        }, function (error) { });
    };
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_0" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/component/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/component/app.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__provider_event_service__["a" /* EventService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__provider_event_service__["a" /* EventService */]) === "function" && _a || Object])
], AppComponent);

var _a;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/component/facet.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".list-group-item {\n\tbackground-color: transparent;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/component/facet.component.html":
/***/ (function(module, exports) {

module.exports = "<div>\n\t<ul class=\"list-group\">\n\t\t<li class=\"list-group-item\" (click)=\"toogleIsOpen()\">\n\t\t    <h4 class=\"list-group-item-heading\" >\n\t\t    \t<i class=\"{{icon}}\"></i>\n\t\t    \t<span>{{key}}</span>\n\t\t    </h4>\n\t\t    <p *ngIf=\"!isOpen\" class=\"list-group-item-text\"></p>\n\t\t</li>\n\t\t<li *ngFor=\"let facet of currentFacets\" class=\"list-group-item\">\n\t\t\t<span>{{facet.name}}</span><span class=\"badge\">{{facet.count}}</span>\n\t\t</li>\n\t</ul>\n</div>"

/***/ }),

/***/ "../../../../../src/app/component/facet.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FacetComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FacetComponent = (function () {
    function FacetComponent() {
        this.isOpen = true;
    }
    FacetComponent.prototype.ngOnInit = function () { };
    FacetComponent.prototype.ngOnChanges = function () {
        if (this.isOpen && this.facets && this.key && this.facets[this.key]) {
            this.currentFacets = this.facets[this.key];
        }
        else {
            this.currentFacets = [];
        }
    };
    FacetComponent.prototype.toogleIsOpen = function () {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.currentFacets = this.facets[this.key];
        }
        else {
            this.currentFacets = [];
        }
    };
    return FacetComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", String)
], FacetComponent.prototype, "icon", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", Object)
], FacetComponent.prototype, "isOpen", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", String)
], FacetComponent.prototype, "key", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", Object)
], FacetComponent.prototype, "facets", void 0);
FacetComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_0" /* Component */])({
        selector: 'event-facet',
        template: __webpack_require__("../../../../../src/app/component/facet.component.html"),
        styles: [__webpack_require__("../../../../../src/app/component/facet.component.css")]
    })
], FacetComponent);

//# sourceMappingURL=facet.component.js.map

/***/ }),

/***/ "../../../../../src/app/component/map.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_leaflet__ = __webpack_require__("../../../../leaflet/dist/leaflet-src.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_leaflet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_leaflet__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import 'leaflet.markercluster';
var MapComponent = (function () {
    function MapComponent() {
    }
    MapComponent.prototype.ngOnChanges = function () {
        if (!this.map && this.event) {
            this.createMap();
        }
    };
    MapComponent.prototype.createMap = function () {
        this.map = __WEBPACK_IMPORTED_MODULE_1_leaflet__["map"]('map_' + this.event.id, {
            zoomControl: false,
            center: __WEBPACK_IMPORTED_MODULE_1_leaflet__["latLng"](40.731253, -73.996139),
            zoom: 12,
            minZoom: 4,
            maxZoom: 19
        });
        __WEBPACK_IMPORTED_MODULE_1_leaflet__["tileLayer"]('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            maxZoom: 18,
            id: 'mapbox.streets'
        }).addTo(this.map);
        __WEBPACK_IMPORTED_MODULE_1_leaflet__["control"].zoom({ position: 'topright' }).addTo(this.map);
    };
    return MapComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", Object)
], MapComponent.prototype, "event", void 0);
MapComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_0" /* Component */])({
        selector: 'event-map',
        template: '<div id="{{event.id}}" style="height:300px;"></div>'
    })
], MapComponent);

//# sourceMappingURL=map.component.js.map

/***/ }),

/***/ "../../../../../src/app/component/nav.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#navBar.navbar {\n\tbackground-color: seagreen;\n}\n\n#navBar.navbar img {\n\theight: 30px;\n\tbackground-color: orange;\n\tborder-radius: 50px;\n}\n\n#navBar .btn-link {\n\tcolor: white;\n\tcursor: pointer; \n\tcursor: hand;\n}\n\n.modalLoginText {\n\tfont-size: large;\n\tpadding-bottom: 20px;\n}\n\n.modalLoginBtnGoogle {\n\tdisplay: inline-table;\n\tvertical-align: top;\n}\n\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/component/nav.component.html":
/***/ (function(module, exports) {

module.exports = "<nav id=\"navBar\" class=\"navbar fixed-top navbar-light navbar-toggleable-md\">\n\t<button class=\"navbar-toggler navbar-toggler-right\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarNav\" aria-controls=\"navbarNav\"\n\t\taria-expanded=\"false\" aria-label=\"Toggle navigation\">\n\t\t<span class=\"navbar-toggler-icon\"></span>\n\t</button>\n\t<a class=\"navbar-brand\" href=\"#\">\n\t\t<img src=\"/assets/logo.png\" class=\"d-inline-block align-top\" alt=\"\">\n\t\tEnjoy\n\t</a>\n\t<div class=\"collapse navbar-collapse\" id=\"navbarNav\">\n\t\t<ul class=\"navbar-nav ml-auto\">\n\t\t\t<li *ngIf=\"!user\" class=\"nav-item\">\n\t\t\t\t<div class=\"btn btn-link\" (click)=\"openModal()\"><i class=\"fa fa-sign-in\"></i> <span>Login</span></div>\n\t\t\t</li>\n\t\t\t<li *ngIf=\"user\" class=\"nav-item\">\n\t\t\t\t<div class=\"btn btn-link\" (click)=\"googleSignOut()\">\n\t\t\t\t\t<img src=\"{{user.pictureUrl}}\" class=\"d-inline-block align-top\" alt=\"\">\n\t\t\t\t\t{{user.name}}\n\t\t\t\t</div>\n\t\t\t</li>\n\t\t</ul>\n\t</div>\n</nav>\n\n\n"

/***/ }),

/***/ "../../../../../src/app/component/nav.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__ = __webpack_require__("../../../../@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__provider_user_service__ = __webpack_require__("../../../../../src/app/provider/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modal_login_modal__ = __webpack_require__("../../../../../src/app/modal/login.modal.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var NavComponent = (function () {
    function NavComponent(modalService, userService, cdRef) {
        this.modalService = modalService;
        this.userService = userService;
        this.cdRef = cdRef;
    }
    /* lifecycle */
    NavComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.userService.loginWithCookie(function (data) {
            _this.user = data;
        }, function (error) {
            _this.user = null;
        });
    };
    /* method*/
    NavComponent.prototype.openModal = function () {
        var _this = this;
        console.log("open modal");
        var modal = this.modalService.open(__WEBPACK_IMPORTED_MODULE_3__modal_login_modal__["a" /* LoginModal */])
            .result.then(function (result) {
            console.log("modal close");
            _this.user = result;
        }, function (reason) {
            console.log("modal dismiss");
        });
    };
    return NavComponent;
}());
NavComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_0" /* Component */])({
        selector: 'event-nav',
        template: __webpack_require__("../../../../../src/app/component/nav.component.html"),
        styles: [__webpack_require__("../../../../../src/app/component/nav.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["b" /* NgbModal */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["b" /* NgbModal */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__provider_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__provider_user_service__["a" /* UserService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["Z" /* ChangeDetectorRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["Z" /* ChangeDetectorRef */]) === "function" && _c || Object])
], NavComponent);

var _a, _b, _c;
//# sourceMappingURL=nav.component.js.map

/***/ }),

/***/ "../../../../../src/app/component/result.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".results {\n\tlist-style: none;\n\tpadding: 0px;\n\toverflow: hidden;\n\toverflow-y: scroll;\n\theight: 100%;\n}\n\n.results .header-author img {\n\tborder-radius: 50px;\n\tmargin-top: 5px;\n}\n\n.results .header-title {\n\ttext-transform: capitalize;\n}\n\n.results .header-title div:FIRST-CHILD {\n\tfont-size: large;\n}\n\n.results .header-title div:LAST-CHILD {\n\tfont-size: small;\n}\n\n.result {\n\tbackground-color: white;\n\tmargin-top: 10px;\n\tpadding: 10px;\n}\n\n.result .content img {\n\tmargin: auto;\n\tmax-height: 300px;\n}\n\n.result .place {\n\ttext-transform: capitalize;\n\tfont-size: medium;\n}\n\n.result .address {\n\tfont-size: x-small;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/component/result.component.html":
/***/ (function(module, exports) {

module.exports = "<ul class=\"results\">\n\t<li *ngFor=\"let event of events\">\n\t\t<div class=\"result\">\n\t\t\t<div class=\"row header\">\n\t\t\t\t<div class=\"col-lg-1 header-author\"><img class=\"img-responsive img-rounded author\" onerror=\"this.src='/assets/anon.png'\" alt=\"\"\n\t\t\t\t\t\tsrc=\"https://lh3.googleusercontent.com/-ijkRsOT9ZZ8/AAAAAAAAAAI/AAAAAAAAAAA/AI6yGXy3uY1uKKnsi5U1QocEN7u49nbrVQ/s64-c-mo/photo.jpg\"></div>\n\t\t\t\t<div class=\"col-lg-9 header-title\">\n\t\t\t\t\t<div>{{event.name}}</div>\n\t\t\t\t\t<div>{{getDate(event)}}</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-lg-2 text-right header-options\">\n\t\t\t\t\t<div class=\"btn-group \">\n\t\t\t\t\t\t<button type=\"button\" class=\"btn btn-link dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n\t\t\t\t\t\t\t<span class=\"caret\"></span>\n\t\t\t\t\t\t</button>\n\t\t\t\t\t\t<ul class=\"dropdown-menu pull-right\">\n\t\t\t\t\t\t\t<li><a href=\"#\">Action</a></li>\n\t\t\t\t\t\t\t<li><a href=\"#\">Another action</a></li>\n\t\t\t\t\t\t\t<li><a href=\"#\">Something else here</a></li>\n\t\t\t\t\t\t\t<li role=\"separator\" class=\"divider\"></li>\n\t\t\t\t\t\t\t<li><a href=\"#\">Separated link</a></li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"row\">\n\t\t\t\t<div class=\"col-lg-12\">\n\t\t\t\t\t<hr>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"row content\">\n\t\t\t\t<div class=\"col-lg-12\">\n\t\t\t\t\t<div class=\"pull-left\">\n\t\t\t\t\t\t<div class=\"fa fa-picture-o\"></div>\n\t\t\t\t\t\t<div class=\"fa fa-map-marker\"></div>\n\t\t\t\t\t\t<div class=\"fa fa-youtube\"></div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<img alt=\"{{event.name}}\" src=\"{{event.image}}\" class=\"img-responsive\">\n<!-- \t\t\t\t\t<event-map [event]=\"event\"></event-map>\t -->\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"row\">\n\t\t\t\t<div class=\"col-lg-12\">\n\t\t\t\t\t<hr>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"row bottom\">\n\t\t\t\t<div class=\"col-lg-12\">\n\t\t\t\t\t<div class=\"pull-right\">\n\t\t\t\t\t\t<div class=\"btn btn-link\">\n\t\t\t\t\t\t\t<i class=\"fa fa-share\"></i>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"btn btn-link\">\n\t\t\t\t\t\t\t<i class=\"fa fa-thumbs-o-up\"></i>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"btn btn-link\">\n\t\t\t\t\t\t\t<i class=\"fa fa-thumbs-o-down\"></i>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\n\t\t\t\t\t</div>\n\t\t\t\t\t<div>\n\t\t\t\t\t\t<span class=\"place\">{{event.place}}</span>\n\t\t\t\t\t\t<br>\n\t\t\t\t\t\t<span class=\"address\">{{event.address}}</span>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"row\">\n\t\t\t\t<div class=\"col-lg-12\">\n\t\t\t\t\t<hr>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"row\">\n\t\t\t\t<div class=\"col-lg-12\">\n\t\t\t\t\tComment\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</li>\n</ul>\n"

/***/ }),

/***/ "../../../../../src/app/component/result.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment__ = __webpack_require__("../../../../moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResultComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ResultComponent = (function () {
    function ResultComponent() {
    }
    ResultComponent.prototype.getDate = function (event) {
        var dateStart = __WEBPACK_IMPORTED_MODULE_1_moment__(event.dateStart);
        var dateEnd = __WEBPACK_IMPORTED_MODULE_1_moment__(event.dateEnd);
        if (dateStart.isValid() && dateEnd.isValid()) {
            return "From " + this.formatDate(dateStart) + " To " + this.formatDate(dateEnd);
        }
        else if (dateStart.isValid()) {
            return this.formatDate(dateStart);
        }
        else {
            console.error("date not valid for event: " + event.id);
            return "";
        }
    };
    ResultComponent.prototype.formatDate = function (date) {
        var mom = __WEBPACK_IMPORTED_MODULE_1_moment__(date);
        if (mom.isValid()) {
            if (mom.minutes() == 0 && mom.hours() == 0) {
                return mom.format("dddd DD MMMM YYYY");
            }
            else {
                return mom.format("dddd DD MMMM YYYY HH:mm");
            }
        }
        return "";
    };
    return ResultComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", Object)
], ResultComponent.prototype, "events", void 0);
ResultComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_0" /* Component */])({
        selector: 'event-result',
        template: __webpack_require__("../../../../../src/app/component/result.component.html"),
        styles: [__webpack_require__("../../../../../src/app/component/result.component.css")]
    })
], ResultComponent);

//# sourceMappingURL=result.component.js.map

/***/ }),

/***/ "../../../../../src/app/modal/login.modal.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#navBar.navbar {\n\tbackground-color: seagreen;\n}\n\n#navBar.navbar img {\n\theight: 30px;\n\tbackground-color: orange;\n\tborder-radius: 50px;\n}\n\n#navBar .btn-link {\n\tcolor: white;\n\tcursor: pointer; \n\tcursor: hand;\n}\n\n.modalLoginText {\n\tfont-size: large;\n\tpadding-bottom: 20px;\n}\n\n.modalLoginBtnGoogle {\n\tdisplay: inline-table;\n\tvertical-align: top;\n}\n\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/modal/login.modal.html":
/***/ (function(module, exports) {

module.exports = "<!-- <ng-template #modalLogin let-c=\"close\" let-d=\"dismiss\"> -->\n<div class=\"modal-header\">\n\t<h4 class=\"modal-title\">Login</h4>\n\t<button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"onClickClose()\">\n\t\t<span aria-hidden=\"true\">&times;</span>\n\t</button>\n</div>\n<div class=\"modal-body\">\n\t<div class=\"row\">\n\t\t<div class=\"col-lg-12\" *ngIf=\"alertMessage\">\n\t\t\t<ngb-alert [dismissible]=\"false\" type=\"danger\">\n    \t\t\t<strong>Error: </strong>\n    \t\t\t<span>Fail to login, please try agin in few seconds.</span>\n    \t\t\t<span class=\"text small\">(fingercross)</span>\n  \t\t\t</ngb-alert>\n\t\t</div>\n\t\t<div class=\"col-lg-12\">\n\t\t\t<div #googleBtn class=\"btn btn-primary btn-block modalLoginBtnBox\">\n\t\t\t\t<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"18px\" height=\"18px\" viewBox=\"0 0 48 48\" class=\"abcRioButtonSvg\"><g><path fill=\"#EA4335\" d=\"M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z\"></path><path fill=\"#4285F4\" d=\"M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z\"></path><path fill=\"#FBBC05\" d=\"M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z\"></path><path fill=\"#34A853\" d=\"M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z\"></path><path fill=\"none\" d=\"M0 0h48v48H0z\"></path></g></svg>\n\t\t\t\t<div class=\"modalLoginBtnGoogle\">Google</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n<!-- <div class=\"modal-footer\"> --> <!-- \t<button type=\"button\" class=\"btn btn-secondary\" (click)=\"c('Close click')\">Close</button> --> <!-- </div> -->\n<!-- </ng-template> -->\n"

/***/ }),

/***/ "../../../../../src/app/modal/login.modal.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__ = __webpack_require__("../../../../@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__provider_user_service__ = __webpack_require__("../../../../../src/app/provider/user.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginModal; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LoginModal = (function () {
    function LoginModal(activeModal, userService, cdRef) {
        this.activeModal = activeModal;
        this.userService = userService;
        this.cdRef = cdRef;
    }
    /* lifecycle */
    LoginModal.prototype.ngAfterViewInit = function () {
        var _this = this;
        //Init Google Button
        this.userService.loginWithGoogleOnButton(this.googleButton, function (user) {
            console.log("OK");
            _this.activeModal.close(user);
        }, function (error) {
            console.log("KO");
            _this.alertMessage = error;
            _this.cdRef.detectChanges();
        });
    };
    /* Event */
    LoginModal.prototype.onClickClose = function () {
        this.activeModal.dismiss();
    };
    return LoginModal;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewChild */])('googleBtn'),
    __metadata("design:type", Object)
], LoginModal.prototype, "googleButton", void 0);
LoginModal = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_0" /* Component */])({
        selector: 'event-modal-login',
        template: __webpack_require__("../../../../../src/app/modal/login.modal.html"),
        styles: [__webpack_require__("../../../../../src/app/modal/login.modal.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["c" /* NgbActiveModal */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["c" /* NgbActiveModal */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__provider_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__provider_user_service__["a" /* UserService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["Z" /* ChangeDetectorRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["Z" /* ChangeDetectorRef */]) === "function" && _c || Object])
], LoginModal);

var _a, _b, _c;
//# sourceMappingURL=login.modal.js.map

/***/ }),

/***/ "../../../../../src/app/provider/event.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__("../../../../rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var EventService = (function () {
    function EventService(http) {
        this.http = http;
        this.url = 'http://127.0.0.1:8080/rest';
    }
    EventService.prototype.getEvents = function () {
        return this.post('event', {})
            .map(function (res) {
            var body = res.json();
            return body || {};
        })
            .catch(function (error) {
            var errMsg;
            if (error instanceof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Response */]) {
                var body = error.json() || '';
                var err = body.error || JSON.stringify(body);
                errMsg = error.status + " - " + (error.statusText || '') + " " + err;
            }
            else {
                errMsg = error.message ? error.message : error.toString();
            }
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(errMsg);
        });
    };
    EventService.prototype.post = function (endpoint, body) {
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({
            withCredentials: true,
            headers: new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Headers */]({ 'Content-Type': 'application/json' })
        });
        return this.http.post(this.url + '/' + endpoint, body, options);
    };
    return EventService;
}());
EventService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* Http */]) === "function" && _a || Object])
], EventService);

var _a;
//# sourceMappingURL=event.service.js.map

/***/ }),

/***/ "../../../../../src/app/provider/user.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__("../../../../rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_throw__ = __webpack_require__("../../../../rxjs/add/observable/throw.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_throw___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_throw__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var UserService = (function () {
    function UserService(http) {
        this.http = http;
        this.url = 'http://127.0.0.1:8080/rest/user';
        this.googleClientId = '957661829290-ub3ihh8eens6oland3sa2rhq5fgi1uuf.apps.googleusercontent.com';
        this.googleScope = [
            'profile',
            'email',
        ].join(' ');
    }
    UserService.prototype.loginWithCookie = function (onSuccess, onError) {
        var _this = this;
        this.get('login/cookie').map(function (res) {
            var body = res.json();
            return body || {};
        })
            .catch(function (error) {
            var errMsg;
            if (error instanceof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Response */]) {
                var body = error.json() || '';
                var err = body.error || JSON.stringify(body);
                errMsg = error.status + " - " + (error.statusText || '') + " " + err;
            }
            else {
                errMsg = error.message ? error.message : error.toString();
            }
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(errMsg);
        }).subscribe(function (data) {
            _this.user = data;
            onSuccess(_this.user);
        }, function (error) {
            _this.user = null;
            onError(error);
        });
    };
    UserService.prototype.loginWithGoogleOnButton = function (element, onSuccess, onError) {
        var _this = this;
        this.googleButton(element, function (user) {
            //Login Step 1 OK 
            console.log("login step 1 ok -> token: " + user.token);
            //Login Step 2
            _this.loginWithGoogleInternal(user.token)
                .subscribe(function (data) {
                _this.user = data;
                onSuccess(data);
            }, function (error) {
                _this.user = null;
                onError(error);
            });
        }, onError);
    };
    /* HTTP UTIL */
    UserService.prototype.loginWithGoogleInternal = function (token) {
        return this.post('login/google', token)
            .map(function (res) {
            var body = res.json();
            return body || {};
        })
            .catch(function (error) {
            var errMsg;
            if (error instanceof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Response */]) {
                var body = error.json() || '';
                var err = body.error || JSON.stringify(body);
                errMsg = error.status + " - " + (error.statusText || '') + " " + err;
            }
            else {
                errMsg = error.message ? error.message : error.toString();
            }
            console.error("fail to [loginWithGoogleInternal]: " + errMsg);
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(errMsg);
        });
    };
    UserService.prototype.post = function (endpoint, body) {
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({
            headers: new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Headers */]({ 'Content-Type': 'application/json' }),
            withCredentials: true
        });
        return this.http.post(this.url + '/' + endpoint, body, { withCredentials: true });
    };
    UserService.prototype.get = function (endpoint, params, options) {
        if (!options) {
            options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ withCredentials: true });
        }
        // Support easy query params for GET requests
        if (params) {
            var p = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* URLSearchParams */]();
            for (var k in params) {
                p.set(k, params[k]);
            }
            // Set the search field if we have params and don't already have
            // a search field set in options.
            options.search = !options.search && p || options.search;
        }
        return this.http.get(this.url + '/' + endpoint, options);
    };
    UserService.prototype.googleButton = function (element, onSuccess, onError) {
        var _this = this;
        gapi.load('auth2', function () {
            _this.auth2 = gapi.auth2.init({
                client_id: _this.googleClientId,
                cookiepolicy: 'single_host_origin',
                scope: _this.googleScope
            });
            _this.googleAttachSignIn(element.nativeElement, onSuccess, onError);
        });
    };
    UserService.prototype.googleAttachSignIn = function (element, onSuccess, onError) {
        this.auth2.attachClickHandler(element, {}, function (googleUser) {
            var user = {
                'token': googleUser.getAuthResponse().id_token
            };
            onSuccess(user);
            //                let profile = googleUser.getBasicProfile();
            //                console.log('Token || ' + googleUser.getAuthResponse().id_token);
            //                console.log('ID: ' + profile.getId());
        }, function (error) {
            onError(JSON.stringify(error, undefined, 2));
        });
    };
    return UserService;
}());
UserService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* Http */]) === "function" && _a || Object])
], UserService);

var _a;
//# sourceMappingURL=user.service.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ "../../../../moment/locale recursive ^\\.\\/.*$":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "../../../../moment/locale/af.js",
	"./af.js": "../../../../moment/locale/af.js",
	"./ar": "../../../../moment/locale/ar.js",
	"./ar-dz": "../../../../moment/locale/ar-dz.js",
	"./ar-dz.js": "../../../../moment/locale/ar-dz.js",
	"./ar-kw": "../../../../moment/locale/ar-kw.js",
	"./ar-kw.js": "../../../../moment/locale/ar-kw.js",
	"./ar-ly": "../../../../moment/locale/ar-ly.js",
	"./ar-ly.js": "../../../../moment/locale/ar-ly.js",
	"./ar-ma": "../../../../moment/locale/ar-ma.js",
	"./ar-ma.js": "../../../../moment/locale/ar-ma.js",
	"./ar-sa": "../../../../moment/locale/ar-sa.js",
	"./ar-sa.js": "../../../../moment/locale/ar-sa.js",
	"./ar-tn": "../../../../moment/locale/ar-tn.js",
	"./ar-tn.js": "../../../../moment/locale/ar-tn.js",
	"./ar.js": "../../../../moment/locale/ar.js",
	"./az": "../../../../moment/locale/az.js",
	"./az.js": "../../../../moment/locale/az.js",
	"./be": "../../../../moment/locale/be.js",
	"./be.js": "../../../../moment/locale/be.js",
	"./bg": "../../../../moment/locale/bg.js",
	"./bg.js": "../../../../moment/locale/bg.js",
	"./bn": "../../../../moment/locale/bn.js",
	"./bn.js": "../../../../moment/locale/bn.js",
	"./bo": "../../../../moment/locale/bo.js",
	"./bo.js": "../../../../moment/locale/bo.js",
	"./br": "../../../../moment/locale/br.js",
	"./br.js": "../../../../moment/locale/br.js",
	"./bs": "../../../../moment/locale/bs.js",
	"./bs.js": "../../../../moment/locale/bs.js",
	"./ca": "../../../../moment/locale/ca.js",
	"./ca.js": "../../../../moment/locale/ca.js",
	"./cs": "../../../../moment/locale/cs.js",
	"./cs.js": "../../../../moment/locale/cs.js",
	"./cv": "../../../../moment/locale/cv.js",
	"./cv.js": "../../../../moment/locale/cv.js",
	"./cy": "../../../../moment/locale/cy.js",
	"./cy.js": "../../../../moment/locale/cy.js",
	"./da": "../../../../moment/locale/da.js",
	"./da.js": "../../../../moment/locale/da.js",
	"./de": "../../../../moment/locale/de.js",
	"./de-at": "../../../../moment/locale/de-at.js",
	"./de-at.js": "../../../../moment/locale/de-at.js",
	"./de-ch": "../../../../moment/locale/de-ch.js",
	"./de-ch.js": "../../../../moment/locale/de-ch.js",
	"./de.js": "../../../../moment/locale/de.js",
	"./dv": "../../../../moment/locale/dv.js",
	"./dv.js": "../../../../moment/locale/dv.js",
	"./el": "../../../../moment/locale/el.js",
	"./el.js": "../../../../moment/locale/el.js",
	"./en-au": "../../../../moment/locale/en-au.js",
	"./en-au.js": "../../../../moment/locale/en-au.js",
	"./en-ca": "../../../../moment/locale/en-ca.js",
	"./en-ca.js": "../../../../moment/locale/en-ca.js",
	"./en-gb": "../../../../moment/locale/en-gb.js",
	"./en-gb.js": "../../../../moment/locale/en-gb.js",
	"./en-ie": "../../../../moment/locale/en-ie.js",
	"./en-ie.js": "../../../../moment/locale/en-ie.js",
	"./en-nz": "../../../../moment/locale/en-nz.js",
	"./en-nz.js": "../../../../moment/locale/en-nz.js",
	"./eo": "../../../../moment/locale/eo.js",
	"./eo.js": "../../../../moment/locale/eo.js",
	"./es": "../../../../moment/locale/es.js",
	"./es-do": "../../../../moment/locale/es-do.js",
	"./es-do.js": "../../../../moment/locale/es-do.js",
	"./es.js": "../../../../moment/locale/es.js",
	"./et": "../../../../moment/locale/et.js",
	"./et.js": "../../../../moment/locale/et.js",
	"./eu": "../../../../moment/locale/eu.js",
	"./eu.js": "../../../../moment/locale/eu.js",
	"./fa": "../../../../moment/locale/fa.js",
	"./fa.js": "../../../../moment/locale/fa.js",
	"./fi": "../../../../moment/locale/fi.js",
	"./fi.js": "../../../../moment/locale/fi.js",
	"./fo": "../../../../moment/locale/fo.js",
	"./fo.js": "../../../../moment/locale/fo.js",
	"./fr": "../../../../moment/locale/fr.js",
	"./fr-ca": "../../../../moment/locale/fr-ca.js",
	"./fr-ca.js": "../../../../moment/locale/fr-ca.js",
	"./fr-ch": "../../../../moment/locale/fr-ch.js",
	"./fr-ch.js": "../../../../moment/locale/fr-ch.js",
	"./fr.js": "../../../../moment/locale/fr.js",
	"./fy": "../../../../moment/locale/fy.js",
	"./fy.js": "../../../../moment/locale/fy.js",
	"./gd": "../../../../moment/locale/gd.js",
	"./gd.js": "../../../../moment/locale/gd.js",
	"./gl": "../../../../moment/locale/gl.js",
	"./gl.js": "../../../../moment/locale/gl.js",
	"./gom-latn": "../../../../moment/locale/gom-latn.js",
	"./gom-latn.js": "../../../../moment/locale/gom-latn.js",
	"./he": "../../../../moment/locale/he.js",
	"./he.js": "../../../../moment/locale/he.js",
	"./hi": "../../../../moment/locale/hi.js",
	"./hi.js": "../../../../moment/locale/hi.js",
	"./hr": "../../../../moment/locale/hr.js",
	"./hr.js": "../../../../moment/locale/hr.js",
	"./hu": "../../../../moment/locale/hu.js",
	"./hu.js": "../../../../moment/locale/hu.js",
	"./hy-am": "../../../../moment/locale/hy-am.js",
	"./hy-am.js": "../../../../moment/locale/hy-am.js",
	"./id": "../../../../moment/locale/id.js",
	"./id.js": "../../../../moment/locale/id.js",
	"./is": "../../../../moment/locale/is.js",
	"./is.js": "../../../../moment/locale/is.js",
	"./it": "../../../../moment/locale/it.js",
	"./it.js": "../../../../moment/locale/it.js",
	"./ja": "../../../../moment/locale/ja.js",
	"./ja.js": "../../../../moment/locale/ja.js",
	"./jv": "../../../../moment/locale/jv.js",
	"./jv.js": "../../../../moment/locale/jv.js",
	"./ka": "../../../../moment/locale/ka.js",
	"./ka.js": "../../../../moment/locale/ka.js",
	"./kk": "../../../../moment/locale/kk.js",
	"./kk.js": "../../../../moment/locale/kk.js",
	"./km": "../../../../moment/locale/km.js",
	"./km.js": "../../../../moment/locale/km.js",
	"./kn": "../../../../moment/locale/kn.js",
	"./kn.js": "../../../../moment/locale/kn.js",
	"./ko": "../../../../moment/locale/ko.js",
	"./ko.js": "../../../../moment/locale/ko.js",
	"./ky": "../../../../moment/locale/ky.js",
	"./ky.js": "../../../../moment/locale/ky.js",
	"./lb": "../../../../moment/locale/lb.js",
	"./lb.js": "../../../../moment/locale/lb.js",
	"./lo": "../../../../moment/locale/lo.js",
	"./lo.js": "../../../../moment/locale/lo.js",
	"./lt": "../../../../moment/locale/lt.js",
	"./lt.js": "../../../../moment/locale/lt.js",
	"./lv": "../../../../moment/locale/lv.js",
	"./lv.js": "../../../../moment/locale/lv.js",
	"./me": "../../../../moment/locale/me.js",
	"./me.js": "../../../../moment/locale/me.js",
	"./mi": "../../../../moment/locale/mi.js",
	"./mi.js": "../../../../moment/locale/mi.js",
	"./mk": "../../../../moment/locale/mk.js",
	"./mk.js": "../../../../moment/locale/mk.js",
	"./ml": "../../../../moment/locale/ml.js",
	"./ml.js": "../../../../moment/locale/ml.js",
	"./mr": "../../../../moment/locale/mr.js",
	"./mr.js": "../../../../moment/locale/mr.js",
	"./ms": "../../../../moment/locale/ms.js",
	"./ms-my": "../../../../moment/locale/ms-my.js",
	"./ms-my.js": "../../../../moment/locale/ms-my.js",
	"./ms.js": "../../../../moment/locale/ms.js",
	"./my": "../../../../moment/locale/my.js",
	"./my.js": "../../../../moment/locale/my.js",
	"./nb": "../../../../moment/locale/nb.js",
	"./nb.js": "../../../../moment/locale/nb.js",
	"./ne": "../../../../moment/locale/ne.js",
	"./ne.js": "../../../../moment/locale/ne.js",
	"./nl": "../../../../moment/locale/nl.js",
	"./nl-be": "../../../../moment/locale/nl-be.js",
	"./nl-be.js": "../../../../moment/locale/nl-be.js",
	"./nl.js": "../../../../moment/locale/nl.js",
	"./nn": "../../../../moment/locale/nn.js",
	"./nn.js": "../../../../moment/locale/nn.js",
	"./pa-in": "../../../../moment/locale/pa-in.js",
	"./pa-in.js": "../../../../moment/locale/pa-in.js",
	"./pl": "../../../../moment/locale/pl.js",
	"./pl.js": "../../../../moment/locale/pl.js",
	"./pt": "../../../../moment/locale/pt.js",
	"./pt-br": "../../../../moment/locale/pt-br.js",
	"./pt-br.js": "../../../../moment/locale/pt-br.js",
	"./pt.js": "../../../../moment/locale/pt.js",
	"./ro": "../../../../moment/locale/ro.js",
	"./ro.js": "../../../../moment/locale/ro.js",
	"./ru": "../../../../moment/locale/ru.js",
	"./ru.js": "../../../../moment/locale/ru.js",
	"./sd": "../../../../moment/locale/sd.js",
	"./sd.js": "../../../../moment/locale/sd.js",
	"./se": "../../../../moment/locale/se.js",
	"./se.js": "../../../../moment/locale/se.js",
	"./si": "../../../../moment/locale/si.js",
	"./si.js": "../../../../moment/locale/si.js",
	"./sk": "../../../../moment/locale/sk.js",
	"./sk.js": "../../../../moment/locale/sk.js",
	"./sl": "../../../../moment/locale/sl.js",
	"./sl.js": "../../../../moment/locale/sl.js",
	"./sq": "../../../../moment/locale/sq.js",
	"./sq.js": "../../../../moment/locale/sq.js",
	"./sr": "../../../../moment/locale/sr.js",
	"./sr-cyrl": "../../../../moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "../../../../moment/locale/sr-cyrl.js",
	"./sr.js": "../../../../moment/locale/sr.js",
	"./ss": "../../../../moment/locale/ss.js",
	"./ss.js": "../../../../moment/locale/ss.js",
	"./sv": "../../../../moment/locale/sv.js",
	"./sv.js": "../../../../moment/locale/sv.js",
	"./sw": "../../../../moment/locale/sw.js",
	"./sw.js": "../../../../moment/locale/sw.js",
	"./ta": "../../../../moment/locale/ta.js",
	"./ta.js": "../../../../moment/locale/ta.js",
	"./te": "../../../../moment/locale/te.js",
	"./te.js": "../../../../moment/locale/te.js",
	"./tet": "../../../../moment/locale/tet.js",
	"./tet.js": "../../../../moment/locale/tet.js",
	"./th": "../../../../moment/locale/th.js",
	"./th.js": "../../../../moment/locale/th.js",
	"./tl-ph": "../../../../moment/locale/tl-ph.js",
	"./tl-ph.js": "../../../../moment/locale/tl-ph.js",
	"./tlh": "../../../../moment/locale/tlh.js",
	"./tlh.js": "../../../../moment/locale/tlh.js",
	"./tr": "../../../../moment/locale/tr.js",
	"./tr.js": "../../../../moment/locale/tr.js",
	"./tzl": "../../../../moment/locale/tzl.js",
	"./tzl.js": "../../../../moment/locale/tzl.js",
	"./tzm": "../../../../moment/locale/tzm.js",
	"./tzm-latn": "../../../../moment/locale/tzm-latn.js",
	"./tzm-latn.js": "../../../../moment/locale/tzm-latn.js",
	"./tzm.js": "../../../../moment/locale/tzm.js",
	"./uk": "../../../../moment/locale/uk.js",
	"./uk.js": "../../../../moment/locale/uk.js",
	"./ur": "../../../../moment/locale/ur.js",
	"./ur.js": "../../../../moment/locale/ur.js",
	"./uz": "../../../../moment/locale/uz.js",
	"./uz-latn": "../../../../moment/locale/uz-latn.js",
	"./uz-latn.js": "../../../../moment/locale/uz-latn.js",
	"./uz.js": "../../../../moment/locale/uz.js",
	"./vi": "../../../../moment/locale/vi.js",
	"./vi.js": "../../../../moment/locale/vi.js",
	"./x-pseudo": "../../../../moment/locale/x-pseudo.js",
	"./x-pseudo.js": "../../../../moment/locale/x-pseudo.js",
	"./yo": "../../../../moment/locale/yo.js",
	"./yo.js": "../../../../moment/locale/yo.js",
	"./zh-cn": "../../../../moment/locale/zh-cn.js",
	"./zh-cn.js": "../../../../moment/locale/zh-cn.js",
	"./zh-hk": "../../../../moment/locale/zh-hk.js",
	"./zh-hk.js": "../../../../moment/locale/zh-hk.js",
	"./zh-tw": "../../../../moment/locale/zh-tw.js",
	"./zh-tw.js": "../../../../moment/locale/zh-tw.js"
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "../../../../moment/locale recursive ^\\.\\/.*$";

/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("../../../../webpack-dev-server/client/index.js?http:/localhost:4200");
module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[2]);
//# sourceMappingURL=main.bundle.js.map