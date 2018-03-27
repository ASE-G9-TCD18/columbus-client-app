import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConferenceData } from '../../providers/conference-data';
import { UserData } from "../../providers/user-data";
import { TripPage } from "../trip/trip";

/**
 * Generated class for the MatchedTripsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-matched-trips',
  templateUrl: 'matched-trips.html',
})
export class MatchedTripsPage {
  isLoaded = true
  constructor(public navCtrl: NavController, public navParams: NavParams, public confData: ConferenceData, public userData: UserData) {
  }
  tripdata:any[] = [];

  ionViewDidLoad() {
    this.tripdata = this.navParams.get("result")
    console.log("THISSSSSSSSSSSS: ", this.tripdata)
  }

  joinTrip(trip){
    alert("You have now joined this trip !")
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


