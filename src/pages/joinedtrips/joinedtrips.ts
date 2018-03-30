import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
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
 * Generated class for the JoinedtripsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-joinedtrips',
  templateUrl: 'joinedtrips.html',
})
export class JoinedtripsPage {
  token:any;

  constructor(
              public navParams: NavParams,
              public navCtrl: NavController,
              public confData: ConferenceData,
              public config: Config,
              public inAppBrowser: InAppBrowser,
              public tripdetails: TripdetailsProvider,
              private userData: UserData,

  ) {
  }


  tripdata:any[] = [];
  isLoaded: Boolean = false;
  ionViewDidLoad() {
    console.log('ionViewDidLoad JoinedtripsPage');
    this.isLoaded = true;
    try {
      this.userData.getUsertoken().then((value) => {
        this.token = value;
        console.log("------i am here-----" + value);
        this.tripdetails.joinedtriplist(value).then((value: any[]) => {
          this.tripdata = value;
          // this.nativeGeocoder.reverseGeocode(52.5072095, 13.1452818)
          //   .then((result: NativeGeocoderReverseResult) => console.log(JSON.stringify(result)))
          //   .catch((error: any) => console.log(error));
          console.log("===========" + this.tripdata[0].tripType);

        })
      });
    }catch(error){
      console.log("Error Loading Data"); //Doesn't appear at all
      alert("Error Loading data. Please refresh");
      throw new Error("Am here");
    }
  }
  // The leave trip api to be used here once the api is prepared
  leaveTrip(trip){
    alert("You have now left this trip !");
    this.userData.getUsertoken().then((value)=>{
      this.confData
        .getData('trip/'+trip.tripId+'/join', value)
        .then(
          (result) => {
            console.log(result);
            this.navCtrl.push(TripPage, trip);
          },
          (err) => {
            console.log(err);
          });
    })
  }

}
