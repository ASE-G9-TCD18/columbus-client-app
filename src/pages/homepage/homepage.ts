import {Component, ViewChild, NgZone} from '@angular/core';
import {IonicPage, NavParams, ModalController} from 'ionic-angular';
import {LoadingController, NavController} from 'ionic-angular';
import {Geolocation} from '../../../node_modules/@ionic-native/geolocation';
// import {GoogleMapsEvent} from '../../../node_modules/@ionic-native/google-maps';
// import {Observable} from 'rxjs/Observable';
import {ScheduleFilterPage} from "../schedule-filter/schedule-filter";
// import {AutocompletePage} from "../autocomplete/autocomplete";
// import {UserOptionsSignin} from "../../interfaces/user-options-signin";
// import { ScheduleFilterPage } from '../schedule-filter/schedule-filter';

import {FormControl} from "@angular/forms";
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';



/**
 * Generated class for the HomepagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-homepage',
  templateUrl: 'homepage.html',
})
export class HomepagePage {
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  @ViewChild('map') mapElement;
  map: any;

  // private search: any =
  //   {
  //     "location": ""
  //
  //   };
  address;

  constructor( private ngZone: NgZone, private mapsAPILoader: MapsAPILoader, public modalCtrl: ModalController, public Loading: LoadingController, public geoloc: Geolocation, public navCtrl: NavController, public navParams: NavParams) {
    this.address = {
      place: ''
    };
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

  }

  ionViewDidLoad() {
    //set google maps defaults
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let nativeHomeInputBox = document.getElementById('txtHome').getElementsByTagName('input')[0];
      let autocomplete = new google.maps.places.Autocomplete(nativeHomeInputBox, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 16;
        });
      });
    });
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 16;
      });
    }
  }

  presentFilters() {
    let modal = this.modalCtrl.create(ScheduleFilterPage);
    modal.present();

  }

}





















//
//
//
//   showAddressModal () {
//     let modal = this.modalCtrl.create(AutocompletePage);
//     // let me = this;
//     modal.onDidDismiss(data => {
//       this.address.place = data;
//     });
//     modal.present();
//   }
//
//   ionViewDidLoad() {
//     try {
//       this.initMap();
//       //this.map.triggerResize();
//     }
//     catch (e) {
//       console.log(e);
//     }
//
//     //console.log('ionViewDidLoad HomepagePage');
//   }
//
//   presentFilters() {
//     let modal = this.modalCtrl.create(ScheduleFilterPage);
//     modal.present();
//
//   }
//
//   getCurrentLocation() {
//
//     // let loading = this.Loading.create({
//     //   content: 'Locating your position...'
//     //
//     // });
//     //
//     // loading.present();
//     //this.Loading.present(loading);
//     let options = {timeout: 10000, enableHighAccuracy: true};
//
//     let locationObs = Observable.create(observable => {
//
//       this.geoloc.getCurrentPosition(options)
//         .then(resp => {
//
//             let lat = resp.coords.latitude;
//             let lng = resp.coords.longitude;
//
//             let location = new google.maps.LatLng(lat, lng);
//             console.log(location);
//
//             observable.next(location);
//             // loading.dismiss();
//           },
//           (err) => {
//             console.log('Geolocation err: ' + err);
//             // loading.dismiss();
//
//           })
//
//
//     });
//
//     return locationObs;
//
//   }
//
//   // autocomplete(){
//   //   var searchBox = new google.maps.places.SearchBox(input);
//   // }
//
//   initMap() {
//     // this.map = this.createMap();
//
//     this.getCurrentLocation().subscribe(location => {
//       // this.map.panTo(location);
//       console.log("Inside InitMap:", location)
//       let mapOptions = {
//         center: location,
//         //{lat: 53.343793, lng: -6.254572}
//         zoom: 16,
//         mapTypeId: google.maps.MapTypeId.ROADMAP
//       };
//       this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
//     })
//
//     //let latLng = new google.maps.LatLng(53.343793,-6.254572);
//     // this.map.marker = new google.maps.Marker({
//     //   position: location,
//     //
//     // })
//     //   .then(marker => {
//     //     marker.on(GoogleMapsEvent.MARKER_CLICK)
//     //       .subscribe(() => {
//     //         alert('clicked');
//     //       });
//     //   });
//     //marker.addListener('click', google.maps.Animation.Bounce);
//
//     //marker.setMap();
//     google.maps.event.addListenerOnce(this.map, 'idle', () => {
//       this.mapElement.nativeElement.classList.add('show-map');
//     });
//
//
//   }
//
//
// }
