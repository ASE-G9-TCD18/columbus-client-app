import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FCM } from '@ionic-native/fcm';


/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private fcm: FCM) {
  }

  ionViewDidLoad() {
  	// this.fcm.subscribeToTopic('marketing');
  	
    this.fcm.getToken().then(token => {
      console.log("this is token: " + token);
    });
    
    this.fcm.onNotification().subscribe( data => {
      if(data.wasTapped){
        console.log(JSON.stringify(data));
      }else{
        console.log(JSON.stringify(data));
      }
    });
  }

}
