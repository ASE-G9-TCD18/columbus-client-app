import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlltripsPage } from './alltrips';

@NgModule({
  declarations: [
    AlltripsPage,
  ],
  imports: [
    IonicPageModule.forChild(AlltripsPage),
  ],
})
export class AlltripsPageModule {}
