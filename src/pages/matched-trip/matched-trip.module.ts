import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MatchedTripPage } from './matched-trip';

@NgModule({
  declarations: [
    MatchedTripPage,
  ],
  imports: [
    IonicPageModule.forChild(MatchedTripPage),
  ],
})
export class MatchedTripPageModule {}
