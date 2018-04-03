import {Component, ViewChild, NgZone} from '@angular/core';
import {IonicPage, NavParams, ModalController} from 'ionic-angular';
import {LoadingController, NavController} from 'ionic-angular';
import {Geolocation} from '../../../node_modules/@ionic-native/geolocation';

import {ScheduleFilterPage} from "../schedule-filter/schedule-filter";

import {FormControl} from "@angular/forms";
import {} from 'googlemaps';
import {MapsAPILoader} from '@agm/core';
import {TripPage} from '../trip/trip';
import {MatchedTripsPage} from '../matched-trips/matched-trips';
import {UserData} from '../../providers/user-data';
import {ConferenceData} from '../../providers/conference-data';

import {DatePipe} from '@angular/common';
import {NativeGeocoder, NativeGeocoderReverseResult} from "@ionic-native/native-geocoder";

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
  @ViewChild('map') mapElement;
  map: any;
  private tripData: any;
  address;
  public latitude: number;
  public longitude: number;
  public srclat: number;
  public srclong: number;
  public searchControl: FormControl;
  public searchControl1: FormControl;
  public zoom: number;
  private gender: any;
  private pref: any;
  private minage: any;
  private maxage: any;
  private rating: any;
  private mingn: any;
  private maxgn: any;
  private selectedpref: any;
  responseData: any;
  errresponse: any = "200";
  errMessage: any;
  userName: any;
  srclocation: any;
  destlocation: any;


  constructor(public nativeGeocoder: NativeGeocoder, private datePipe: DatePipe, public authservice: ConferenceData, private userData: UserData, private ngZone: NgZone, private mapsAPILoader: MapsAPILoader, public modalCtrl: ModalController, public Loading: LoadingController, public geoloc: Geolocation, public navCtrl: NavController, public navParams: NavParams) {
    this.address = {
      place: ''
    };


    //create search FormControl
    this.searchControl = new FormControl();

    this.setCurrentPosition();
    this.selectedpref = {
      'miniage': this.minage,
      'maxiage': this.maxage,
      'gender': this.gender,
      'star': this.rating,
      'minigroup': this.mingn,
      'maxigroup': this.maxgn
    }
    this.userData.getGender().then((value) => {
      this.selectedpref.gender = value
    });

    this.userData.getRating().then((value) => {
      this.selectedpref.star = value
    });

    this.userData.getMaxiage().then((value) => {
      this.selectedpref.maxiage = value
    });

    this.userData.getMiniage().then((value) => {
      this.selectedpref.miniage = value
    });

    this.userData.getMinGroupNumber().then((value) => {
      this.selectedpref.minigroup = value
    });

    this.userData.getMaxGroupNumber().then((value) => {
      this.selectedpref.maxigroup = value
    });
    this.userData.getUsername().then((value) => {
      this.userName = value;
    });
    console.log("this.selectedpref:  ", this.selectedpref)
  }


  ionViewDidLoad() {

    //set google maps defaults
    this.zoom = 14;
    this.latitude = 57.3438;
    this.longitude = -6.2546;

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();
    this.setCurrentPositionforSrc();
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let nativeHomeInputBox1 = document.getElementById('txtHome').getElementsByTagName('input')[0];
      let autocomplete1 = new google.maps.places.Autocomplete(nativeHomeInputBox1, {
        types: ["address"]
      });
      autocomplete1.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete1.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.destlocation = place;
          console.log("-------" + this.destlocation.formatted_address);
          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          console.log(this.latitude)
          this.longitude = place.geometry.location.lng();
          console.log(this.longitude)
          this.zoom = 16;
        });
      });
    });
  }

  ionViewWillEnter() {

    //set google maps defaults

    //create search FormControl
    this.searchControl1 = new FormControl();

    this.setCurrentPositionforSrc();
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let nativeHomeInputBox = document.getElementById('txtHome1').getElementsByTagName('input')[0];
      let autocomplete = new google.maps.places.Autocomplete(nativeHomeInputBox, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.srclocation = place;
          console.log("-------" + this.srclocation.formatted_address);
          //set latitude, longitude and zoom
          this.srclat = place.geometry.location.lat();
          this.srclong = place.geometry.location.lng();
          this.zoom = 16;
        });
      });
    });
  }

  setCurrentPositionforSrc() {

    if ("geolocation" in navigator) {
      console.log("we are inside of setsrclocation");
      navigator.geolocation.getCurrentPosition((position) => {
        this.srclat = position.coords.latitude;
        this.srclong = position.coords.longitude;

      });
    }

  }

  displayCurrentLocation() {
    let nativeHomeInputBox1 = document.getElementById('txtHome1').getElementsByTagName('input')[0];

    this.nativeGeocoder.reverseGeocode(this.srclat, this.srclong)
      .then((result: NativeGeocoderReverseResult) =>

        nativeHomeInputBox1.value = JSON.stringify(result)['results'][0]['formatted_address'])
      .catch((error: any) => console.log(error));



  }

  onCreateTrip() {
    let nativeHomeInputBox1 = document.getElementById('txtHome').getElementsByTagName('input')[0];
    let nativeHomeInputBox = document.getElementById('txtHome1').getElementsByTagName('input')[0];
    //
    if (nativeHomeInputBox1.value == undefined || nativeHomeInputBox.value == undefined || this.srclocation == undefined || this.destlocation == undefined) {
      alert("You have not selected the location !!");
    }

    else{
      let userName;
      this.userData.getUsername().then((value) => {
        userName = value;
      });
      console.log("User Name Is: ", userName);
      let AGE_RANGE = this.selectedpref.miniage + "-" + this.selectedpref.maxiage;
      let GENDER = this.selectedpref.gender;
      let time = new Date().toTimeString();
      let date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
      this.tripData =
        {
          tripType: "SCHEDULED",
          loginId: userName,
          tripStops: [{
            "sequenceNumber": 1,
            "coordinate": {
              "lat": this.srclat,
              "lng": this.srclong
            },
            "location": this.srclocation.formatted_address
          },
            {
              "sequenceNumber": 2,
              "coordinate": {
                "lat": this.latitude,
                "lng": this.longitude
              },
              "location": this.destlocation.formatted_address
            }
          ],
          "preferences": [{
            "preferenceType": "AGE_RANGE",
            "value": AGE_RANGE
          },
            {
              "preferenceType": "GROUP_MIN_SIZE",
              "value": this.selectedpref.minigroup
            },
            {
              "preferenceType": "GROUP_MAX_SIZE",
              "value": this.selectedpref.maxigroup
            },
            {
              "preferenceType": "GENDER",
              "value": GENDER
            },
            {
              "preferenceType": "START_DATE",
              "value": date + "_" + time.substr(0, 8)
            },
            {
              "preferenceType": "END_DATE",
              "value": "2017-03-20" + "_" + time.substr(0, 8)
            },
            {
              "preferenceType": "REPEAT",
              "value": "WEEKDAY"
            }
          ]
        };
      console.log(this.tripData);
      console.log("creating a trip");
      this.userData.getUsertoken().then((value) => {
        this.authservice
          .postDataWithBearerToken("trip", this.tripData, value)
          .then(
            (result) => {
              console.log("result is: ", result);
              this.navCtrl.push(TripPage, result);
            },
            (err) => {
              this.errresponse = err
              console.log(err);
              // let errmsg = JSON.parse(this.errresponse)
              this.errMessage = this.errresponse.errors[0].defaultMessage;
              console.log("here is the error" + this.errresponse.errors[0].defaultMessage);
            });
      })
    }


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
          {'val': 15, 'display': false},
          {'val': 16, 'display': false},
          {'val': 17, 'display': false},
          {'val': 18, 'display': false},
          {'val': 19, 'display': false},
          {'val': 20, 'display': false},
          {'val': 21, 'display': false},
          {'val': 22, 'display': false},
          {'val': 23, 'display': false},
          {'val': 24, 'display': false},
          {'val': 25, 'display': false},
          {'val': 26, 'display': false},
          {'val': 27, 'display': false},
          {'val': 28, 'display': false},
          {'val': 29, 'display': false},
          {'val': 30, 'display': false},
        ],
      'minagevalue':
        [
          {'val': 15, 'display': false},
          {'val': 16, 'display': false},
          {'val': 17, 'display': false},
          {'val': 18, 'display': false},
          {'val': 19, 'display': false},
          {'val': 20, 'display': false},
          {'val': 21, 'display': false},
          {'val': 22, 'display': false},
          {'val': 23, 'display': false},
          {'val': 24, 'display': false},
          {'val': 25, 'display': false},
          {'val': 26, 'display': false},
          {'val': 27, 'display': false},
          {'val': 28, 'display': false},
          {'val': 29, 'display': false},
          {'val': 30, 'display': false},
        ],
      'starvalue':
        [
          {'val': 1, 'display': false},
          {'val': 2, 'display': false},
          {'val': 3, 'display': false},
          {'val': 4, 'display': false},
          {'val': 5, 'display': false},
        ],
      'mingroupvalue':
        [
          {'val': 1, 'display': false},
          {'val': 2, 'display': false},
          {'val': 3, 'display': false},
          {'val': 4, 'display': false},
          {'val': 5, 'display': false},
          {'val': 6, 'display': false},
          {'val': 7, 'display': false},
          {'val': 8, 'display': false},
          {'val': 9, 'display': false},
          {'val': 10, 'display': false},

        ],
      'maxgroupvalue':
        [
          {'val': 1, 'display': false},
          {'val': 2, 'display': false},
          {'val': 3, 'display': false},
          {'val': 4, 'display': false},
          {'val': 5, 'display': false},
          {'val': 6, 'display': false},
          {'val': 7, 'display': false},
          {'val': 8, 'display': false},
          {'val': 9, 'display': false},
          {'val': 10, 'display': false},
        ],
      'gendervalue':
        [
          {'val': 'Male', 'display': false},
          {'val': 'Female', 'display': false},
          {'val': 'No-Preference', 'display': false}

        ]
    }
    this.userData.getGender().then((value) => {
      this.gender = value
      this.selectedpref.gender = this.gender
      var i: number;
      for (i = 0; i < this.pref.gendervalue.length; i++) {
        console.log(this.pref.gendervalue[i].val + "------" + this.gender);
        if (this.pref.gendervalue[i].val == this.gender) {
          this.pref.gendervalue[i].display = true;
          console.log(this.pref.gendervalue[i].val + "-----" + this.pref.gendervalue[i].display)
        }
        else {
          this.pref.gendervalue[i].display = false;
          console.log(this.pref.gendervalue[i].val + "-----" + this.pref.gendervalue[i].display)
        }
      }
      console.log('here is the data-----' + this.gender);
    });

    this.userData.getRating().then((value) => {
      this.rating = value
      this.selectedpref.star = this.rating
      var i: number;
      for (i = 0; i < this.pref.starvalue.length; i++) {
        if (this.pref.starvalue[i].val == this.rating) {
          this.pref.starvalue[i].display = true;
        }
        else {
          this.pref.starvalue[i].display = false;
        }
      }

    });

    this.userData.getMaxiage().then((value) => {
      this.maxage = value
      this.selectedpref.maxiage = this.maxage
      var i: number;
      for (i = 0; i < this.pref.maxagevalue.length; i++) {
        if (this.pref.maxagevalue[i].val == this.maxage) {
          this.pref.maxagevalue[i].display = true;
        }
        else {
          this.pref.maxagevalue[i].display = false;
        }
      }

    });

    this.userData.getMiniage().then((value) => {
      this.minage = value
      this.selectedpref.minage = this.minage
      var i: number;
      for (i = 0; i < this.pref.minagevalue.length; i++) {
        if (this.pref.minagevalue[i].val == this.minage) {
          this.pref.minagevalue[i].display = true;
        }
        else {
          this.pref.minagevalue[i].display = false;
        }
      }
    });

    this.userData.getMinGroupNumber().then((value) => {
      this.mingn = value
      this.selectedpref.minigroup = this.mingn
      var i: number;
      for (i = 0; i < this.pref.mingroupvalue.length; i++) {
        if (this.pref.mingroupvalue[i].val == this.mingn) {
          this.pref.mingroupvalue[i].display = true;
        }
        else {
          this.pref.mingroupvalue[i].display = false;
        }
      }
    });

    this.userData.getMaxGroupNumber().then((value) => {
      this.maxgn = value
      this.selectedpref.maxigroup = this.maxgn
      var i: number;
      for (i = 0; i < this.pref.maxgroupvalue.length; i++) {
        if (this.pref.maxgroupvalue[i].val == this.maxgn) {
          this.pref.maxgroupvalue[i].display = true;
        }
        else {
          this.pref.maxgroupvalue[i].display = false;
        }
      }
    });


    console.log("THIS this.selectedpref: ", this.selectedpref)
    let modal = this.modalCtrl.create(ScheduleFilterPage, {'preference': this.pref, 'selectedpref': this.selectedpref});
    modal.onDidDismiss(data => {
      this.selectedpref = data;
      console.log(data);
    });
    modal.present();

  }

  searchTrip() {
    let nativeHomeInputBox1 = document.getElementById('txtHome').getElementsByTagName('input')[0];
    let nativeHomeInputBox = document.getElementById('txtHome1').getElementsByTagName('input')[0];
    //
    if (nativeHomeInputBox1.value == undefined || nativeHomeInputBox.value == undefined || this.srclocation == undefined || this.destlocation == undefined) {
      alert("You have not selected the location !!");
    }
    else {

      let AGE_RANGE = this.selectedpref.miniage + "-" + this.selectedpref.maxiage;
      let GENDER = this.selectedpref.gender;
      let time = new Date().toTimeString();
      let date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
      this.tripData =
        {
          tripType: "SCHEDULED",
          loginId: this.userName,
          tripStops: [{
            "sequenceNumber": 1,
            "coordinate": {
              "lat": this.srclat,
              "lng": this.srclong
            },
            "location": this.srclocation.formatted_address
          },
            {
              "sequenceNumber": 2,
              "coordinate": {
                "lat": this.latitude,
                "lng": this.longitude
              },
              "location": this.destlocation.formatted_address
            },

          ],
          "preferences": [{
            "preferenceType": "AGE_RANGE",
            "value": AGE_RANGE
          },
            {
              "preferenceType": "GROUP_MIN_SIZE",
              "value": this.selectedpref.minigroup
            },
            {
              "preferenceType": "GROUP_MAX_SIZE",
              "value": this.selectedpref.maxigroup
            },
            {
              "preferenceType": "GENDER",
              "value": GENDER
            },
            {
              "preferenceType": "START_DATE",
              "value": date + "_" + time.substr(0, 8)
            },
            {
              "preferenceType": "END_DATE",
              "value": "2017-03-20" + "_" + time.substr(0, 8)
            },
            {
              "preferenceType": "REPEAT",
              "value": "WEEKDAY"
            }
          ]
        };

      console.log("search a trip");
      this.userData.getUsertoken().then((value) => {
        console.log("The search tripData is : ", this.tripData);
        this.authservice
          .postDataWithBearerToken("search", this.tripData, value)
          .then(
            (result) => {
              console.log("result is: ", result);
              this.navCtrl.push(MatchedTripsPage, {"result": result});
            },
            (err) => {
              this.errresponse = err
              console.log(err);
              this.errMessage = this.errresponse.errors[0].defaultMessage;
              console.log("here is the error" + this.errresponse.errors[0].defaultMessage);
            });
      })
    }
  }

}
