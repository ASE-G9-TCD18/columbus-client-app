import {Component, ViewChild, NgZone} from '@angular/core';
import {IonicPage, NavParams, ModalController} from 'ionic-angular';
import {LoadingController, NavController} from 'ionic-angular';
import {Geolocation} from '../../../node_modules/@ionic-native/geolocation';

import {ScheduleFilterPage} from "../schedule-filter/schedule-filter";

import {FormControl} from "@angular/forms";
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { UserData } from '../../providers/user-data';


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

  address;
  private gender: any;
  private pref: any;
  private minage: any;
  private maxage: any;
  private rating: any;
  private gn: any;
  private selectedpref:any;

  constructor( private userData:UserData,private ngZone: NgZone, private mapsAPILoader: MapsAPILoader, public modalCtrl: ModalController, public Loading: LoadingController, public geoloc: Geolocation, public navCtrl: NavController, public navParams: NavParams) {
    this.address = {
      place: ''
    };
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    //create search FormControl
    this.searchControl = new FormControl();

    this.setCurrentPosition();
    this.selectedpref={'miniage':this.minage, 'maxiage':this.maxage, 'gender':this.gender, 'star':this.rating, 'group':this.gn}
  }


  ionViewDidLoad() {

    this.userData.getGender().then((value)=>{
      console.log('here is the data -----'+value);
    });

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
    this.pref = {
      'maxagevalue':
        [
          {'val':15, 'display': false},
          {'val':16, 'display': false},
          {'val':17, 'display': false},
          {'val':18, 'display': false},
          {'val':19, 'display': false},
          {'val':20, 'display': false},
          {'val':21, 'display': false},
          {'val':22, 'display': false},
          {'val':23, 'display': false},
          {'val':24, 'display': false},
          {'val':25, 'display': false},
          {'val':26, 'display': false},
          {'val':27, 'display': false},
          {'val':28, 'display': false},
          {'val':29, 'display': false},
          {'val':30, 'display': false},
        ],
      'minagevalue':
        [
          {'val':15, 'display': false},
          {'val':16, 'display': false},
          {'val':17, 'display': false},
          {'val':18, 'display': false},
          {'val':19, 'display': false},
          {'val':20, 'display': false},
          {'val':21, 'display': false},
          {'val':22, 'display': false},
          {'val':23, 'display': false},
          {'val':24, 'display': false},
          {'val':25, 'display': false},
          {'val':26, 'display': false},
          {'val':27, 'display': false},
          {'val':28, 'display': false},
          {'val':29, 'display': false},
          {'val':30, 'display': false},
        ],
      'starvalue':
        [
          {'val':1, 'display': false},
          {'val':2, 'display': false},
          {'val':3, 'display': false},
          {'val':4, 'display': false},
          {'val':5, 'display': false}
        ],
      'groupvalue':
        [
          {'val':1, 'display': false},
          {'val':2, 'display': false},
          {'val':3, 'display': false},
          {'val':4, 'display': false},
          {'val':5, 'display': false}
        ],
      'gendervalue':
        [
          {'val':'Male','display':false},
          {'val':'Female','display':false},
          {'val':'No-Preference','display':false}

        ]
    }
    this.userData.getGender().then((value)=>{
      this.gender = value
      var i:number;
      for(i=0; i<this.pref.gendervalue.length; i++)
      {
        console.log(this.pref.gendervalue[i].val+"------"+this.gender);
        if(this.pref.gendervalue[i].val==this.gender)
        {
          this.pref.gendervalue[i].display=true;
          console.log(this.pref.gendervalue[i].val+"-----"+this.pref.gendervalue[i].display)
        }
        else{
          this.pref.gendervalue[i].display=false;
          console.log(this.pref.gendervalue[i].val+"-----"+this.pref.gendervalue[i].display)
        }
      }
      console.log('here is the data-----'+this.gender);
    });

    this.userData.getRating().then((value)=>{
      this.rating = value
      var i:number;
      for(i=0; i<this.pref.starvalue.length; i++)
      {
        if(this.pref.starvalue[i].val==this.rating)
        {
          this.pref.starvalue[i].display=true;
        }
        else{
          this.pref.starvalue[i].display=false;
        }
      }

    });

    this.userData.getMaxiage().then((value)=>{
      this.maxage = value
      var i:number;
      for(i=0; i<this.pref.maxagevalue.length; i++)
      {
        if(this.pref.maxagevalue[i].val==this.maxage)
        {
          this.pref.maxagevalue[i].display=true;
        }
        else{
          this.pref.maxagevalue[i].display=false;
        }
      }

    });

    this.userData.getMiniage().then((value)=>{
      this.minage = value
      var i:number;
      for(i=0; i<this.pref.minagevalue.length; i++)
      {
        if(this.pref.minagevalue[i].val==this.minage)
        {
          this.pref.minagevalue[i].display=true;
        }
        else{
          this.pref.minagevalue[i].display=false;
        }
      }
    });

    this.userData.getGroupNumber().then((value)=>{
      this.gn = value
      var i:number;
      for(i=0; i<this.pref.groupvalue.length; i++)
      {
        if(this.pref.groupvalue[i].val==this.gn)
        {
          this.pref.groupvalue[i].display=true;
        }
        else{
          this.pref.groupvalue[i].display=false;
        }
      }
    });



    let modal = this.modalCtrl.create(ScheduleFilterPage, {'preference':this.pref, 'selectedpref':this.selectedpref});
    modal.onDidDismiss(data => {

      this.selectedpref=data;
      console.log(data);
    });
    modal.present();

  }

}
