import { Component } from '@angular/core';

import { NavParams, ViewController } from 'ionic-angular';

import { ConferenceData } from '../../providers/conference-data';

import { UserData } from '../../providers/user-data';

import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-schedule-filter',
  templateUrl: 'schedule-filter.html'
})


export class ScheduleFilterPage {

gender: any;
rating: any;
minage:any;
maxage:any;
gn:any;
pref:any;
selectedpref:any;
alertMessage:any;


  constructor(
    public confData: ConferenceData,
    public navParams: NavParams,
    public userData: UserData,
    public viewCtrl: ViewController,
    private alertCtrl: AlertController
  ) {

  console.log("++++++++++++"+this.navParams.get('selectedpref'))
    this.pref =
      {
        'gendervalue': this.navParams.get('preference').gendervalue,
        'minagevalue': this.navParams.get('preference').minagevalue,
        'maxagevalue': this.navParams.get('preference').maxagevalue,
        'starvalue': this.navParams.get('preference').starvalue,
        'mingroupvalue':this.navParams.get('preference').mingroupvalue,
        'maxgroupvalue':this.navParams.get('preference').maxgroupvalue
      }

    this.selectedpref= {
      'miniage': this.navParams.get('selectedpref').miniage, 
      'maxiage': this.navParams.get('selectedpref').maxiage, 
      'gender': this.navParams.get('selectedpref').gender, 
      'star': this.navParams.get('selectedpref').star, 
      'minigroup': this.navParams.get('selectedpref').minigroup, 
      'maxigroup': this.navParams.get('selectedpref').maxigroup
    }

    this.userData.getGender().then((value)=>{
      this.selectedpref.gender = value
    });

    this.userData.getRating().then((value)=>{
      this.selectedpref.star = value
    });

    this.userData.getMaxiage().then((value)=>{
      this.selectedpref.maxiage = value
    });

    this.userData.getMiniage().then((value)=>{
      this.selectedpref.miniage = value
    });

    this.userData.getMinGroupNumber().then((value)=>{
      this.selectedpref.minigroup = value
    });

    this.userData.getMaxGroupNumber().then((value)=>{
      this.selectedpref.maxigroup = value
    });
    console.log("this.selectedpref:  ", this.selectedpref)
  }

  applyFilters() {
    this.userData.setGender(this.selectedpref.gender);
    this.userData.setMinGroupNumber(this.selectedpref.minigroup);
    this.userData.setMaxGroupNumber(this.selectedpref.maxigroup);
    this.userData.setMaxiage(this.selectedpref.maxiage);
    this.userData.setMiniage(this.selectedpref.miniage);
    this.userData.setRating(this.selectedpref.star);
    this.dismiss(this.selectedpref);
  }

  closefilter(){
    this.dismiss(this.selectedpref);
  }

  dismiss(data?: any) {
    this.viewCtrl.dismiss(data);
  }

  presentAlert(msg: string) {
    let alert = this.alertCtrl.create({
      title: 'Alert',
      subTitle: msg,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  validate(){
    if (this.selectedpref.maxigroup < this.selectedpref.minigroup || this.selectedpref.miniage > this.selectedpref.maxiage){

      this.alertMessage = "This value cannot be less than minimum selected value";
      this.presentAlert(this.alertMessage);

    }
    else if(this.selectedpref.minigroup == undefined || this.selectedpref.miniage == undefined){
      this.alertMessage = "Please select the minimum value first";
      this.presentAlert(this.alertMessage)
    }
  }
}
