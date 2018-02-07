import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DailycommutePage } from './dailycommute';

@NgModule({
  declarations: [
    DailycommutePage,
  ],
  imports: [
    IonicPageModule.forChild(DailycommutePage),
  ],
})
export class DailycommutePageModule {}
