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

// import {TripPage} from "../trip/trip";
import {RatingPage} from "../rating/rating";



// import {TripPage} from "../trip/trip";
// import {AlltripsPage} from "../alltrips/alltrips";



@Component({
  selector: 'page-journey',
  templateUrl: 'journey.html',
})

export class JourneyPage {
  token: any;
  public stars: any;
  public userToken

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

    this.userData.getUsertoken().then((value) => {
      this.userToken = value;
    })

  }

  tripdata: any[] = [];
  isLoaded: Boolean = false;
  public userName: any;



  ionViewDidLoad() {
    this.isLoaded = true;
    this.userData.getUsername().then((id)=> {
      this.userName = id;

    });

    try {
      this.userData.getUsertoken().then((value) => {
        this.token = value;
        console.log("Security token" + value);
        this.tripdetails.loaddata(value).then((value: any[]) => {
          this.tripdata = value;

          // this.nativeGeocoder.reverseGeocode(52.5072095, 13.1452818)
          //   .then((result: NativeGeocoderReverseResult) => console.log(JSON.stringify(result)))
          //   .catch((error: any) => console.log(error));
          // console.log("===========" + this.tripdata[0].tripType);


        },
          (err) => {
            alert("You have not joined or created any trips !");
            console.log(err);
          });


      });
    } catch (error) {
      console.log("Error Loading Data"); //Doesn't appear at all
      alert("Error Loading data. Please refresh");
      throw new Error("Am here");
    }
    if (this.tripdata == null)
      alert("You have not joined or created any trips !");
  }


  // The cancel trip api to be used here once the api is prepared
  cancelTrip(trip) {


    console.log("Trip admin:", trip.admin);
    console.log("User id:", this.userName);
    if (trip.admin != this.userName) {

      alert("Only trip Admin can Cancel the trip");
    }
    else {
      this.setRating(trip.tripId)
      alert("Trip has been Cancelled. Check other Trips now");
      try {
        this.userData.getUsertoken().then((value) => {
          this.confData
            .deleteData('trip/' + trip.tripId, value)
            .then(
              (result) => {
                console.log(result);
                this.navCtrl.setRoot(JourneyPage, trip);
              },
              (err) => {
                console.log(err);
              });
        })

      } catch (error) {
        alert("Unable to Cancel trip. Contact Trip Admin");
        throw new Error("Trouble Cancelling trip");
      }
      this.navCtrl.setRoot(JourneyPage, trip);
      console.log("Delete trip api called here")
    }
  }
    rateTrip(trip){
      console.log("Rating trip:", trip.tripId)
      if (trip.admin != this.userName) {

        alert("Only trip Admin can Cancel the trip");
      }
      else {

        if (this.stars == undefined) {
          let modal = this.modalCtrl.create(RatingPage, {"title": "Trip Rating"});
          modal.onDidDismiss(data => {
            this.stars = data;
            alert("You Rated this trip " + this.stars + " stars.");
          });
          modal.present();
        }
      }

  }

  setRating(tripId){

    this.confData.postDataWithBearerToken('rating',{"rating":this.stars, "tripId": tripId}, this.userToken).then(value => {
      console.log(value)
    },(err)=>{
      console.log(err)
    });
  }

    leaveTrip(trip) {

      if (trip.admin == this.userName) {

        alert("Admin Cannot Leave Trip. Try Cancelling the trip");
      }
      else{
        alert("You have now left the trip. Please rate the trip now.");
      // this.hide = true;
      try {
        this.setRating(trip.tripId)
        this.userData.getUsertoken().then((value) => {
          this.confData
            .getData('trip/' + trip.tripId, value)
            .then(
              (result) => {
                console.log(result);
                // this.navCtrl.setRoot(AlltripsPage, trip);
              }
              )
            .catch((err) => {
              console.log("Error in getting getting trip data:")
              console.log(err);
            });
        })
          .catch((err) => {
            console.log("Error in leaving group:")
            console.log(err);
          })
      } catch (error) {
        alert("Unable to Leave trip. Contact Trip Admin");
        throw new Error("Trouble Leaving trip");
      }
    }
      console.log("Leave trip api called here");

    }
  }




