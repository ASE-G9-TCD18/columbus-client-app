import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  tripStops: any;
  group_min_size: any;
  group_max_size: any;
  // private rating: any;
  startPoint: any;
  stopPoint: any;
  preferences: any
  tripdata: any



  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    this.tripdata = this.navParams
  	this.tripType = this.navParams.get("tripType");
  	this.preferences = this.navParams.get("preferences");
  	this.tripStops = this.navParams.get("tripStops");
    let i: number;
  	for(i=0; i<this.preferences.length; i++){
  	  if (this.preferences[i].preferenceType=="GROUP_MIN_SIZE"){
  	    this.group_min_size = this.preferences[i].value;
      }
      if (this.preferences[i].preferenceType=="GROUP_MAX_SIZE"){
        this.group_max_size = this.preferences[i].value;
      }
    }
    this.startPoint = this.tripStops[0]["coordinate"]["lat"].toString() + "  " + this.tripStops[0]["coordinate"]["lng"].toString()
    console.log("this is start Point-----"+ this.startPoint);
    this.stopPoint = this.tripStops[1]["coordinate"]["lat"].toString() + "  " + this.tripStops[1]["coordinate"]["lng"].toString()
    console.log("this is start Point-----"+ this.stopPoint);
  }

}
