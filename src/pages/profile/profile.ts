import { Component } from '@angular/core';
import { TripPage } from '../trip/trip';
import { TripHistoryPage } from '../trip-history/trip-history';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserData } from '../../providers/user-data';

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

  constructor(public navCtrl: NavController, public userData: UserData, public navParams: NavParams) {
  }

  goToTripDetail() { this.navCtrl.push(TripPage); }

  goToTripHistory() { this.navCtrl.push(TripHistoryPage); }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}