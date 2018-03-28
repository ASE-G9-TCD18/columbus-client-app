import { IonicPage, NavController, LoadingController, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { UserData } from '../../providers/user-data';
import {ConferenceData} from '../../providers/conference-data';
/**
 * Generated class for the PendingRequestsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pending-requests',
  templateUrl: 'pending-requests.html',
})
export class PendingRequestsPage {

   constructor(public loader: LoadingController, public navCtrl: NavController, public userData: UserData, public authservice: ConferenceData, public alertCtrl: AlertController) {

   }
   responseData: any;
   errMessage: any;
   errresponse: any="200";
   name: string;
   rate: string;

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
 					console.log(result);
 					this.name = this.responseData["firstName"];
 					this.rate = this.responseData["userRating"];
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
