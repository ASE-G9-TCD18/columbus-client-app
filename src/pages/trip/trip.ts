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
  groupSize: any;
  // private rating: any;
  startPoint: any;
  stopPoint: any;
  preferences: any



  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
  	this.tripType = this.navParams.get("tripType");
  	this.preferences = this.navParams.get("preferences");
  	console.log("-----------"+this.preferences.length)
  	this.tripStops = this.navParams.get("tripStops");
    let i: number;
  	for(i=0; i<this.preferences.length; i++){

  	  if (this.preferences[i].preferenceType=="GROUP_SIZE"){
  	    this.groupSize = this.preferences[i].value;
  	    console.log("this is set by a function-----"+ this.groupSize);
      }

    }
    // this.preferences.forEach(function(item){
  		// if(item.preferenceType == "GROUP_SIZE"){
  		// 	console.log(item)
  		// 	console.log(item.value)
  		// 	if(item.value == "undefined-undefined"){
  		// 		this.groupSize = "No Limit"
  		// 	}
  		// 	else{
  		// 		console.log(item.value)
  		// 		this.groupSize = item.value
  		// 	}

  		// }
	// });
	// this.tripStops.forEach(function(item){
 //  		if(item.sequenceNumber == 1){
 //  			this.startPoint = item.coordinate
 //  		}
 //  		if(item.sequenceNumber == 2){
 //  			this.stopPoint = item.coordinate
 //  		}
	// });
  }

}
