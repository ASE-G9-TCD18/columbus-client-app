import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavParams, ModalController } from 'ionic-angular';
import { LoadingController, NavController} from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMapsEvent } from '@ionic-native/google-maps';
import {Observable} from 'rxjs/Observable';
// import { ScheduleFilterPage } from '../schedule-filter/schedule-filter';

declare var google
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
  travelDate = '2047-05-17';
  @ViewChild('map') mapElement;
  map: any;
  constructor(public modalCtrl : ModalController, public Loading : LoadingController, public geoloc: Geolocation, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    try{
      this.initMap();
      //this.map.triggerResize();
    }
    catch(e){
      console.log(e);
    }

    //console.log('ionViewDidLoad HomepagePage');
  }

  // presentFilter() {
  //   let modal = this.modalCtrl.create(ScheduleFilterPage, this.excludeTracks);
  //   modal.present();
  //
  //   modal.onWillDismiss((data: any[]) => {
  //     if (data) {
  //       this.excludeTracks = data;
  //       this.updateSchedule();
  //     }
  //   });
  //
  // }

  getCurrentLocation(){

    let loading = this.Loading.create({
      content: 'Locating your position...'
    });

    loading.present();
    //this.Loading.present(loading);
    let options = {timeout: 10000, enableHighAccuracy: true};


    let locationObs = Observable.create(observable => {

      this.geoloc.getCurrentPosition(options)
      .then( resp => {
        let lat = resp.coords.latitude;
        let lng = resp.coords.longitude;

        let location = new google.maps.LatLng(lat,lng);


        observable.next(location);
        loading.dismiss();
      },
      (err) => {
        console.log('Geolocation err: ' + err);
        loading.dismiss();

      })


    });

    return locationObs;

  }
  initMap(){
    // this.map = this.createMap();

    this.getCurrentLocation().subscribe(location =>{
      // this.map.panTo(location);
      console.log("Inside InitMap:", location)
    })

    //let latLng = new google.maps.LatLng(53.343793,-6.254572);

      let mapOptions = {
        center: location,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP

      };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    this.map.marker = new google.maps.Marker({
      position: location,

    })
    .then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
                alert('clicked');
              });
          });
    //marker.addListener('click', google.maps.Animation.Bounce);

    //marker.setMap();
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
          this.mapElement.nativeElement.classList.add('show-map');
        });


  }


}
