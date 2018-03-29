import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { ConferenceData } from '../../providers/conference-data';

/**
 * Generated class for the TripPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trip',
  templateUrl: 'trip.html',
})
export class TripPage {
  tripType: any;
  tripId: any;
  tripStops: any;
  group_min_size: any;
  group_max_size: any;
  // private rating: any;
  startPoint: any;
  stopPoint: any;
  preferences: any;
  tripdata: any;



  constructor(public confData: ConferenceData, public navCtrl: NavController, public navParams: NavParams, public userData: UserData) {

  }

  ionViewDidLoad() {
    // this.tripdata = result;
    this.tripId = this.navParams.get("tripId");
    this.tripType = this.navParams.get("tripType")
    this.preferences = this.navParams.get("preferences")
    this.tripStops = this.navParams.get("tripStops")
    let i: number;
    for (i = 0; i < this.preferences.length; i++) {
      if (this.preferences[i].preferenceType == "GROUP_MIN_SIZE") {
        this.group_min_size = this.preferences[i].value;
      }
      if (this.preferences[i].preferenceType == "GROUP_MAX_SIZE") {
        this.group_max_size = this.preferences[i].value;
      }
    }
    this.startPoint = this.tripStops[0]["location"].toString()
    console.log("this is start Point-----" + this.startPoint);
    this.stopPoint = this.tripStops[1]["location"].toString()
    console.log("this is start Point-----" + this.stopPoint);
    console.log(this.tripId);
  //   try {
  //     this.userData.getUsertoken().then((value) => {
  //       try {
  //         this.confData
  //           .getData('trip/' + this.tripId, value)
  //           .then(
  //             (result) => {
  //               this.tripdata = result;
  //               console.log("this.tripdata......", this.tripdata)
  //               this.tripType = this.tripdata.tripType
  //               this.preferences = this.tripdata.preferences
  //               this.tripStops = this.tripdata.tripStops
  //               let i: number;
  //               for (i = 0; i < this.preferences.length; i++) {
  //                 if (this.preferences[i].preferenceType == "GROUP_MIN_SIZE") {
  //                   this.group_min_size = this.preferences[i].value;
  //                 }
  //                 if (this.preferences[i].preferenceType == "GROUP_MAX_SIZE") {
  //                   this.group_max_size = this.preferences[i].value;
  //                 }
  //               }
  //               this.startPoint = this.tripStops[0]["location"].toString()
  //               console.log("this is start Point-----" + this.startPoint);
  //               this.stopPoint = this.tripStops[1]["location"].toString()
  //               console.log("this is start Point-----" + this.stopPoint);
  //             },
  //             (err) => {
  //               console.log(err);
  //             });
  //       }catch(error){
  //         console.log("Error Loading tripdata . It is Null");
  //         alert("Error Loading Trip data. Please refresh");
  //         throw new Error("Check all userdata api call");
  //       }
  //     })

  //   }catch(error){
  //     console.log("Error Loading data");
  //     alert("Error Loading data. Please refresh");
  //     throw new Error("Check all userdata api call");
  //   }
  }

}
