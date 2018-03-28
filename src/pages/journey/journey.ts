/**
 * Generated class for the JourneyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

import {Component} from '@angular/core';
// import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';
import {
  AlertController,
  Config, ModalController,
  NavController
} from 'ionic-angular';
import {InAppBrowser} from '@ionic-native/in-app-browser';
import {ConferenceData} from '../../providers/conference-data';
import {TripdetailsProvider} from '../../providers/tripdetails/tripdetails';
import {UserData} from "../../providers/user-data";
import {TripPage} from "../trip/trip";
import {RatingPage} from "../rating/rating";




@Component({
  selector: 'page-journey',
  templateUrl: 'journey.html',
})

export class JourneyPage {
  token: any;
  public stars: any;

  constructor(public navCtrl: NavController,
              public confData: ConferenceData,
              public config: Config,
              public inAppBrowser: InAppBrowser,
              public tripdetails: TripdetailsProvider,
              private userData: UserData,
              public alertCtrl: AlertController,
              public modalCtrl: ModalController
              // private nativeGeocoder: NativeGeocoder
  ) {


  }

  tripdata: any[] = [];
  isLoaded: Boolean = false;

  ionViewDidLoad() {
    this.isLoaded = true;

    try {
      this.userData.getUsertoken().then((value) => {
        this.token = value;
        console.log("Security token" + value);
        this.tripdetails.loaddata(value).then((value: any[]) => {
          this.tripdata = value;
          // this.nativeGeocoder.reverseGeocode(52.5072095, 13.1452818)
          //   .then((result: NativeGeocoderReverseResult) => console.log(JSON.stringify(result)))
          //   .catch((error: any) => console.log(error));
          console.log("===========" + this.tripdata[0].tripType);


        })
      });
    } catch (error) {
      console.log("Error Loading Data"); //Doesn't appear at all
      alert("Error Loading data. Please refresh");
      throw new Error("Am here");
    }
  }

  // The cancel trip api to be used here once the api is prepared
  cancelTrip(trip) {
    if (this.stars == undefined) {
      let modal = this.modalCtrl.create(RatingPage, {"title":"Trip Rating", });
      modal.onDidDismiss(data => {
        this.stars = data;
        console.log(data);
        alert("You Rated this trip " + this.stars + " stars. Click on Cancel button to cancel the trip");
      });
      modal.present();
    }

    else {
      alert("Trip has been Cancelled.");
      try {
        this.userData.getUsertoken().then((value) => {
          this.confData
            .getData('trip/' + trip.tripId, value)
            .then(
              (result) => {
                console.log(result);
                this.navCtrl.push(TripPage, trip);
              },
              (err) => {
                console.log(err);
              });
        })
      } catch (error) {
        alert("Unable to Cancel trip. Contact Trip Admin");
        throw new Error("Trouble Cancelling trip");
      }
      console.log("Delete trip api called here")
    }
}

  leaveTrip(trip){
    alert("Trip has Ended. Please rate the trip now.");
    // this.hide = true;
    try {
      this.userData.getUsertoken().then((value) => {
        this.confData
          .getData('trip/' + trip.tripId, value)
          .then(
            (result) => {
              console.log(result);
              this.navCtrl.push(TripPage, trip);
            },
            (err) => {
              console.log(err);
            });
      })
    }catch(error)
    {
      alert("Unable to Leave trip. Contact Trip Admin");
      throw new Error("Trouble Leaving trip");
    }
    console.log("Leave trip api called here")

}




}

