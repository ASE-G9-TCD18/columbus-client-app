import { Component } from '@angular/core';

import { NavParams, ViewController } from 'ionic-angular';

import { ConferenceData } from '../../providers/conference-data';

import { UserData } from '../../providers/user-data';

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


  constructor(
    public confData: ConferenceData,
    public navParams: NavParams,
    public userData: UserData,
    public viewCtrl: ViewController
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
        'mingendervalue': this.navParams.get('preference').mingendervalue,
        'maxgendervalue': this.navParams.get('preference').maxgendervalue,
        'minagevalue': this.navParams.get('preference').minagevalue,
        'maxagevalue': this.navParams.get('preference').maxagevalue,
        'starvalue': this.navParams.get('preference').starvalue,
        'groupvalue':this.navParams.get('preference').groupvalue
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
    this.userData.setMinGroupNumber(this.selectedpref.maxigroup);
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
}
