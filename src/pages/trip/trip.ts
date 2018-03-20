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
  	  if (this.preferences[i].preferenceType=="GROUP_SIZE"){
  	    this.groupSize = this.preferences[i].value;
        if(this.preferences[i].value == "undefined-undefined"){
          this.groupSize = "Group Size No Limit"
        }
  	    console.log("this is set by a function-----"+ this.groupSize);
      }
    }

    // for(i=0; i<this.tripStops.length; i++){
      // if(i == 0){
        this.startPoint = this.tripStops[0]["coordinate"]["x"].toString() + "  " + this.tripStops[0]["coordinate"]["y"].toString()
        console.log("this is start Point-----"+ this.startPoint);
      // }
      // else {
        this.stopPoint = this.tripStops[1]["coordinate"]["x"].toString() + "  " + this.tripStops[1]["coordinate"]["y"].toString()
        console.log("this is start Point-----"+ this.stopPoint);
      // }
    // }
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
