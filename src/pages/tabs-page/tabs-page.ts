import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { AboutPage } from '../about/about';
//import { SchedulePage } from '../schedule/schedule';
// import { SpeakerListPage } from '../speaker-list/speaker-list';
import { HomepagePage } from '../homepage/homepage';
import { JourneyPage } from '../journey/journey';


@Component({
  templateUrl: 'tabs-page.html'
})
export class TabsPage {
  // set the root pages for each tab
  tab1Root: any = HomepagePage;
  tab2Root: any = JourneyPage;
  tab3Root: any = AboutPage;
  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

}
