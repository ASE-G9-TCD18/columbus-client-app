import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MatchedTripsPage } from './matched-trips';

@NgModule({
  declarations: [
    MatchedTripsPage,
  ],
  imports: [
    IonicPageModule.forChild(MatchedTripsPage),
  ],
})
export class MatchedTripsPageModule {}
