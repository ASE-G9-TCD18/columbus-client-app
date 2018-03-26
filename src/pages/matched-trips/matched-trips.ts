import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  tripdata:any[] = [];

  ionViewDidLoad() {
    this.tripdata = this.navParams.get("result")
    console.log("THISSSSSSSSSSSS: ", this.tripdata)
  }

}


