import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
// import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';
import {
  Config,
  NavController
} from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ConferenceData } from '../../providers/conference-data';
import { TripdetailsProvider } from  '../../providers/tripdetails/tripdetails';
import { UserData } from "../../providers/user-data";
import { TripPage } from "../trip/trip";

/**
 * Generated class for the AlltripsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-alltrips',
  templateUrl: 'alltrips.html',
})
export class AlltripsPage {

  token:any;
  userToken:any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public confData: ConferenceData,
              public config: Config,
              public inAppBrowser: InAppBrowser,
              public tripdetails: TripdetailsProvider,
              private userData: UserData,) {
    this.userData.getUsertoken().then((value) => {
      this.userToken = value;
    },(err)=>{
        console.log(err)
    });

  }



  tripdata:any[] = [];
  isLoaded: Boolean = false;
  admin:any = this.userData.getUsername();

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlltripsPage');
    this.isLoaded = true;
    try {
      this.userData.getUsertoken().then((value) => {
        this.token = value;
        this.tripdetails.alltriplist(value).then((value: any[]) => {
          this.tripdata = value;

          // this.nativeGeocoder.reverseGeocode(52.5072095, 13.1452818)
          //   .then((result: NativeGeocoderReverseResult) => console.log(JSON.stringify(result)))
          //   .catch((error: any) => console.log(error));
          console.log("===========" + this.tripdata[0].tripType);

        }).catch((err) => {
          console.log("Error in getting all list:")
          console.log(err);
        })
      })
        .catch((err) => {
          console.log("Error in getting all list:")
          console.log(err);
        });
    }catch(error)
    {
      console.log("Error Loading trip data");
      alert("Error Loading Data. Please try after some time");
      throw new Error("Error Loading trip data. Contact admin");
    }
  }

  joinTrip(trip){


      console.log(trip);
      let i: number;
      let memberalready: any = false;
      for(i=0; i<trip.tripUsersLoginIds; i++){
        if(this.userData.getUsername()==trip.tripUsersLoginIds[i])
          memberalready = true;
      }
     if (trip.admin == this.admin || memberalready) {
       alert("You have already joined this trip");
     }
    else {

      try {
        this.userData.getUsertoken().then((value) => {
          this.confData
            .getData('trip/' + trip.tripId + '/join', value)
            .then(
              (result) => {
                console.log(result);
                this.navCtrl.push(TripPage, trip);
              })
            .catch((err) => {
            console.log("Error in getting all list:")
            console.log(err);
          });
        })
      } catch (error) {
        console.log("Error Joining trip");
        alert("Error Joining Trip. Please try after some time");
        throw new Error("Error Joining trip. Contact admin");
      }
      alert("Your Join request has been sent to Admin! Please Check MyTrips page.");
    }
  }
}
