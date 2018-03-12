import { Component } from '@angular/core';

import { NavParams, ViewController } from 'ionic-angular';

import { ConferenceData } from '../../providers/conference-data';

import { UserData } from '../../providers/user-data';

@Component({
  selector: 'page-schedule-filter',
  templateUrl: 'schedule-filter.html'
})


export class ScheduleFilterPage {

gender: string;
rating: number;
minage:number;
maxage:number;
gn:number;
pref:any;


  constructor(
    public confData: ConferenceData,
    public navParams: NavParams,
    public userData: UserData,
    public viewCtrl: ViewController
  ) {
    this.pref = {
      'gendervalue':this.navParams.get('gendervalue'),
      'minagevalue':this.navParams.get('minagevalue'),
      'maxagevalue':this.navParams.get('maxagevalue'),
      'starvalue':this.navParams.get('starvalue'),
      'groupvalue':this.navParams.get('groupvalue'),
    }

  }


  selectedpref:any={'miniage':'', 'maxiage':'', 'gender':'', 'star':'', 'group':''};

  // resetFilters() {
  //   // reset all of the toggles to be checked
  //   this.tracks.forEach(track => {
  //     track.isChecked = true;
  //   });
  // }

  applyFilters() {
    this.userData.setGender(this.selectedpref.gender);
    this.userData.setGroupNumber(this.selectedpref.group);
    this.userData.setMaxiage(this.selectedpref.maxiage);
    this.userData.setMiniage(this.selectedpref.miniage);
    this.userData.setRating(this.selectedpref.star);
    // console.log('miniage '+ this.minage+ 'maxiage '+this.maxage+ 'gender '+this.gender+ 'star '+this.rating+ 'group '+this.gn);
    this.dismiss();
  }
  //
  dismiss(data?: any) {
    // using the injected ViewController this page
    // can "dismiss" itself and pass back data
    this.viewCtrl.dismiss(data);
  }
}
