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

    // this.gender=this.navParams.get('gendervalue');
    // this.rating= this.navParams.get('starvalue');
    // this.minage=this.navParams.get('minagevalue');
    // this.maxage=this.navParams.get('maxagevalue');
    // this.gn=this.navParams.get('groupvalue');

  console.log("++++++++++++"+this.navParams.get('selectedpref'))
    this.pref =
      {
        // 'gendervalue': [this.gender],
        // 'minagevalue': [this.minage],
        // 'maxagevalue': [this.maxage],
        // 'starvalue': [this.rating],
        // 'groupvalue':[this.gn]
        'gendervalue': this.navParams.get('preference').gendervalue,
        'minagevalue': this.navParams.get('preference').minagevalue,
        'maxagevalue': this.navParams.get('preference').maxagevalue,
        'starvalue': this.navParams.get('preference').starvalue,
        'mingroupvalue':this.navParams.get('preference').mingroupvalue,
        'maxgroupvalue':this.navParams.get('preference').maxgroupvalue
      }

    this.selectedpref= {'miniage':this.navParams.get('selectedpref').miniage, 'maxiage':this.navParams.get('selectedpref').maxiage, 'gender':this.navParams.get('selectedpref').gender, 'star':this.navParams.get('selectedpref').star, 'minigroup':this.navParams.get('selectedpref').minigroup, 'maxigroup':this.navParams.get('selectedpref').maxigroup};

  }




  // resetFilters() {
  //   // reset all of the toggles to be checked
  //   this.tracks.forEach(track => {
  //     track.isChecked = true;
  //   });
  // }

  applyFilters() {
    this.userData.setGender(this.selectedpref.gender);
    this.userData.setMinGroupNumber(this.selectedpref.minigroup);
    this.userData.setMaxGroupNumber(this.selectedpref.maxigroup);
    this.userData.setMaxiage(this.selectedpref.maxiage);
    this.userData.setMiniage(this.selectedpref.miniage);
    this.userData.setRating(this.selectedpref.star);
    // console.log('miniage '+ this.minage+ 'maxiage '+this.maxage+ 'gender '+this.gender+ 'star '+this.rating+ 'group '+this.gn);
    this.dismiss(this.selectedpref);
  }
  //
  closefilter(){
    this.dismiss(this.selectedpref);
  }

  dismiss(data?: any) {
    // using the injected ViewController this page
    // can "dismiss" itself and pass back data
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
