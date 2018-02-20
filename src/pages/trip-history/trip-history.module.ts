import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TripHistoryPage } from './trip-history';

@NgModule({
  declarations: [
    TripHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(TripHistoryPage),
  ],
})
export class TripHistoryPageModule {}
