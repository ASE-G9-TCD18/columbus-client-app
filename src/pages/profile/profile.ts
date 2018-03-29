import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController} from 'ionic-angular';
import { PendingRequestsPage } from '../pending-requests/pending-requests';
import { IonicPage } from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { ConferenceData} from '../../providers/conference-data';

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
 	rate: string;
 	awaitingConfirmation: any = [];

 	constructor(public loader: LoadingController, public navCtrl: NavController, public userData: UserData, public authservice: ConferenceData, public alertCtrl: AlertController) {

 	}


 	onModelChange(_event){
		console.log("You rating for this trip is " + _event);
	}

 	// goToTripDetail() { this.navCtrl.setRoot(TripPage); }

 	goToTripRequest() { 
 		this.navCtrl.push(PendingRequestsPage, { request: this.awaitingConfirmation } ); 
 	}

 	changeUsername() {
 		let alert = this.alertCtrl.create({
 			title: 'Change Username',
 			buttons: [
 			'Cancel'
 			]
 		});
 		alert.addInput({
 			name: 'username',
 			value: this.name,
 			placeholder: 'username'
 		});
 		// alert.addButton({
 		// 	text: 'Ok',
 		// 	handler: (data: any) => {
 		// 		this.userData.setUsername(data.username);
 		// 		this.getUsername();
 		// 	}
 		// });

 		alert.present();
 	}

 	changePassword() {
 		console.log('Clicked to change password');
 	}

 	logout() {
 		this.userData.logout();
 		this.navCtrl.setRoot('LoginPage');
 	}

 	support() {
 		this.navCtrl.push('SupportPage');
 	}

 	starClicked(value){
 		console.log("Rated :", value);
	}

 	ionViewDidLoad() {
    try{
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
 						console.log(result);
 						this.name = this.responseData["firstName"];
 						this.rate = this.responseData["userRating"];
 						this.awaitingConfirmation = this.responseData["tripsRequestsAwaitingConfirmation"];
 						console.log("sdfdsfdsf ", this.awaitingConfirmation)
 					},
 					(err) => {
 						this.errresponse = err
 						console.log(err);
 						console.log("here is the error" + this.errresponse.errors[0].defaultMessage);
 						loading.dismissAll();
 					});
 			})
 		})}catch (error){
      console.log("Error Fetching User data");
      alert("Error Fetching User data. Please refresh");
      throw new Error("Check userdata api call");
    }
 	}

 }
