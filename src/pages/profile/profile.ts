import { Component } from '@angular/core';
import {NavController, LoadingController} from 'ionic-angular';
import { TripPage } from '../trip/trip';
import { TripHistoryPage } from '../trip-history/trip-history';
import { IonicPage } from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import {ConferenceData} from '../../providers/conference-data';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-profile',
 	templateUrl: 'profile.html',
 })
 export class ProfilePage {
 	responseData: any;
 	errMessage: any;
 	errresponse: any="200";
 	name: string;
 	constructor(public loader: LoadingController, public navCtrl: NavController, public userData: UserData, public authservice: ConferenceData) {
 	}


 	goToTripDetail() { this.navCtrl.push(TripPage); }

 	goToTripHistory() { this.navCtrl.push(TripHistoryPage); }

 	ionViewDidLoad() {
 		let loading = this.loader.create({content: "Contacting Server ,please wait..."});
 		this.userData.getUsername().then((id)=>
 		{
 			let user_id = id
 			this.userData.getUsertoken().then((value)=>
 			{	
 				let token = value
 				this.authservice
 				.getData('user/'+user_id, token)
 				.then(
 					(result) => {
 						this.responseData = result;
 						this.name = this.responseData["firstName"];
 					},
 					(err) => {
 						this.errresponse = err
 						console.log(err);
 						console.log("here is the error" + this.errresponse.errors[0].defaultMessage);
 						loading.dismissAll();
 					});
 			})
 		})
 	}

 }