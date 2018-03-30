import { IonicPage, NavController, LoadingController, AlertController, NavParams} from 'ionic-angular';
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

   constructor(public navParams: NavParams, public loader: LoadingController, public navCtrl: NavController, public userData: UserData, public authservice: ConferenceData, public alertCtrl: AlertController) {

   }
  pendingRequests: any = []
  responseData: any
  errresponse: any
  isLoaded: any
  
  ionViewDidLoad() {
  	this.isLoaded = true
  	this.pendingRequests = this.navParams.get("request")
  	console.log(this.pendingRequests)
  }

  confirmRequest(data) {
  	console.log(data)
  	this.userData.getUsertoken().then((value) => {
  		this.authservice
  		.postDataWithBearerToken("trip/" + data.tripId + "/accept", data, value)
  		.then(
        	(result) => {
            this.responseData = result;
            console.log(this.responseData);
            this.navCtrl.setRoot(PendingRequestsPage, this.pendingRequests.removeItem(data));
            },
            (err) => {
              this.errresponse = err
              console.log(err);
          });
  	})
  }
// {requestFrom: "test", requestTo: "zhengxu001", tripId: "1803295059"}
}
